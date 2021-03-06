/**
 * Created by cendawei on 2017/4/18.
 */
const _ = require('lodash');
const redis = require('redis')
const {errorCodes, cache} = require('../configs')

module.exports = {
    getResult({codeText, msg, data}) {
        let rs = {}
        rs = errorCodes[codeText]
        msg && (rs.msg = msg)
        data && (rs.data = data)
        return rs
    },
    dateFormat: function (millitime, fmt) {
        typeof millitime === 'string' && (millitime = parseInt(millitime))
        var date = new Date(millitime)
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    getCacheClient() {
        const client = redis.createClient({
            host: cache[process.env.NODE_ENV].host,
            port: cache[process.env.NODE_ENV].port
        })
        client.on('error', err => console.log(err))
        return client
    }
}