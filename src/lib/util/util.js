


// 格式化时间
export function formatTime(time, format) {

    format = typeof format=="string"?format: "yyyy-MM-dd"

    var dt 
            
    if (time instanceof Date) {
        dt = time;
    } else {
        dt = new Date(time);
    }

    var o = {
        "M+": dt.getMonth() + 1, // month
        "d+": dt.getDate(), // day
        "h+": dt.getHours(), // hour
        "m+": dt.getMinutes(), // minute
        "s+": dt.getSeconds(), // second
        "q+": Math.floor((dt.getMonth() + 3) / 3), // quarter
        "S": dt.getMilliseconds()
        // millisecond
    }

    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (dt.getFullYear() + "")
            .substr(4 - RegExp.$1.length));

    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

    return format;
    

}

// 连接加上参数
export function setUrlParams(src, urlParams) {
    var _params = []

    for (var i in urlParams) {
        _params.push(i + "=" + encodeURIComponent(urlParams[i]))
    }

    // 判断这个链接是否有其他参数
    if(src.indexOf("?")>-1){

        return src + "&" + _params.join("&")
    }else{

        return src + "?" + _params.join("&")
    }
    

}


// 合并对象
export function merge(target){

    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
}

// 过滤对象空字段
export function filterNullKey(data){

    var obj={}
    
    for (var i in data) {
    
        var item = data[i]

        if(data.hasOwnProperty(i)){
            item!=="" && (obj[i] = item)
        }
    
    }

    return obj
}

// 页面点击事件
export const documentClick =  (function(){

    var documentClickCallback={}

    // 为了点击页面其他地方，会关闭菜单弹窗
    document.onclick=null
    document.onclick = (e)=> {

        var target = e.target
        // console.log('e',e);

        for (var i in documentClickCallback) {

            var item = documentClickCallback[i]
            
            item(e)
        }

        e.stopPropagation()

    }

    return {

        // isReplace 是否存在时要替换
        add(name,callback,isReplace=false){
            if(!documentClickCallback[name]||isReplace){
                documentClickCallback[name]=callback
            }
        }
    }

}())


// 返回随机颜色
export function randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

// 获取链接上的 参数
export function parseQueryString(url) {

    url = url == null ? window.location.href : url
    // var search = url.indexOf("?") > -1 && url.substring(url.lastIndexOf('?') + 1);
    var search = location.search.slice(1)
    if(!search)   return {}

    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

}