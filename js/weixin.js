/**
 * Created by cong on 2016/12/18.
 */

exports.reply = function* (next) {

    var message = this.weixin;

    console.log(message.MsgType);

    if(message.MsgType ==='event'){
        if(message.Event==='subscribe'){
            if(message.EventKey){
                console.log('扫描二维码'+message.EventKey+''+message.ticket)
            }
            this.body ='哈哈哈，你关注了'+'消息ID'+message
        }else if(message.Event ==='unsubscribe'){
            console.log('无情取关');
            this.body = '';
        }
    }else if(message.Event ==='LOCATION'){
        this.body = '您上报的位置是：'+message.Latitude+'/'+message.Longtitude+'-'+message.Precision;
    }else if (message.Event ==='CLICK'){
        this.body='你点击了菜单：'+message.EventKey;
    }else if(message.Event==='SCAN') {
        this.body ='看到你扫了一下哦';
    }else if (message.Event === 'VIEW'){
        this.body = '您点击了菜单中的链接：'+message.EventKey;
    }else if (message.MsgType ==='text'){
        var content = message.Content;
        var reply = '额，你说的'+message.Content +'太复杂了'

        if(content ==='1'){
            reply = '天下第一是大米'
        }else if (content=='2'){
            reply ='天下第二是豆腐'
        }else if (content ==='4'){
            reply =[{
                title:'技术改变世界',
                description:'只是一个描述而已',
                picUrl:''
            },
                {
                    title:'nodejs 开发微信',
                    description:'开发微信',
                    picUrl:''
                }
            ]
        }
        this.body = reply;
        console.log(this.body);
    }
    yield next;

}