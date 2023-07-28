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
                if (taskInfoList[tab.id].refreshType === 'alarms') {
                    await chrome.alarms.clear(`${tab.id}`);
                }
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
            if (taskInfoList[tabId].refreshType === 'alarms') {
                await chrome.alarms.clear(`${tabId}`);
            }
            delete taskInfoList[tabId]
            await chrome.storage.session.set({ vlotaTaskList: { ...taskInfoList } })
        }
    }
})
chrome.windows.onRemoved.addListener(async (winid) => {
    const taskInfoList = await getTaskList()
    const tabsIdList = Object.keys(taskInfoList);
    tabsIdList.forEach(async (id) => {
        if (taskInfoList[id].winId == winid) {
            if (taskInfoList[id].refreshType === 'alarms') {
                await chrome.alarms.clear(`${id}`);
            }
            delete taskInfoList[id]
        }
    })
    await chrome.storage.session.set({ vlotaTaskList: { ...taskInfoList } })
})