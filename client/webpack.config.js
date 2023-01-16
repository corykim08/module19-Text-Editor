const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    // Entry files (refer javascipt files in the js folder)
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      header: './src/js/header.js',
      editor: './src/js/editor.js',
      database: './src/js/database.js',
    },
    // bundle output
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Create an index.html file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),
      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        // Title of the application
        name: 'Text Editor',
        short_name: 'jate',
        description: 'Text editor',
        background_color: '#31a9e1',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      // Injects the custom servie worker from src-sw.js
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      })
    ],

    module: {
      // Add CSS loaders to the webpack
      rules: [
        {
          // Add a css file into the bundle.
          test: /\.css$/i,
          // Convert the css into javascript
          use: ['style-loader', 'css-loader'],
        },
        {
          // Add js files into the bundle
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            // presets and plugins options
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
