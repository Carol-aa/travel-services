module.exports = function babel(api) {
  api.cache.using(() => process.env.NODE_ENV);
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    // ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
  ];
  const plugins = [['@babel/plugin-transform-runtime'], [
    "import",
    {
        "libraryName":"antd",
        libraryDirectory:"es",
        "style":"css"
        }
  ]];
    // ./css-modules.js']];

  return {
    presets,
    plugins,
    sourceType: 'unambiguous',
  };
};
