// Create web server application

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import database
const db = require('./db');

// Create web server
const app = express();

// Apply middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Create route
app.get('/comments', (req, res) => {


    db.Comment.find({}, 'content', function (error, comments) {
        if (error) { console.error(error); }
        res.send({
            comments: comments
        })
    }).sort({ _id: -1 })
}
);

app.post('/comments', (req, res) => {

    let db = req.db;
    let content = req.body.content;
    let new_comment = new db.Comment({
        content: content
    })

    new_comment.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Comment saved successfully!'
        })
    })
}
);

// Start web server
app.listen(process.env.PORT || 8081);

// Path: db.js
// Import modules
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Create schema
const commentSchema = new mongoose.Schema({
    content: String
})

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Export model
module.exports = { Comment };

// Path: package.json
// {
//     "name": "comments",
//     "version": "1.0.0",
//     "description": "A Vue.js project",
//     "author": "John Doe",
//     "private": true,
//     "scripts": {
//       "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
//       "start": "npm run dev",
//       "unit": "jest --config test/unit/jest.conf.js --coverage",
//       "e2e": "node test/e2e/runner.js",
//       "test": "npm run unit && npm run e2e",
//       "lint": "eslint --ext .js,.vue src test/unit test/e2e/specs",
//       "build": "node build/build.js"
//     },
//     "dependencies": {
//       "axios": "^0.18.0",
//       "body-parser": "^1.18.3",
//       "cors": "^2.8.5",
//       "express": "^4.16.4",
//       "mongoose": "^5.4.19",
//       "morgan": "^1.9.1",
//       "vue": "^2.5.2",
//       "vue-router": "^3.0.1",
//       "vuex": "^3.0.1"
//     },
//     "devDependencies": {
//       "autoprefixer": "^7.1.2",
//       "babel-core": "^6.22.1",
//       "babel-eslint": "^7.1.1",
//       "babel-helper-vue-jsx-merge-props": "^2.0.3",
//       "babel-jest": "^21.0.2",
//       "babel-loader": "^7.1.1",
//       "babel-plugin-dynamic-import-node": "^1.2.0",
//       "babel-plugin-syntax-jsx": "^6.18.0",
//       "babel-plugin-transform-es2015-modules-commonjs": "^6.26.0",
//       "babel-plugin-transform-runtime": "^6.22.0",
//       "babel-plugin-transform-vue-jsx": "^3.5.0",
//       "babel-preset-env": "^1.3.2",
//       "babel-preset-stage-2": "^6.22.0",
//       "babel-register": "^6.22.0",
//       "chai": "^3.5.0",
//       "chalk": "^2.0.1",
//       "chromedriver": "^2.27.2",
//       "copy-webpack-plugin": "^4.0.1",
//       "cross-spawn": "^5.0.1",
//       "css-loader": "^0.28.0",
//       "eslint": "^4.15.0",
//       "eslint-config-standard": "^10.2.1",
//       "eslint-friendly-formatter": "^3.0.0",
//       "eslint-loader": "^1.7.1",
//       "eslint-plugin-html": "^4.0.0",
//       "eslint-plugin-import": "^2.7.0",
//       "eslint-plugin-node": "^5.2.0",
//       "eslint-plugin-promise": "^3.4.0",
//       "eslint-plugin-standard": "^3.0.1",
//       "eslint-plugin-vue": "^4.0.0",
//       "extract-text-webpack-plugin": "^3.0.0",
//       "file-loader": "^1.1.4",
//       "friendly-errors-webpack-plugin": "^1.6.1",
//       "html-webpack-plugin": "^2.30.1",
//       "inject-loader": "^3.0.0",
//       "jest": "^22.0.4",
//       "jest-serializer-vue": "^0.3.0",
//       "nightwatch": "^0.9.12",
//       "node-notifier": "^5.1.2",
//       "node-sass": "^4.9.0",
//       "opn": "^5.1.0",
//       "optimize-css-assets-webpack-plugin": "^3.2.0",
//       "ora": "^1.2.0",
//       "portfinder": "^1.0.13",
//       "postcss-import": "^11.0.0",
//       "postcss-loader": "^2.0.0",
//       "postcss-url": "^7.2.1",
//       "rimraf": "^2.6.0",
//       "sass-loader": "^6.0.3",
//       "selenium-server": "^3.0.1",
//       "semver": "^5.3.0",
//       "shelljs": "^0.7.6",
//       "sinon": "^4.0.0",
//       "sinon-chai": "^2.8.0",
//       "uglifyjs-webpack-plugin": "^1.1.1",
//       "url-loader": "^0.5.8",
//       "vue-jest": "^1.0.2",
//       "vue-loader": "^13.3.0",
//       "vue-style-loader": "^3.0.1",
//       "vue-template-compiler": "^2.5.2",
//       "webpack": "^3.6.0",
//       "webpack-bundle-analyzer": "^2.9.0",
//       "webpack-dev-server": "^2.9.1",
//       "webpack-merge": "^4.1.0"
//     },
//     "engines": {
//       "node": ">= 6.0.0",
//       "npm": ">= 3.0.0"
//     },
//     "browserslist": [
//       "> 1%",
//       "last 2 versions",
//       "not ie <= 8"
//     ]
//   }
// Path: webpack.dev.conf.js
// 'use strict'
// const utils = require('./utils')
// const webpack = require('webpack')
// const config = require('../config')
// const merge = require('webpack-merge')
// const path = require('path')
// const baseWebpackConfig = require('./webpack.base.conf')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const portfinder = require('portfinder')
// const HOST = process.env.HOST
// const PORT = process.env.PORT && Number(process.env.PORT)

// const devWebpackConfig = merge(baseWebpackConfig, {
//   module: {
//     rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
//   },
//   // cheap-module-eval-source-map is faster for development
//   devtool: config.dev.devtool,

//   // these devServer options should be customized in /config/index.js
//   devServer: {
//     clientLogLevel: 'warning',
//     historyApiFallback: {
//       rewrites: [
//         { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
//       ],
//     },
//     hot: true,
//     contentBase: false, // since we use CopyWebpackPlugin.
//     compress: true,
//     host: HOST || config.dev.host,
//     port: PORT || config.dev.port,
//     open: config.dev.autoOpenBrowser,
//     overlay: config.dev.errorOverlay
//       ? { warnings: false, errors: true }
//       : false,
//     publicPath: config.dev.assetsPublicPath,
//     proxy: config.dev.proxyTable,
//     quiet: true, // necessary for FriendlyErrorsPlugin
//     watchOptions: {
//       poll: config.dev.poll,
//     }
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': require('../config/dev.env')
//     }),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
//     new webpack.NoEmitOnErrorsPlugin(),
//     //
//     //
//     //
//     //
//     //
//     //
//     //
//     //
//     //
