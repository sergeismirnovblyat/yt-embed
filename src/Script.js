const Settings = require('./Settings');
const Draggable = require('./Draggable');
const createMiniPlayer = require('./create-mini-player');
const createSettingsHTML = require('./create-settings-html');

const SETTINGS = {
	bookmarkName: { defaultValue: 'ytEmbed', inputType: 'text' },
	x: { inputType: 'number' },
	y: { inputType: 'number' },
	width: { inputType: 'number' },
	height: { inputType: 'number' },
	opacity: { defaultValue: 1, inputType: 'number' },
	showDebugMessages: { defaultValue: false, inputType: 'checkbox' },
	autoFocusPlayer: { defaultValue: true, inputType: 'checkbox' }
	// autoStart: TODO
};

// TODO:
//   - auto-start on url change setting
module.exports = class Script {
	constructor() {
		this.settings = new Settings();
		this.settings.load();

		window._ytEmbed = this;
		this.debug('script instance set on window._ytEmbed.');

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

	isInMiniplayer() {
		return !!document.querySelector('ytd-miniplayer ytd-player');
	}

	getVideoId() {
		return new URLSearchParams(window.location.search).get('v');
	}

	getVideoPlayer() {
		const ytdPlayer = document.querySelector('ytd-player');
		return ytdPlayer && ytdPlayer.player_;
	}

	async start() {
		this.debug('starting up.');

		this._player = this.getVideoPlayer();

		if (!this._player) {
			return this.destroyWithAlert('Could not find video player.');
		}

		const videoId = this._player.getVideoData().video_id;

		this.debug(`found video id "${videoId}".`);

		this._miniPlayer = createMiniPlayer(videoId);
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
		const videoId = this._player.getVideoData().video_id;

		if (this.getVideoId() !== videoId && !this.isInMiniplayer()) {
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

			const isAd = this._player.getAdState() > -1;
			isAd && this.debug('detected original video is an ad.');

			miniVideo.currentTime = this._player.getCurrentTime();
			if (this.settings.get('autoFocusPlayer')) {
				this.debug('focusing youtube embed iframe.');
				miniVideo.focus();
			}
			this._player.mute();

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

		this._player.seekTo(miniVideo.currentTime);
		this._player[miniVideo.paused ? 'pauseVideo' : 'playVideo']();

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
		window._ytEmbed = null;
		window.removeEventListener('click', this._onWindowClick);
		this.debug('destroyed.');

		if (this._miniPlayer && this._player) {
			const iframeDoc = this._miniPlayer.els('iframe').contentDocument;
			const miniVideo = iframeDoc && iframeDoc.querySelector('video');
			miniVideo && miniVideo.pause();
			this._player[miniVideo.muted ? 'mute' : 'unMute']();
		}

		this._miniPlayer && this._miniPlayer.remove();
		this._draggable && this._draggable.destroy();

		this._player = this._miniPlayer = this.settings = null;
	}
}
