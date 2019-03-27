module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env', {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    plugins: [
      [
        'babel-plugin-root-import', {
          paths: [{ rootPathPrefix: '~', rootPathSuffix: 'src' }],
        },
      ],
    ],
  };
};
