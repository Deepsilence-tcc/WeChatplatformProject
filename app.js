/**
 * Created by cong on 2016/12/16.
 */

var Koa = require('koa');
var Generator = require('./js/g');
var path = require('path');
var wechat_file = path.join(__dirname,'./js/config/wechat_txt');
var util = require('./js/libs/util');

var config = {
    wechat:{
        appID:'',
        appSecret:'',
        token:'tcc0228zym',
        getAccessToken:function () {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken:function (data) {
            data = JSON.stringify(data);
            return util.weriteFileAsync(wechat_file,data);
        }
    }
}
var app = new Koa();
app.use(new Generator(config.wechat));

app.listen(36334);
