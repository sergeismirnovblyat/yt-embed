module.exports = {
	mode: process.env.NODE_ENV || 'development',
	entry: './src/index.js',
	output: {
		path: `${__dirname}`,
		filename: 'built.js'
	}
};
