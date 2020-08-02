const Script = require('./Script');

if (window.location.hostname === 'www.youtube.com') {
	if (!window._ytEmbed) {
		try {
			const script = new Script();
			script.start().catch(console.log);
		} catch(e) {
			console.log(e);
		}
	} else {
		if (confirm('YT bookmarklet has already run. Destroy?')) {
			window._ytEmbed.destroy();
		}
	}
}
