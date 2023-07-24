/*
 * @Author: fanjf
 * @Date: 2023-07-20 13:57:47
 * @LastEditTime: 2023-07-24 08:59:24
 * @LastEditors: fanjf
 * @FilePath: \refresh-web\content\refreshConfigPage.js
 * @Description: 🎉🎉🎉
 */
console.log('chrome', chrome)
// chrome.alarms.create({delayInMinutes: 3.0})
const id = chrome?.runtime?.id || ''
const vloltaSessionTimeKey = `voltaTime_${id}`
const voltaMeta = document.querySelector(`meta[name="${vloltaSessionTimeKey}"]`)
const voltaSessionTime = sessionStorage.getItem(vloltaSessionTimeKey)
//格式化时间
const voltaFormatDate = (date, format) => {
    if (!date) return
    if (!format) format = 'yyyy-MM-dd'
    switch (typeof date) {
        case 'string':
            date = new Date(date)
            break
        case 'number':
            date = new Date(date)
            break
    }
    if (!(date instanceof Date)) return false
    let dict = {
        'yyyy': date.getFullYear(),
        'M': date.getMonth() + 1,
        'd': date.getDate(),
        'H': date.getHours(),
        'm': date.getMinutes(),
        's': date.getSeconds(),
        'MM': ('' + (date.getMonth() + 101)).substr(1),
        'dd': ('' + (date.getDate() + 100)).substr(1),
        'HH': ('' + (date.getHours() + 100)).substr(1),
        'mm': ('' + (date.getMinutes() + 100)).substr(1),
        'ss': ('' + (date.getSeconds() + 100)).substr(1)
    }
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]]
    })
}
//记录时间
const recordNextHappenTime = (time) => {
    let timeNow = new Date();
    let nowSecond = timeNow.getSeconds();
    timeNow.setSeconds(+time + nowSecond);
    return voltaFormatDate(timeNow, 'yyyy-MM-dd HH:mm:ss')
}
const createVoltaRefresh = (time = '60', name = 'volta0719') => {
    if (!!voltaMeta) {
        voltaMeta.content = time;
    } else {
        const voltaCreateMeta = document.createElement('meta');
        voltaCreateMeta.name = name;
        voltaCreateMeta.httpEquiv = 'refresh';
        voltaCreateMeta.content = time;
        document.getElementsByTagName('head')[0].appendChild(voltaCreateMeta);
    }
}
if (!!voltaSessionTime && !voltaMeta) {
    // const voltaStartTime = new Date();//获取时间
    createVoltaRefresh(voltaSessionTime);
    const nextVoltaRerfeshTime = recordNextHappenTime(voltaSessionTime);
    chrome.runtime.sendMessage(
        { nextTime: nextVoltaRerfeshTime },
        function (response) {
            console.log("收到来自后台的回复：" + response?.message);
        }
    );
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request?.type === 'start') {
        //启动
        sessionStorage.setItem(vloltaSessionTimeKey, request?.time || '60');//将时间修改
        createVoltaRefresh(request?.time);
        const nextVoltaRerfeshTime = recordNextHappenTime(request?.time);
        sendResponse({
            nextTime: nextVoltaRerfeshTime
        })
    } else if (request?.type === 'update') {
        //修改
        sendResponse({ farewell: "goodbye2123" });
    } else if (request?.type === 'stop') {
        //停止
        sendResponse({ farewell: "goodbye2123" });
    }

});

// chrome.runtime.sendMessage(
//     { greeting: "hello，我是content-script，主动发消息给后台！" },
//     function (response) {
//       console.log("收到来自后台的回复：" + response);
//     }
//   );
