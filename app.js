/**
 * Created by cong on 2016/12/16.
 */

var Koa = require('koa');
var Generator = require('./js/g');
var path = require('path');
var util = require('./js/libs/util');
var config = require('./config');
var weixin = require('./js/weixin');

var app = new Koa();
app.use(Generator(config.wechat,weixin.reply));

app.listen(36334);
