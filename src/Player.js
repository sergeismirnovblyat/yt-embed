module.exports = class Player {
	constructor(ytdPlayer) {
		this.ytdPlayer = ytdPlayer || document.querySelector('ytd-player');
	}

	// fragile
	isAd() {
		return !!this.ytdPlayer.querySelector('.ytp-ad-player-overlay');
	}

	// do not hold video el in IV, possibly changes
	getVideo() {
		return this.ytdPlayer.querySelector('video');
	}

	// mute/unmute by simulating interaction
	setMute(bool) {
		if (bool !== this.getVideo().muted) {
			this.ytdPlayer.querySelector('.ytp-mute-button').click();
		}
	}

	destroy() {
		this.ytdPlayer = null;
	}
};
