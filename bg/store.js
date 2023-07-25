// let taskInfoList = {};
console.log('chrome bg', chrome)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
        chrome.storage.session.get('vlotaTaskList', (result) => {
            const taskInfoList = result?.vlotaTaskList || {};
            // resolve(result.vlotaTaskList)
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
        })

    }
}
);

chrome.windows.onRemoved.addListener((winid) => {
    chrome.storage.session.get('vlotaTaskList', (result) => {
        const taskInfoList = result?.vlotaTaskList || {};
        const tabsIdList = Object.keys(taskInfoList);
        tabsIdList.forEach(id => {
            if (taskInfoList[id].winId == winid) {
                delete taskInfoList[id]
            }
        })
        chrome.storage.session.set({ vlotaTaskList: { ...taskInfoList } })
    })
})