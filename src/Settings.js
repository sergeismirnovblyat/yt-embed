module.exports = class Settings extends Map {
	getCookie() {
		return document.cookie.split(';').find(s => /\s*ytsettings=/.test(s)) || '';
	}

	clearCookie() {
		document.cookie = `ytsettings=; expires=${new Date()};`;
	}

	/**
	 * Returns a parsed JSON object.
	 */
	parseCookie(cookie = this.getCookie()) {
		const match = /\s*ytsettings=(.*)/.exec(cookie);
		return match ? JSON.parse(match[1]) : {};
	}

	load() {
		this.clear();
		const json = this.parseCookie();
		Object.entries(json).forEach(([key, val]) => this.set(key, val));
	}

	save() {
		const json = {};
		this.forEach((val, key) => json[key] = val);
		document.cookie = `ytsettings=${JSON.stringify(json)}`;
	}
}
