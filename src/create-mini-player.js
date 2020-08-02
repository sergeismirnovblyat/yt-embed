const GH_SVG = (width = 20, height = 20) => `<svg style="width: ${width}px; height: ${height}px;" class="octicon octicon-mark-github v-align-middle" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">`;

const DEFAULT_STYLES = {
	'position': 'fixed',
	'top': 0,
	'left': 0,
	'z-index': 9999,
	'background': '#d0d0d0',
	'padding': '4px',
	'box-shadow': '0px 0px 16px rgba(0, 0, 0, 0.6)',
	'border-radius': '6px',
	'will-change': 'transform,opacity'
};

function createHTML(videoId, time = 0) {
	const div = document.createElement('div');
	const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${~~time}`;

	const keylineStyle = `height: 1px; background: #6f6f6f; margin: 4px 0;`;
	const buttonStyle = `flex: 0 0 var(--button-width); margin-right: 4px;`;

	div.innerHTML = `
		<div>
			<div data-el="controls" style="cursor: grab; --button-width: 30px; display: flex; flex-wrap: wrap; user-select: none;">
				<button style="${buttonStyle}" data-el="exit" title="Exit">×</button>
				<button style="${buttonStyle}" data-el="minimize" title="Minimize">–</button>
				<button style="${buttonStyle}" data-el="exitAndApply" title="Exit and replace video">↑</button>
				<button style="${buttonStyle} margin-right: 0;" data-el="info" title="Toggle info panel">ⓘ</button>
				<input title="Adjust opacity" type="range" data-el="slider" value="100" min="30" style="width: 30px; transform: rotate(-90deg); cursor: ns-resize;"/>
			</div>
			<div style="${keylineStyle}"></div>
			<div data-el="resize" style="resize: both; overflow: scroll; min-width: 186px;">
				<div data-el="infoTag" style="display: none; font-size: 12px;">
					<a href="https://github.com/sergeismirnovblyat/yt-embed" target="_blank" rel="noopener noreferrer">${GH_SVG()}</path></svg></a>
					<p><strong>Legend</strong></p>
					<ul>
						<li><strong>×</strong>: close window.</li>
						<li><strong>–</strong>: minimize window.</li>
						<li><strong>↑</strong>: close window and apply time+mute to original.</li>
						<li><strong>ⓘ</strong>: toggle info panel.</li>
						<li><strong>slider</strong>: adjust window opacity.</li>
					</ul>
					<div style="${keylineStyle}"></div>
					<p><strong>Settings</strong></p>
					<div data-el="settings"></div>
					<br/>
					<button data-el="save" title="Save all settings">save</button>
					<button data-el="delete" title="Clear all settings">clear</button>
					<div style="${keylineStyle}"></div>
				</div>
				<iframe data-el="iframe" src="${src}" style="width: 100%; height: 99%;"></iframe>
			</div>
		</div>
	`;
	return div.children[0];
}

module.exports = (videoId, time = 0, styles) => {
	styles = styles ? { ...DEFAULT_STYLES, ...styles } : DEFAULT_STYLES;

	const miniPlayer = createHTML(videoId, time);
	Object.entries(styles).forEach(([key, val]) => miniPlayer.style.setProperty(key, val));

	miniPlayer.els = name => miniPlayer.querySelector(`[data-el="${name}"]`);

	Array.from(miniPlayer.querySelectorAll('button')).forEach(el => {
		el.style.cursor = 'pointer';
	});

	return miniPlayer;
};
