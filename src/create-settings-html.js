/**
 * @param {Map} settings
 * @param {Map} map - additional map used for custom input styles.
 */
module.exports = (settings, map) => {
	const createLi = (key, value, props) => {
		const attrs = Object.entries(props).map(([key, val]) => `${key}="${val}"`).join('');
		return `<li>${key}: <input ${attrs} data-el="setting-${key}"/></li>`;
	};

	return `
		<ul>
			${Array.from(map.entries()).map(([key, props = { type: 'text' }]) => {
				const value = settings.get(key);

				if (props.type === 'text' || props.type === 'number') {
					value && (props.value = value);
				}

				if (props.type === 'checkbox' && value) {
					props.checked = 'true';
				} else if (props.type === 'number') {
					props.style = `width: 40px;`;
				}

				return createLi(key, value, props);
			}).join('')}
		</ul>
	`;
};
