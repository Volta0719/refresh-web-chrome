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
                delete taskInfoList[tab.id]
            }
            await chrome.storage.session.set({ vlotaTaskList: { ...taskInfoList } })
            sendResponse({
                from:'bg',
                message: 'ok'
            })
        } else {
            sendResponse({
                from:'bg',
                message: `[${request?.type}]TaskList Has Not Own Property ${tab.id}`
            })
        }
    }else if(request?.from === 'popup'){
        const taskInfoList = await getTaskList();//这边应该是 获取所有的alarms todo
        if(taskInfoList.hasOwnProperty(request?.tabId)){

        }else{
            let minutes= +request?.time / 60
            await chrome.alarms.create(request?.tabId || 'volta-id', {
                periodInMinutes: minutes.toFixed(2)
            });
            sendResponse({
                from:'bg',
                message:'ok'
            })
        }
    }
}
);
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