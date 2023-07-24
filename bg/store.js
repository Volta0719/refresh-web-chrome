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
        }
    // sendResponse({res: dealwithBigNumber(val1, val2)});
});