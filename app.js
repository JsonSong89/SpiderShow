'use strict'

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var os = require('os');

config.entry.unshift('webpack-dev-server/client?http://localhost:4072', "webpack/hot/dev-server");


config.plugins.push(new webpack.HotModuleReplacementPlugin());

var isDev = true

if (os.platform() === 'linux' && os.hostname() == 'jsonsong') {
    console.log(" vps ");
    isDev = false
}
else if (os.hostname() == 'DESKTOP-92VGR1C') {
    console.log(" local win10 ");
} else {
    console.log(" virtual win 2008 ");
}


// 这里配置：请求 local /api，
// 相当于通过本地node服务代理请求到了http://cnodejs.org/api
var proxy = [{
    path: "/api/*",
    target: "http://localhost:4071",
    host: "localhost"
}]

if (isDev) {
    //启动服务
    var app = new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        proxy: proxy
    });
    app.listen(4072);
} else {
    require('http-proxy').createServer({
        target: 'http://localhost:4071'
    }).listen(4072);
}

