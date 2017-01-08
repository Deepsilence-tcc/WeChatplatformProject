/**
 * Created by cong on 2016/12/17.
 */
'use strict'
var prefix ='https://api.weixin.qq.com/cgi-bin/';
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./libs/xmlUtil');
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
    accessToken:prefix+'token?grant_type=client_credential',

}

function Wechat(opts) {
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;
    this.getAccessToken()
        .then(function (data) {
            try {
                data = JSON.parse(data);
            }catch (e){
                return that.updateAccessToken();
            }
            if(that.isValidaAccessToken(data)){
                that.access_token = data.body.access_token;
                that.expires_in = data.body.expires_in;
                that.saveAccessToken(data);

            }else {
                that.updateAccessToken();
            }
        })
}

Wechat.prototype.isValidaAccessToken = function (data) {
    if(!data||!data.body.access_token||!data.body.expires_in){
        return false;
    }
    var access_token = data.body.access_token;
    var expires_in = data.body.expires_in;
    var now = (new Date().getTime()-Date.parse(new Date(data.headers.date)))/1000;
    now = Math.round(now);
    if(now<expires_in){
        return true;
    }else{
        return false;

    }
}
Wechat.prototype.updateAccessToken = function () {
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken+'&appid='+appID+'&secret='+appSecret;

    return new Promise(function (resolve ,reject) {

        request({url:url,json:true}).then(function (response) {
            var data = response;
            var now = (new Date().getTime());
            var expires_in = now+(data.expires_in-20)*1000;

            data.expires_in = expires_in;

            resolve(data);

        })
    })

}

Wechat.prototype.replying = function () {
    var content = this.body;
    var message = this.weixin
    var xml = util.tpl(content,message);
    this.status =200;
    this.type = 'application/xml'
    this.body = xml;
    console.log(this.body);
}
module.exports = Wechat;

