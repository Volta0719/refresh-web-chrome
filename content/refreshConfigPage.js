/*
 * @Author: fanjf
 * @Date: 2023-07-20 13:57:47
 * @LastEditTime: 2023-07-20 15:59:24
 * @LastEditors: fanjf
 * @FilePath: \refresh-web\content\refreshConfigPage.js
 * @Description: 🎉🎉🎉
 */
console.log('Hi,我是refresh文件')
console.log('sssss', chrome)
// chrome.tabs.query({ currentWindow: true }, function (tabs) {
//    console.log('sssss',tabs)
// });
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(sender.tab ?
    //     "from a content script:" + sender.tab.url :
    //     "from the extension");
    console.log('window', window)
    // location.reload();
    setInterval(() => { location.reload() }, 5000)
    if (request.greeting.indexOf("hello") !== -1) {
        sendResponse({ farewell: "goodbye" });
    }
});
