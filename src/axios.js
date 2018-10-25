
import axios from 'axios'

// 取消请求
let CancelToken = axios.CancelToken


// let baseUrl="http://68.72.86.251/szga/xinghuo-apaas-mcplatform";         //  公安网网关地址
let baseUrl="http://172.29.3.76:9238/szga/";            //..移动信息网网关地址


// 请求默认参数
var defaultParam = {

    headers:{
        "content-type":"application/json;charset=UTF-8",
        "applyID":"f3295b7e695145509ce6f55de679f1e1",
        "secretKey":"30636034E3DFD48100C0E3DE40E3AF69",
        "requestType":"supp_admin",
        "userInfo":null
    },

    timeout:30000,

    cache:false

}

// 请求
function ajax(_method, params) {

    defaultParam.headers.accessToken = this.$bus.accessToken;




    /**
     * 方法调用错误捕捉
     */

    if (!params) throw "你的请求参数都没有，搞毛啊？--->"

    else if (typeof params !== "object") throw "请求参数类型不正确"

    else if (!params.url && !params.baseUrl && !params.test) throw "你的请求没有URL的？"


    /**
     * 进行数据过滤
     */
    let
        url = params.baseUrl ?  params.baseUrl + params.url: baseUrl+params.url , // 如果请求自带有baseUrl，那么就用自己的，并且不用传url字段
        sendData = params.data || {}, // 请求携带的数据
        method = _method.toLowerCase(), // 请求方法

        ifCache = params.cache, // 是否缓存
        iftest = params.test, // 是否缓存

        successFn = params.success, // 成功回调
        errorFn = params.error, // 失败回调
        beforeFn = params.before, // 发送前的处理
        complateFn = params.complete; // 请求完成的处理，不管成功还是失败


    /**
     *  处理默认参数 和 发送参数
     */
    delete params.data

    let httpData={
        url,
        method
    }

    for (var i in defaultParam) {

        var defaultItem = defaultParam[i]
        var paramItem = params[i]
        var item ;

        if(paramItem ){
            item=paramItem
        }else{
            item=defaultItem
        }

        if(typeof item =="object"){

            var obj = httpData[i]={}

            for (var j in item) {

                var defaultParam_child = defaultItem[j]
                var paramItem_child = item[j]

                if(paramItem_child ){
                    obj[j]=paramItem_child
                }else{
                    obj[j]=defaultParam_child
                }

            }

        }else{
            httpData[i]=item
        }

    }


    /**
     * 处理发送的数据
     */

    if (method=="get"||method=="del")   httpData.params =sendData

    else if (method=="post"||method=="put") httpData.data = sendData



    beforeFn && beforeFn.call(this); // 在发送请求时做一些事情


    /**
     * 获取缓存数据
     * 1、如果需要缓存，那么先从 ifCache 中获取数据
     * 2、如果不存在，再请求，请求成功之后，保存数据
     */


    if (ifCache) {

        // 缓存的条件
        var  cacheConf = {
            url, // 接口的url
            data: sendData, // 发送的数据
            method: method // 接口的方法
        }

        let cache = reqCache.getCache(cacheConf);


        if (typeof cache != "undefined" && cache) {

            //  请求完成回调
            typeof complateFn == "function" && complateFn.call(this);

            //  现在请求没有 code 和 msg
            typeof successFn == "function" && successFn.call(this, cache, "ok");

            return;
        }

    }

    // 是否是测试
    if(iftest){

        //  请求完成回调
        typeof complateFn == "function" && complateFn.call(this);

        //  现在请求没有 code 和 msg
        typeof successFn == "function" && successFn.call(this, []);

        return
    }


    /**
     * 正式发送请求
     */
    axios(httpData)

    .then(res => {

        // 频繁请求时，只取最后一个发送的请求，匹配ID
        // if (reqID && this[reqIDName] != reqID) return;

        let data = res.data;
        let code = data.code || data.status;

        //  请求完成回调
        typeof complateFn == "function" && complateFn.call(this);


        if(!!data.errorCode){

            alert(data.msg);


        }else if(code==200){

            //  现在请求没有 code 和 msg
            typeof successFn == "function" && successFn.call(this, data.data||data.datas, code);

        }else{
            // 错误回调
            typeof errorFn == "function" ? errorFn.call(this, code) :setError.call(this,code);
        }

        // 如果需要缓存，那么就设置缓存
        if (ifCache) {
            cacheConf.backData = data.data;
            reqCache.setCache(cacheConf)
        }

    })

    .catch(err => {

        console.log("报错详情err",err);

        // 频繁请求时，只取最后一个发送的请求，匹配ID
        // if (reqID && this[reqIDName] != reqID) return;

        //  请求完成回调
        typeof complateFn == "function" && complateFn.call(this);

        // 错误回调
        typeof errorFn == "function" ? errorFn.call(this, err) : setError.call(this,err);

    })



}

// 错误码集合
var errList={



    default:"未知错误，请重试"

}

// 错误处理
function setError(result) {

    // console.log( `%c 请求发送错误，错误码是---> ${result}`,"color:#fff;padding:10px;font-size:18px;background-color:#DD5044;border-radius:10px;font-weight:bold",);

    this.$Message.error({
        content:errList[result]||errList.default
    })

}

export default {

    install(Vue, options) {

        var vp = Vue.prototype

        vp.$get = function (param) {
            ajax.call(this,"get", param)
        }

        vp.$post = function (param) {
            ajax.call(this,"post", param)
        }

    }
}
