/*
 * @Author: fanjf
 * @Date: 2023-07-20 14:20:05
 * @LastEditTime: 2023-07-24 17:11:12
 * @LastEditors: fanjf
 * @FilePath: \refresh-web\popup\popup.js
 * @Description: 🎉🎉🎉 
 */
console.log('chrome popup', chrome)
const startTaskDom = document.getElementById("startTask");
const timeBoxDom = document.getElementById("timeBox");
const icoBoxDom = document.getElementById("icoBox");
const voltaMaskBox = document.getElementById("maskBox");
const choosedTimeList = ['30', '60', '300', '600', '900', '1200', '1800', '3600'];
let taskList = {};
chrome.runtime.sendMessage({ type: 'get', from: 'popup' }, (response) => {
    taskList = response?.taskInfoList;
    // 执行根据tablist 添加
    let addList = Object.values(taskList);
    if (addList.length > 0) {
        addNewIcoDom(addList)
    }
});
// var bg = chrome.extension.getBackgroundPage(); v2版本
// console.log('taskList', bg)
// chrome.stroge.session.set({})
let currentTime = choosedTimeList[0];//刷新的时间间隔
let finalTimeItem = choosedTimeList.reduce((acc, cur, index, arr) => `${acc}
<p class='time-item ${index === 0 ? 'volta-active' : ''}' data-index='${index}' data-time='${cur}'>${cur}s</p>
`, '')

timeBoxDom.innerHTML = `${finalTimeItem}
<p class='time-item-input' contenteditable='true' id="timeInput"></p>
`;
finalTimeItem = null;
const addNewIcoDom = (icoData) => {
    let finalIcoHtml = icoData.reduce((acc, cur, index, arr) => `
    ${acc}
    <div class='ico-item' 
    style="background:url('${cur.icon}')"
    id='${cur.id}' 
    title='${cur.title}'
    data-icon='${cur.icon}'
    data-url='${cur.url}' 
    data-winid='${cur.winId}' 
    data-count='${cur.count}' 
    data-time='${cur.time}' 
    data-nexttime='${cur.nexttime}'
    data-title='${cur.title}'
    ></div>
    `, '')
    icoBoxDom.innerHTML = `${icoBoxDom.innerHTML}
    ${finalIcoHtml}
    `
}
// const updateIcoDomInfo = (id, taskInfo) => {
//     const voltaIcoDom = document.getElementById(id);
//     ['count', 'time', 'nexttime'].forEach(ele => {
//         voltaIcoDom.setAttribute(`data-${ele}`, taskInfo[ele])
//     })
// }
if (startTaskDom) {
    startTaskDom.onclick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            console.log('tabs', tabs[0])
            //向conent-script 通信
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    type: 'start',
                    tabId: tabs[0].id,
                    time: currentTime
                },
                (response) => {
                    console.log('response popup', response)
                    //向background 通信 更新 taskList的值
                    const addData = {
                        id: tabs[0].id,
                        icon: tabs[0].favIconUrl,
                        url: tabs[0].url,
                        winId: tabs[0].windowId,
                        title: tabs[0].title,
                        time: currentTime,
                        count: 1,
                        nexttime: response?.nextTime
                    }
                    chrome.runtime.sendMessage({ from: 'popup', type: 'add', addData }, (response) => {
                        taskList = response?.taskInfoList;
                        // 执行根据tablist 添加
                        addNewIcoDom([addData])
                    })
                    // taskList[tabs[0].id].nexttime = response?.nextTime;
                    // addNewIcoDom([addData])
                }
            );
        });
    }
} else {
    console.log('startTaskDom未找到！！')
}
// //界首content的内容
// chrome.runtime.onMessage.addListener(
//     (request, sender, sendResponse) => {
//         const { tab } = sender;
//         if (taskList.hasOwnProperty(tab.id)) {
//             taskList[tab.id].nexttime = request?.nextTime;
//             taskList[tab.id].count = (+taskList[tab.id].count) + 1;
//             updateIcoDomInfo(tab.id, taskList[tab.id]);
//             sendResponse({
//                 message: 'ok'
//             })
//         } else {
//             sendResponse({
//                 message: `TaskList Has Not Own Property ${tab.id}`
//             })
//         }

//     });

const removeItemActive = () => {
    const activeItem = document.getElementsByClassName('volta-active');
    if (activeItem.length > 0) {
        Array.from(activeItem).forEach(d => d.classList.remove('volta-active'))
    }
}
timeBoxDom.onclick = (e) => {
    console.log('e.target.classList1', [e.target])
    if (e.target.classList.contains('time-item')) {
        removeItemActive();
        currentTime = e.target.getAttribute("data-time");
        e.target.classList.add('volta-active');
    }
}
//打开任务详情
icoBox.onclick = (e) => {
    const taskInfoData = taskList[e.target.id];
    document.getElementById('iconVolta').src = taskInfoData.icon;
    ['url', 'time', 'count', 'nexttime', 'title', 'id'].forEach(f => {
        document.getElementById(`${f}Volta`).innerHTML = taskInfoData[f];
        if (f === 'title') {
            document.getElementById(`${f}Volta`).title = taskInfoData[f]
        }
    })
    document.getElementById('stopTask').setAttribute('data-id', e.target.id)
    voltaMaskBox.classList.remove('mask-box-out');
    voltaMaskBox.classList.add('mask-box-in');
}

document.getElementById('closeTaskDetail').onclick = (e) => {
    voltaMaskBox.classList.remove('mask-box-in');
    voltaMaskBox.classList.add('mask-box-out');
}
//停止任务
document.getElementById('stopTask').onclick = (e) => {
    const id = document.getElementById('stopTask').getAttribute('data-id');
    console.log('iddddd', id)
    chrome.tabs.sendMessage(
        +id,
        {
            type: 'stop',
        },
        function (response) {
            delete taskList.id;
            voltaMaskBox.classList.remove('mask-box-in');
            voltaMaskBox.classList.add('mask-box-out');
            document.getElementById(id).remove();
        }
    );

}
//输入框
document.getElementById('timeInput').oninput = (e) => {
    removeItemActive();
    currentTime = +e.target.innerHTML;
    e.target.innerHTML = e.target.innerHTML.replace(/[\D]/g, '');
    if (window.getSelection) {
        e.target.focus();
        let range = window.getSelection();
        range.selectAllChildren(e.target);
        range.collapseToEnd();
    }
    else if (document.selection) {
        let range = document.selection.createRange();
        range.moveToElementText(e.target);
        range.collapse(false);
        range.select();
    }
}