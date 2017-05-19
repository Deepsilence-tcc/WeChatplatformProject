/**
 * Created by cong on 2016/12/17.
 */
'use strict'
var xml2js = require('xml2js');
var Promise = require('bluebird');
var temp = require('../common/temp');

exports.parseXmlAsync = function (xml) {
    return new Promise(function (resolve,reject) {
        xml2js.parseString(xml,{trim:true},function (err,content) {
            if(err) reject(err);
            else resolve(content);
        })
    })
}

function formatMessage(result) {
    var message ={};
    if (typeof result==='object'){
        var keys = Object.keys(result);
        for(var i=0;i<keys.length;i++){
            var item = result[keys[i]];
            var key = keys[i];
            if(!(item instanceof Array)||item.length===0){
                continue;
            }
            if(item.length===1){
                var val = item[0];
                if (typeof val ==='object'){
                    message[key] = formatMessage(val);
                }else {
                    message[key] =(val||'').trim();
                }
            }else {
                message[key] =[];
                for (var j=0,k=item.length;j<k;j++){
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }
    return message;
}
exports.formatMessage = formatMessage;

exports.tpl = function (content,message) {
    var info = {};
    var type = 'text';
    var fromUserName = message.ToUserName;
    var toUserName = message.FromUserName;
    if(Array.isArray(content)){
        type ="news"
    }
    console.log(message)

    info.createTime = new Date().getTime();

    info.msgType = content.type==undefined?type:content.type;
    info.toUserName = fromUserName;
    info.fromUserName = toUserName;
    info.content = content;

    console.log(info)

    return temp.compiled(info);
}