/**
 * Created by cong on 2016/12/18.
 */
var config = require('../config');
var WeChat = require('./wechat');


var wechatApi = new WeChat(config.wechat);

exports.reply = function*(next) {

    var message = this.weixin;

    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫描二维码' + message.EventKey + '' + message.ticket)
            }
            this.body = '哈哈哈，你关注了' + '消息ID' + message
        } else if (message.Event === 'unsubscribe') {
            console.log('无情取关');
            this.body = '';
        }
    } else if (message.Event === 'LOCATION') {
        this.body = '您上报的位置是：' + message.Latitude + '/' + message.Longtitude + '-' + message.Precision;
    } else if (message.Event === 'CLICK') {
        this.body = '你点击了菜单：' + message.EventKey;
    } else if (message.Event === 'SCAN') {
        this.body = '看到你扫了一下哦';
    } else if (message.Event === 'VIEW') {
        this.body = '您点击了菜单中的链接：' + message.EventKey;
    } else if (message.MsgType === 'text') {
        var content = message.Content;
        var reply = '额，你说的' + message.Content + '太复杂了'

        if (content === '1') {
            reply = '天下第一是大米'
        } else if (content == '2') {
            reply = '天下第二是豆腐'
        } else if (content === '3') {
            reply = [{
                title: '技术改变世界',
                description: '只是一个描述而已',
                picUrl: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
                url: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
            },
                {
                    title: 'nodejs 开发微信',
                    description: '开发微信',
                    picUrl: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
                    url: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
                }
            ]
        } else if (content == 5) {

            var data = yield wechatApi.uploadMaterial('image', __dirname + '/images/2.jpg')
            reply = {
                type: 'image',
                mediaId: data.body.media_id,
            }

            console.log(reply);
        }
        else if (content == 6) {
            var data = yield wechatApi.uploadMaterial('video', __dirname + '/images/6.mp4')

            reply = {
                type: 'video',
                title: '测试视频',
                description: '测试',
                mediaId: data.body.media_id,
            }
        } else if (content == 7) {

            var data = yield wechatApi.uploadMaterial('image', __dirname + '/images/2.jpg')

            reply = {
                type: 'music',
                title: '测试音频',
                description: '放松一下',
                musicUrl: '',
                thumbMediaId: data.media_id,
            }
        }
        else if (content == 8) {

            var data = yield wechatApi.uploadMaterial('pic', __dirname + '/images/2.jpg', {type: 'pic'})
            reply = [
                {picUrl: data.body.url}
            ]
            console.log(reply);
        }

        this.body = reply;
    }
    yield next;

}