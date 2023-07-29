/*
 * @Author: fanjf
 * @Date: 2023-07-20 13:57:47
 * @LastEditTime: 2023-07-29 20:50:35
 * @LastEditors: fanjf
 * @FilePath: \refresh-web\content\refreshConfigPage.js
 * @Description: 🎉🎉🎉
 */
// chrome.alarms.create({delayInMinutes: 3.0})
const id = chrome?.runtime?.id || ''
const vloltaSessionInfoKey = `voltaInfo_${id}`
const voltaMeta = document.querySelector(`meta[name="${vloltaSessionInfoKey}"]`)
const voltaSessionInfo = sessionStorage.getItem(vloltaSessionInfoKey)

//在页面中创建一个指示定时刷新的状态指示器
const createVoltaRefreshHtml = (time, nexttime, type = 'meta') => {
    if (!!document.getElementById('voltaIcon')) {
        document.getElementById('voltaIcon').title = `${chrome.i18n.getMessage("nextHappen")}:${nexttime}`;
        document.getElementById('voltaIcon').style.animationName = `vlota${type}refresh`;
    } else {
        const style = document.createElement('style')
        style.appendChild(document.createTextNode(`
        @keyframes vlotametarefresh{
            0% { transform: scale(0.8);}
            50% { transform: scale(1.2);transform:rotate(-90deg)}
            100% {transform: scale(0.8);}
        }
        @keyframes vlotaalarmsrefresh{
            0% {transform: rotate(1turn);}
            100% {transform: rotate(0turn);}
        }
        `));
        document.getElementsByTagName('head')[0].appendChild(style)
        const defaultImgUrl = chrome.runtime.getURL("icons/icon.png");
        let divDom = document.createElement('div');
        divDom.title = `${chrome.i18n.getMessage("nextHappen")}:${nexttime}`;
        divDom.id = 'voltaIcon';
        divDom.setAttribute('style', `
                  position:fixed;
                  top:50%;
                  transform:translateY(-50%);
                  margin:auto;
                  right:20px;
                  width:32px;
                  height:32px;
                  background:url('${defaultImgUrl}');
                  background-size:cover;
                  background-repeat:np-repeat;
                  border-radius:50%;
                  z-index:999;
                  animation-name:vlota${type}refresh;
                  animation-duration: 1s;
                  animation-iteration-count: infinite;
                  animation-timing-function:linear;
                  animation-fill-mode:forwards;
        `)

        document.body.appendChild(divDom);
        document.getElementById('voltaIcon').onclick = (e) => {
            let f = confirm(chrome.i18n.getMessage("contentConfirmText"));
            if (f) {
                chrome.runtime.sendMessage({ from: 'content', type: 'stop' }).then((response) => {
                    sessionStorage.removeItem(vloltaSessionInfoKey);
                    location.reload();
                })
            }
        }
        document.getElementById('voltaIcon').oncontextmenu = (e) => {
            e.preventDefault();
            e.target.style.display = "none";
        }
    }
}
const createVoltaRefresh = (time = '60', name = vloltaSessionInfoKey) => {
    if (!!document.querySelector(`meta[name="${vloltaSessionInfoKey}"]`)) {
        console.log(`${chrome.i18n.getMessage("contentAlreadylog")}${time}s`)
        document.querySelector(`meta[name="${vloltaSessionInfoKey}"]`).content = time;
    } else {
        const voltaCreateMeta = document.createElement('meta');
        voltaCreateMeta.name = name;
        voltaCreateMeta.httpEquiv = 'refresh';
        voltaCreateMeta.content = time;
        document.getElementsByTagName('head')[0].appendChild(voltaCreateMeta);
    }
}
if (!!voltaSessionInfo) {
    // const voltaStartTime = new Date();//获取时间
    const voltaSessionInfoObject = JSON.parse(voltaSessionInfo);
    const nextVoltaRerfeshTime = recordNextHappenTime(voltaSessionInfoObject.time);
    if (voltaSessionInfoObject.refreshType === 'meta') {
        createVoltaRefresh(voltaSessionInfoObject.time);
        createVoltaRefreshHtml(voltaSessionInfoObject.time, nextVoltaRerfeshTime, voltaSessionInfoObject.refreshType);
        sessionStorage.setItem(vloltaSessionInfoKey, JSON.stringify({
            ...voltaSessionInfoObject, nextTime: nextVoltaRerfeshTime
        }))
        //这个应该要做修改 要与service_work通信
    } else {
        createVoltaRefreshHtml(voltaSessionInfoObject.time, nextVoltaRerfeshTime, voltaSessionInfoObject.refreshType);
        sessionStorage.setItem(vloltaSessionInfoKey, JSON.stringify({
            ...voltaSessionInfoObject, nextTime: nextVoltaRerfeshTime
        }))
    }
    chrome.runtime.sendMessage({ from: 'content', nextTime: nextVoltaRerfeshTime, type: 'update' }).then((response) => {

    });
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //request.refreshType
    const voltaSession =
    {
        time: request?.time,
        nextTime: recordNextHappenTime(request?.time),
        tabId: request?.tabId,
        refreshType: request?.refreshType
    }
    if (request?.from === 'popup') {
        if (request?.type === 'start') {
            //启动
            sessionStorage.setItem(vloltaSessionInfoKey, JSON.stringify(voltaSession));
            if (request?.refreshType === 'meta') {
                createVoltaRefresh(request?.time);
            }
            createVoltaRefreshHtml(request?.time, voltaSession?.nextTime, request?.refreshType)
            sendResponse({
                from: 'content',
                type: 'add',
                nextTime: voltaSession?.nextTime
            })
        } else if (request?.type === 'update') {
            sessionStorage.setItem(vloltaSessionInfoKey, JSON.stringify(voltaSession));
            if (request?.isRefreshChange) {
                if (request?.refreshType === 'alarms') {
                    //这个代表刷新方式已经改成 alarms  所以要删掉 meta标签
                    location.reload();
                } else {
                    createVoltaRefresh(request?.time);
                }
            }
            createVoltaRefreshHtml(request?.time, voltaSession?.nextTime, request?.refreshType);
            sendResponse({
                from: 'content',
                type: 'update',
                nextTime: voltaSession?.nextTime
            })

        } else if (request?.type === 'stop') {
            //停止
            sessionStorage.removeItem(vloltaSessionInfoKey);
            sendResponse({ from: 'content', message: "ok" });
            location.reload();
        }
    } else {
        //from bg alarms refresh type vloltaSessionInfoKey
        sessionStorage.setItem(vloltaSessionInfoKey, JSON.stringify(voltaSession))
        createVoltaRefreshHtml(voltaSession?.time, voltaSession?.nextTime, voltaSession?.refreshType);
        sendResponse({
            from: 'content',
            type: 'add',
            message: 'ok',
            nextTime: voltaSession?.nextTime
        })
    }
});

