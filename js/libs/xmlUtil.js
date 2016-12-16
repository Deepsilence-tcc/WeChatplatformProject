/**
 * Created by cong on 2016/12/17.
 */
'use strict'
var xml2js = require('xml2js');
var Promise = require('bluebird');

exports.parseXmlAsync = function (xml) {
    return new Promise(function (resolve,reject) {
        xml2js.parseString(xml,{trim:true},function (err,content) {
            if(err) reject(err);
            else resolve(content);
        })
    })
}
