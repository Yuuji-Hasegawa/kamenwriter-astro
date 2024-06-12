module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      browsers: 'last 1 versions, > 1%',
      autoprefixer: { grid: false },
      features: {
        'custom-properties': false,
      },
    }),
    require('css-declaration-sorter')({
      order: 'concentric-css',
    }),
  ],
}
