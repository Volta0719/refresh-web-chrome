/*
 * @Author: fanjf
 * @Date: 2023-07-20 13:57:47
 * @LastEditTime: 2023-07-21 09:29:02
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
    // setInterval(() => { location.reload() }, 5000)
    if (request?.type === 'start') {
        const meta = document.createElement('meta');
        meta.name = 'volta0719';
        meta.httpEquiv = 'refresh';
        meta.content = request?.time || '60';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
    sendResponse({ farewell: "goodbye2123" });
});
