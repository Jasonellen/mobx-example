module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {
    	browsers: [
        '>1%',
        'last 2 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
        'iOS >= 7',
        'Android >= 4'
      ],
    },
		'postcss-pxtorem':{
				rootValue: 75,
				unitPrecision: 5,
				propList: ['*'],
				selectorBlackList: [],
				replace: true,
				mediaQuery: false,
				minPixelValue: 0
			}
  }
}
