// let taskInfoList = {};
console.log('chrome bg', chrome)
const getTaskList = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.session.get('vlotaTaskList', (result) => {
            resolve(result?.vlotaTaskList || [])
        })
    })
}
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    // if (request?.from === 'popup') {
    //     if (request?.type === 'get') {
    //         sendResponse({
    //             taskInfoList,
    //             message: 'ok'
    //         })
    //     } else if (request?.type === 'add') {
    //         const addData = request?.addData;
    //         taskInfoList[addData.id] = { ...addData };
    //         sendResponse({
    //             taskInfoList,
    //             message: 'ok'
    //         })
    //     } else if (request?.type === 'delete') {
    //         if (taskInfoList.hasOwnProperty(request?.id)) {
    //             delete taskInfoList[request.id]
    //             sendResponse({
    //                 message: 'ok'
    //             })
    //         } else {
    //             sendResponse({
    //                 message: `taskInfoList has no id(${request?.id})`
    //             })
    //         }

    //     }
    // } 

    if (request?.from === 'content') {
        //保留  然后通过存到session
        const { tab } = sender;
        const taskInfoList = await getTaskList();
        if (taskInfoList.hasOwnProperty(tab.id)) {
            taskInfoList[tab.id].nexttime = request?.nextTime;
            taskInfoList[tab.id].count = (+taskInfoList[tab.id].count) + 1;
            chrome.storage.session.set({ vlotaTaskList: { ...taskInfoList } })
            sendResponse({
                message: 'ok'
            })
        } else {
            sendResponse({
                message: `TaskList Has Not Own Property ${tab.id}`
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