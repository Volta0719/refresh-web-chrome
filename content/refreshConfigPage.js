/*
 * @Author: fanjf
 * @Date: 2023-07-20 13:57:47
 * @LastEditTime: 2023-07-21 15:34:26
 * @LastEditors: fanjf
 * @FilePath: \refresh-web\content\refreshConfigPage.js
 * @Description: 🎉🎉🎉
 */
console.log('chrome', chrome)
// chrome.alarms.create({delayInMinutes: 3.0})
const id = chrome?.runtime?.id || ''
const vloltaSessionTimeKey = `voltaTime${id}`
const voltaMeta = document.querySelector(`meta[name="${vloltaSessionTimeKey}"]`)
const voltaSessionTime = sessionStorage.getItem(vloltaSessionTimeKey)

const createRefresh = (time = '60', name = 'volta0719') => {
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
    createRefresh(voltaSessionTime)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request?.type === 'start') {
        //启动
        sessionStorage.setItem(vloltaSessionTimeKey, request?.time || '60');//将时间修改
        createRefresh(request?.time);
    } else if (request?.type === 'update') {
        //修改
    } else if (request?.type === 'stop') {
        //停止
    }
    sendResponse({ farewell: "goodbye2123" });
});

// chrome.runtime.sendMessage(
//     { greeting: "hello，我是content-script，主动发消息给后台！" },
//     function (response) {
//       console.log("收到来自后台的回复：" + response);
//     }
//   );
