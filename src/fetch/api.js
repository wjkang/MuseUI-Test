/**
 * Created by jayce on 2017/6/27.
 */
import axios from 'axios'
import DingTalkPC from 'DingTalkPC'

const HOST='http://localhost:51323/';

function fetch(url,method='GET'){
    return new Promise((resolve,reject)=>{
        axios({
            method: method,
            url: HOST + url,
            //params:params
        }).then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            });
    });
}
function GetConfig(){
    return fetch('Home/GetConfig');
}
function GetUserInfo(code){
    return fetch(`Home/GetUserInfo?code=${code}`);
}
function DingTalkPCConfig(config){
    console.log(config);
    config=JSON.parse(config);
    console.log(config);
    return new Promise((resolve,reject)=>{
        DingTalkPC.config({
            agentId: config.agentId, // 必填，微应用ID
            corpId: config.corpId,//必填，企业ID
            timeStamp: config.timeStamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature, // 必填，签名
            jsApiList: ['device.notification.alert', 'device.notification.confirm'] // 必填，需要使用的jsapi列表
        });
        DingTalkPC.ready(function(res){
            /*{
             authorizedAPIList: ['device.notification.alert'], //已授权API列表
             unauthorizedAPIList: [''], //未授权API列表
             }*/
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            DingTalkPC.runtime.permission.requestAuthCode({
                corpId: config.corpId, //企业ID
                onSuccess: function(result) {
                    /*{
                     code: 'hYLK98jkf0m' //string authCode
                     }*/
                    resolve(result.code)
                },
                onFail : function(err) {
                    reject(err)
                }

            })
        });
        DingTalkPC.error(function(error){
            reject(error)
            /*{
             errorCode: 1001, //错误码
             errorMessage: '', //错误信息
             }*/
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开调试窗口的 console查看，也可以在返回的res参数中查看。
        });
    });
}
export default {
    Login(){
        return GetConfig()
            .then(res=>{return DingTalkPCConfig(res)})
            .then(res=>{console.log(res);return GetUserInfo(res)})
    }
}