// const webpack = require('webpack');
const { override, addWebpackPlugin } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          // '@primary-color': 'pink',
          // '@font-size-base': '20px',
          // '@text-color': 'blue',
        },
      },
    },
  }),
  addWebpackPlugin(
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      algorithm: 'gzip',
      deleteOriginalAssets: false,
    }),
  ),
  addWebpackPlugin(
    new CompressionPlugin({
      test: /\.css(\?.*)?$/i,
      algorithm: 'gzip',
      deleteOriginalAssets: false,
    }),
  ),
);

// module.exports = function override(config) {
//   const fallback = config.resolve.fallback || {};
//   Object.assign(fallback, {
//     crypto: require.resolve('crypto-browserify'),
//     stream: require.resolve('stream-browserify'),
//     assert: require.resolve('assert'),
//     http: require.resolve('stream-http'),
//     https: require.resolve('https-browserify'),
//     os: require.resolve('os-browserify'),
//     url: require.resolve('url'),
//   });
//   config.resolve.fallback = fallback;
//   // config.plugins = (config.plugins || []).concat([
//   //   new webpack.ProvidePlugin({
//   //     process: 'process/browser',
//   //     Buffer: ['buffer', 'Buffer'],
//   //     rules: [
//   //       {
//   //         test: /\.less$/,
//   //         use: [
//   //           {
//   //             loader: 'style-loader',
//   //           },
//   //           {
//   //             loader: 'css-loader', // translates CSS into CommonJS
//   //           },
//   //           {
//   //             loader: 'less-loader', // compiles Less to CSS
//   //             options: {
//   //               lessOptions: {
//   //                 // If you are using less-loader@5 please spread the lessOptions to options directly
//   //                 modifyVars: {
//   //                   '@primary-color': '#000000',
//   //                   '@link-color': '#1DA57A',
//   //                   '@border-radius-base': '10px',
//   //                 },
//   //                 javascriptEnabled: true,
//   //               },
//   //             },
//   //           },
//   //         ],
//   //         // ...other rules
//   //       },
//   //     ],
//   //   }),
//   // ]);
//   return config;
// };
