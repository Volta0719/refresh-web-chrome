let taskInfoList = {};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request?.from === 'popup') {
        if (request?.type === 'get') {
            sendResponse({
                taskInfoList,
                message: 'ok'
            })
        } else if (request?.type === 'add') {
            const addData = request?.addData;
            taskInfoList[addData.id] = { ...addData };
            sendResponse({
                taskInfoList,
                message: 'ok'
            })
        } else if (request?.type === 'delete') {
            if (taskInfoList.hasOwnProperty(request?.id)) {
                delete taskInfoList[request.id]
                sendResponse({
                    message: 'ok'
                })
            } else {
                sendResponse({
                    message: `taskInfoList has no id(${request?.id})`
                })
            }

        }
    } else if (request?.from === 'content') {
        const { tab } = sender;
        if (taskInfoList.hasOwnProperty(tab.id)) {
            taskInfoList[tab.id].nexttime = request?.nextTime;
            taskInfoList[tab.id].count = (+taskInfoList[tab.id].count) + 1;
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