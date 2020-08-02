const Script = require('./Script');

if (!window._ytBookmarklet) {
	try {
		const script = new Script();
		script.start().catch(console.log);
	} catch(e) {
		console.log(e);
	}
} else {
	if (confirm('YT bookmarklet has already run. Destroy?')) {
		window._ytBookmarklet.destroy();
	}
}
