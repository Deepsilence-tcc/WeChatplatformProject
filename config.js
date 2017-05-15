/**
 * Created by cong on 2016/12/18.
 */
var Generator = require('./js/g');
var path = require('path');
var wechat_file = path.join(__dirname,'./js/config/wechat_txt');
var util = require('./js/libs/util');

var config = {
    wechat:{
        // appID:'wx6389b6489a68b700',
        // appSecret:'bbf9ad9cfa502c0d1ce492c0a73ee7cb',

        appID:'wx664fdcbc3aa318c0',
        appSecret:'d4624c36b6795d1d99dcf0547af5443d',

        token:'tcc0228zym',
        getAccessToken:function () {
            return util.readFileAsync(wechat_file,'utf-8');
        },
        saveAccessToken:function (data) {
            data = JSON.stringify(data);
            return util.weriteFileAsync(wechat_file,data);
        }
    }
}

module.exports =config