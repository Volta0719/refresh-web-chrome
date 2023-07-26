/*
 * @Author: fanjf
 * @Date: 2023-07-20 14:20:05
 * @LastEditTime: 2023-07-26 11:21:43
 * @LastEditors: fanjf
 * @FilePath: \refresh-web\popup\popup.js
 * @Description: 🎉🎉🎉 
 */
console.log('chrome popup', chrome)
const htmli18nList = {
    name: [{
        props: 'innerText',
        value: 'name',
    }],//主标题
    timetitle: [{
        props: 'innerText',
        value: 'timetitle'
    }],//定义刷新时间
    startTask: [{
        props: 'innerText',
        value: 'startTask'
    }, {
        props: 'title',
        value: 'startTaskTitle'
    }],//启动按钮
    detailtime: [{
        props: 'innerText',
        value: 'timetitle'
    }],
    detailCount:[{
        props:'innerText',
        value:'detailCount'
    }],
    nextHappen:[{
        props:'innerText',
        value:'nextHappen'
    }],
    weburl:[{
       props:'innerText',
       value:'weburl'
    }],
    stopTask:[{
        props:'title',
        value:'stopTaskTitle'
    }],
    closeTaskDetail:[{
        props:'title',
        value:'closeTaskDetailTitle'
    }]

}
const startTaskDom = document.getElementById("voltastartTask");
const timeBoxDom = document.getElementById("timeBox");
const icoBoxDom = document.getElementById("icoBox");
const voltaMaskBox = document.getElementById("maskBox");
const choosedTimeList = ['30', '60', '300', '600', '900', '1200', '1800', '3600'];
const defaultImgUrl = chrome.runtime.getURL("icons/icon.png")

// chrome.runtime.sendMessage({ type: 'get', from: 'popup' }, (response) => {
//     taskList = response?.taskInfoList;
//     // 执行根据tablist 添加
//     let addList = Object.values(taskList);
//     if (addList.length > 0) {
//         addNewIcoDom(addList)
//     }
// });

// chrome.storage.session.get('vlotaTaskList', (result) => {
//     let addList = Object.values(result.vlotaTaskList);
//     if (addList.length > 0) {
//         addNewIcoDom(addList)
//     }
// })

const getTaskList = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.session.get('vlotaTaskList', (result) => {
            resolve(result?.vlotaTaskList || [])
        })
    })
}

const initTask = async () => {
    Object.keys(htmli18nList).forEach(ele => {
        let dom = document.getElementById(`volta${ele}`);
        htmli18nList[ele].forEach(f => dom[f.props] = chrome.i18n.getMessage(f.value))
    })
    let taskList = await getTaskList();
    let addList = Object.values(taskList);
    if (addList.length > 0) {
        addNewIcoDom(addList)
    }

}
initTask();
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
    <img class='ico-item' 
    src="${cur.icon}"
    id='${cur.id}' 
    title='${cur.title}'
    data-icon='${cur.icon}'
    data-url='${cur.url}' 
    data-winid='${cur.winId}' 
    data-count='${cur.count}' 
    data-time='${cur.time}' 
    data-nexttime='${cur.nexttime}'
    data-title='${cur.title}'
    width='32px'
    height='32px'
    />
    `, '')
    icoBoxDom.innerHTML = `${icoBoxDom.innerHTML}
    ${finalIcoHtml}
    `
}
const updateIcoDomInfo = (id, taskInfo) => {
    const voltaIcoDom = document.getElementById(id);
    ['count', 'time', 'nexttime'].forEach(ele => {
        voltaIcoDom.setAttribute(`data-${ele}`, taskInfo[ele])
    })
}
if (startTaskDom) {
    startTaskDom.onclick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            console.log('tabs', tabs[0])
            //向conent-script 通信
            // chrome.windows.get(tabs[0].windowId, (res) => {
            //     console.log('res======>', res)
            // })
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    type: 'start',
                    tabId: tabs[0].id,
                    time: currentTime
                },
                async (response) => {
                    console.log('response popup', response)
                    //向background 通信 更新 taskList的值
                    const addData = {
                        id: tabs[0].id,
                        icon: tabs[0]?.favIconUrl || defaultImgUrl,
                        url: tabs[0].url,
                        winId: tabs[0].windowId,
                        title: tabs[0].title,
                        time: currentTime,
                        count: 1,
                        nexttime: response?.nextTime
                    }
                    let taskList = await getTaskList();
                    if (taskList.hasOwnProperty(tabs[0].id)) {
                        updateIcoDomInfo(tabs[0].id, taskList[tabs[0].id])
                    } else {
                        addNewIcoDom([addData]);
                    }
                    chrome.storage.session.set({ vlotaTaskList: { ...taskList, [tabs[0].id]: addData } })

                    // chrome.storage.session.set({ vlotaTaskList: '2323' })

                    // chrome.runtime.sendMessage({ from: 'popup', type: 'add', addData }, (response) => {
                    //     if (taskList.hasOwnProperty(tabs[0].id)) {
                    //         updateIcoDomInfo(tabs[0].id, taskList[tabs[0].id])
                    //     } else {
                    //         addNewIcoDom([addData]);
                    //     }
                    //     taskList = response?.taskInfoList;
                    // })

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
    if (e.target.classList.contains('time-item')) {
        removeItemActive();
        currentTime = e.target.getAttribute("data-time");
        e.target.classList.add('volta-active');
    }
}
//打开任务详情
icoBox.onclick = async (e) => {
    let taskList = await getTaskList();
    const taskInfoData = taskList[e.target.id];
    document.getElementById('iconVolta').src = taskInfoData.icon;
    ['url', 'time', 'count', 'nexttime', 'title', 'id'].forEach(f => {
        document.getElementById(`${f}Volta`).innerHTML = taskInfoData[f];
        if (f === 'title') {
            document.getElementById(`${f}Volta`).title = taskInfoData[f]
        }
    })
    document.getElementById('voltastopTask').setAttribute('data-id', e.target.id)
    voltaMaskBox.classList.remove('mask-box-out');
    voltaMaskBox.classList.add('mask-box-in');
}

document.getElementById('voltacloseTaskDetail').onclick = (e) => {
    voltaMaskBox.classList.remove('mask-box-in');
    voltaMaskBox.classList.add('mask-box-out');
}
//停止任务
document.getElementById('voltastopTask').onclick = async (e) => {
    const id = document.getElementById('voltastopTask').getAttribute('data-id');
    let taskList = await getTaskList();
    chrome.tabs.sendMessage(
        +id,
        {
            type: 'stop',
        },
        async (response) => {
            if (taskList.hasOwnProperty(id)) {
                voltaMaskBox.classList.remove('mask-box-in');
                voltaMaskBox.classList.add('mask-box-out');
                delete taskList[id];
                document.getElementById(id).remove();
                chrome.storage.session.set({ vlotaTaskList: { ...taskList } })
            } else {
                alert('停止任务失败！')
            }
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