// importScripts("../utils/tools.js")
console.log('chrome bg', chrome)
const getTaskList = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.session.get('vlotaTaskList', (result) => {
            resolve(result?.vlotaTaskList || [])
        })
    })
}
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request?.from === 'content') {
        //保留  然后通过存到session
        const { tab } = sender;
        const taskInfoList = await getTaskList();
        if (taskInfoList.hasOwnProperty(tab.id)) {
            if (request?.type === 'update') {
                taskInfoList[tab.id].nexttime = request?.nextTime;
                taskInfoList[tab.id].count = (+taskInfoList[tab.id].count) + 1;
            } else if (request?.type === 'stop') {
                //这个还要考虑不同方式 停止
                delete taskInfoList[tab.id]
            }
            await chrome.storage.session.set({ vlotaTaskList: { ...taskInfoList } })
            sendResponse({
                from: 'bg',
                message: 'ok'
            })
        } else {
            sendResponse({
                from: 'bg',
                message: `[${request?.type}]TaskList Has Not Own Property ${tab.id}`
            })
        }
    }
}
);

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.tabs.reload(+alarm.name, { bypassCache: false })
})

chrome.tabs.onRemoved.addListener(async (tabId, windowData) => {
    if (!windowData.isWindowClosing) {
        //windowData:{isWindowClosing:false,windowId:11222}
        const taskInfoList = await getTaskList()
        if (taskInfoList.hasOwnProperty(tabId)) {
            delete taskInfoList[tabId]
            chrome.storage.session.set({ vlotaTaskList: { ...taskInfoList } })
        }
    }
})
chrome.windows.onRemoved.addListener(async (winid) => {
    const taskInfoList = await getTaskList()
    const tabsIdList = Object.keys(taskInfoList);
    tabsIdList.forEach(id => {
        if (taskInfoList[id].winId == winid) {
            delete taskInfoList[id]
        }
    })
    chrome.storage.session.set({ vlotaTaskList: { ...taskInfoList } })
})