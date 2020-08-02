const Settings = require('./Settings');
const Player = require('./Player');
const Draggable = require('./Draggable');
const createMiniPlayer = require('./create-mini-player');
const createSettingsHTML = require('./create-settings-html');

const SETTINGS = {
	bookmarkName: { defaultValue: 'ytBookmark', inputType: 'text' },
	x: { inputType: 'number' },
	y: { inputType: 'number' },
	width: { inputType: 'number' },
	height: { inputType: 'number' },
	opacity: { defaultValue: 1, inputType: 'number' },
	runWithMiniPlayer: { defaultValue: false, inputType: 'checkbox' },
	showDebugMessages: { defaultValue: false, inputType: 'checkbox' },
	autoFocusPlayer: { defaultValue: true, inputType: 'checkbox' }
	// autoStart: TODO
	// opacity: TODO
};

// TODO:
//   - auto-start on url change setting
module.exports = class Script {
	constructor() {
		this.settings = new Settings();
		this.settings.load();

		window._ytBookmarklet = this;
		this.debug('script instance set on window._ytBookmarklet.');

		Object.entries(SETTINGS).forEach(([key, props]) => {
			if (!this.settings.has(key) && props.defaultValue !== undefined) {
				this.settings.set(key, props.defaultValue);
			}
		});

		this._onWindowClick = this._onWindowClick.bind(this);

		this._player = this._miniPlayer = null;
		this._miniPlayer = null;
	}

	onURLChange() {
		this.destroy();
	}

	isMiniplayerOpen() {
		return document.querySelector('ytd-miniplayer').active;
	}

	getVideoId() {
		return new URLSearchParams(window.location.search).get('v');
	}

	async start() {
		this.debug('starting up.');

		this.videoId = this.getVideoId();
		let miniPlayerHack = false;

		if (!this.videoId && this.isMiniplayerOpen()) {
			miniPlayerHack = true;
			if (!this.settings.get('runWithMiniPlayer')) {
				miniPlayerHack = confirm(`Looks like you have the miniplayer open. I need to close it and reopen to find the video id. This will happen very fast.\n\nYou can skip this message next time by checking the "runWithMiniPlayer" checkbox under the info panel.\n\nContinue?`);
			}
			if (!miniPlayerHack) {
				return this.destroy();
			}
		} else if (!this.videoId) {
			return this.destroyWithAlert('Could not find video id.');
		}

		if (miniPlayerHack) {
			this.debug('hacking around miniplayer...');
			await new Promise(async resolve => {
				document.querySelector('ytd-player .ytp-miniplayer-expand-watch-page-button').click();
				await new Promise(r => setTimeout(r, 500));
				this.videoId = this.getVideoId();
				document.querySelector('ytd-player .ytp-miniplayer-button').click();
				resolve();
			});
		}

		this.debug(`found video id "${this.videoId}".`);

		this._player = new Player();
		this._miniPlayer = createMiniPlayer(this.videoId);
		if (this.settings.has('opacity')) {
			this._miniPlayer.style.opacity = this.settings.get('opacity');
			this._miniPlayer.els('slider').value = this.settings.get('opacity') * 100;
		}
		this.updateSettingsHTML();

		// make draggable
		const filter = e => e.target === this._miniPlayer.els('controls');
		this._draggable = new Draggable(this._miniPlayer, filter);
		this._miniPlayer.addEventListener('dragStart', () => {
			this._miniPlayer.els('controls').style.cursor = 'grabbing';
			this._miniPlayer.els('iframe').style.pointerEvents = 'none';
		});
		this._miniPlayer.addEventListener('dragEnd', () => {
			this._miniPlayer.els('iframe').style.pointerEvents = '';
			this._miniPlayer.els('controls').style.cursor = 'grab';
		});

		// set size
		const width = this.settings.get('width') || 400;
		const height = this.settings.get('height') || 280;
		this._miniPlayer.els('resize').style.width = `${width}px`;
		this._miniPlayer.els('resize').style.height = `${height}px`;

		// set position
		requestAnimationFrame(() => {
			const width = this._miniPlayer.offsetWidth;
			const height = this._miniPlayer.offsetHeight;
			let x = this.settings.get('x') || window.innerWidth - width - 10;
			let y = this.settings.get('y') || window.innerHeight - height - 10;

			if (x < 0 - width) x = 10;
			if (x > window.innerWidth) x = window.innerWidth - width - 10;
			if (y < 0 - height) y = 10;
			if (y > window.innerHeight) y = window.innerHeight - height - 10;

			this._draggable.setPosition(x, y);
		});

		this._miniPlayer.els('exit').addEventListener('click', e => this.onExit(e));
		this._miniPlayer.els('minimize').addEventListener('click', e => this.onMinimize(e));
		this._miniPlayer.els('exitAndApply').addEventListener('click', e => this.onExitAndApply(e));
		this._miniPlayer.els('info').addEventListener('click', e => this.onInfo(e));
		this._miniPlayer.els('slider').addEventListener('input', e => this.onSlider(e));
		this._miniPlayer.els('save').addEventListener('click', e => this.onSave(e));
		this._miniPlayer.els('delete').addEventListener('click', e => this.onDelete(e));
		this._miniPlayer.els('iframe').addEventListener('load', e => this.onIframeLoad(e));

		document.body.prepend(this._miniPlayer);

		window.addEventListener('click', this._onWindowClick);
	}

	_onWindowClick() {
		if (this.getVideoId() !== this.videoId && !this.isMiniplayerOpen()) {
			this.debug('detecting url change.');
			this.onURLChange();
		}
	}

	/**
	 * @param {Map} settings
	 * @param {Object} map
	 */
	updateSettingsHTML(settings = this.settings, map) {
		map = map || new Map(Object.entries(SETTINGS).map(([key, val]) => {
			const { inputType, ...rest } = val;
			return [key, { type: inputType, ...rest }];
		}));

		const oldDetails = this._miniPlayer.els('details');

		const cookie = settings.getCookie().trim();

		const html = `
			${cookie && `<details data-el="details">
				<summary>Settings are stored in <strong>document.cookie</strong>. See contents</summary>
				<code style="display: block; word-break: break-all; font-weight: bold;">${JSON.stringify(settings.parseCookie())}</code>
			</details><br/>`}
			${createSettingsHTML(settings, map)}
		`;

		this._miniPlayer.els('settings').innerHTML = html;

		const details = this._miniPlayer.els('details');
		details && (details.open = oldDetails && oldDetails.open);
	}

	onIframeLoad() {
		this.debug('loaded youtube embed iframe.');

		// hmm
		const poll = () => {
			const miniVideo = this._miniPlayer.els('iframe').contentDocument.querySelector('video');

			if (!miniVideo) {
				this.debug('polling for iframe video...');
				return setTimeout(poll, 50);
			}

			const isAd = this._player.isAd();
			isAd && this.debug('detected original video is an ad.');

			const time = isAd ? 0 : this._player.getVideo().currentTime;
			miniVideo.currentTime = time;
			if (this.settings.get('autoFocusPlayer')) {
				this.debug('focusing youtube embed iframe.');
				miniVideo.focus();
			}
			this._player.setMute(true);

			window.addEventListener('beforeunload', () => {
				this.destroy();
			});
		};

		poll();
	}

	onExit() {
		this.debug('closing.')
		this.destroy();
	}

	onMinimize() {
		const { style } = this._miniPlayer.els('resize');
		if (parseFloat(style.height) === 0) {
			style.height = style.getPropertyValue('--height');
			style.setProperty('--height', '');
		} else {
			style.setProperty('--height', style.height);
			style.height = '0';
		}
	}

	onExitAndApply() {
		this.debug('closing and applying time+mute to original video.')
		const miniVideo = this._miniPlayer.els('iframe').contentDocument.querySelector('video');

		this._player.getVideo().currentTime = miniVideo.currentTime;
		this._player.getVideo()[miniVideo.paused ? 'pause' : 'play']();

		this.destroy();
	}

	onSave() {
		const getEl = this._miniPlayer.els;
		const resize = getEl('resize');
		const pos = this._draggable.getPosition();

		Object.keys(SETTINGS).forEach(key => {
			if (key === 'width' || key === 'height') {
				return this.settings.set(key, resize[key === 'width' ? 'offsetWidth' : 'offsetHeight']);
			} else if (key === 'x' || key === 'y') {
				return this.settings.set(key, pos[key === 'x' ? 0 : 1]);
			} else if (key === 'opacity') {
				return this.settings.set(key, parseFloat(this._miniPlayer.style.opacity));
			}

			const input = getEl(`setting-${key}`);
			const type = input.type;
			this.settings.set(key, input[type === 'checkbox' ? 'checked' : 'value']);
		});

		this.settings.save();
		this.updateSettingsHTML();

		if (this.settings.get('showDebugMessages')) {
			this.debug('settings saved.');
		}
	}

	onDelete() {
		this.settings.clearCookie();
		this.settings.clear();
		this.updateSettingsHTML();
		this.debug('settings cleared.')
	}

	onInfo() {
		const { style } = this._miniPlayer.els('infoTag');
		style.display = style.display ? '' : 'none';
	}

	onSlider(e) {
		this._miniPlayer.style.opacity = parseFloat(e.currentTarget.value) / 100;
	}

	debug() {
		if (this.settings.get('showDebugMessages')) {
			console.log(`${this.settings.get('bookmarkName')}:`, ...arguments);
		}
	}

	destroyWithAlert(message) {
		this.destroy();
		window.alert(message);
	}

	destroy() {
		window._ytBookmarklet = null;
		window.removeEventListener('click', this._onWindowClick);
		this.debug('destroyed.');

		if (this._miniPlayer && this._player) {
			const iframeDoc = this._miniPlayer.els('iframe').contentDocument;
			const miniVideo = iframeDoc && iframeDoc.querySelector('video');
			miniVideo && miniVideo.pause();
			this._player.setMute(miniVideo.muted);
		}

		this._miniPlayer && this._miniPlayer.remove();
		this._draggable && this._draggable.destroy();
		this._player && this._player.destroy();

		this._player = this._miniPlayer = this.settings = null;
	}
}
