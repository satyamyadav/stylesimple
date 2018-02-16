'use strict'

const path = require('path')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const basePath = process.env.NODE_ENV == 'production' ? '/stylesimple/dist' : '/dist';
// Create multiple instances
const extractCSS = new ExtractTextPlugin({
  filename: '/[name].css'
});

const extractSASS = new ExtractTextPlugin({
  filename: '/[name].css'
});

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var apps = ['default', 'dark', 'material', 'hexo'];

var entries = apps.reduce(function (o, a) {
  o[`${a}/${a}`] = ['.', a].join('/');
  return o;
}, {});

const HtmlPlug = apps.map(a => {
  return new HtmlWebpackPlugin({
    filename: path.join(__dirname, `docs/${a}/index.html`),
    template: `./template.html`,
    name: a,
    inject: false,
    base: basePath
  })
})

const docIndex = new HtmlWebpackPlugin({
  template: './index.html',
  inject: false,
  apps: apps,
  filename: path.join(__dirname, `index.html`)
})

HtmlPlug.push(docIndex);

module.exports = env => {

  return {
    context: path.join(__dirname, '/src/themes'),
    entry: entries,
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js"
    },
    module: {
      rules: [{
        test: /\.css$/,
        loaders: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }, {
        test: /\.scss$/,
        loaders: extractSASS.extract({
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      }]
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.min.js', '.js', '.json', '.scss']
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        filename: "commons.js",
        name: "commons"
      }),
      extractSASS,
      extractCSS,

      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: true
        },
        canPrint: true,
      })

      // new BundleAnalyzerPlugin()
    ].concat(HtmlPlug)

  }
};
