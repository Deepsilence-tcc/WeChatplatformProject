/**
 * Created by cong on 2016/12/16.
 */


var sha1 = require('sha1');
var Wechat = require('./wechat');
var getRawBody =  require ('raw-body');
var xmlUtil = require('./libs/xmlUtil');

module.exports = function (opts,handler) {

    var wechat = new Wechat(opts);

    return function* (next) {
        var that = this;
        var token = opts.token
        var signature = this.query.signature
        var nonce = this.query.nonce
        var timestamp = this.query.timestamp
        var echostr = this.query.echostr

        var str = [token, timestamp, nonce].sort().join('')
        var sha = sha1(str)
        if(this.method=== 'GET'){
            if (sha === signature) {
                this.body = echostr+'';

            } else {
                this.body = 'wrong'
            }
        }else if (this.method ==='POST'){
            if(sha!==signature){
                this.body = 'wrong'
                return false;
            }

            var data = yield getRawBody(this.req,{
                length:this.length,
                limit:'1mb',
                encoding:this.charset,
            });


            var content = yield xmlUtil.parseXmlAsync(data);

            var message = xmlUtil.formatMessage(content.xml);



            this.weixin = message;

            yield handler.call(this,next);


            wechat.replying.call(this);

        }
    }
}
