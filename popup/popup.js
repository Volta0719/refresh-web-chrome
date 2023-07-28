/*
 * @Author: fanjf
 * @Date: 2023-07-20 14:20:05
 * @LastEditTime: 2023-07-28 11:35:16
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
    detailCount: [{
        props: 'innerText',
        value: 'detailCount'
    }],
    nextHappen: [{
        props: 'innerText',
        value: 'nextHappen'
    }],
    weburl: [{
        props: 'innerText',
        value: 'weburl'
    }],
    stopTask: [{
        props: 'title',
        value: 'stopTaskTitle'
    }],
    closeTaskDetail: [{
        props: 'title',
        value: 'closeTaskDetailTitle'
    }],
    refreshTypeSelect: [{
        props: 'innerText',
        value: 'refreshTypeTitle'
    }],
    metaLabel: [{
        props: 'innerText',
        value: 'metaRefreshType'
    }],
    alarmsLabel: [{
        props: 'innerText',
        value: 'alarmsRefreshType'
    }],
    refreshDesc: [{
        props: 'innerText',
        value: 'refreshTypeDesc'
    }],
    refreshType: [{
        props: 'innerText',
        value: 'refreshTypeTitle'
    }]

}
const startTaskDom = document.getElementById("voltastartTask");
const timeBoxDom = document.getElementById("timeBox");
const icoBoxDom = document.getElementById("icoBox");
const voltaMaskBox = document.getElementById("maskBox");
const choosedTimeList = ['30', '60', '300', '600', '900', '1200', '1800', '3600'];
const defaultImgUrl = chrome.runtime.getURL("icons/icon.png")

const getTaskList = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.session.get('vlotaTaskList', (result) => {
            resolve(result?.vlotaTaskList || [])
        })
    })
}

const getCheckedRadio = () => {
    const radioes = document.getElementsByName('voltacontact');
    const result = Array.from(radioes).find(r => r.checked)
    return new Promise((resolve, reject) => {
        resolve(result?.value || 'meta')
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
    id='${cur.tabId}' 
    title='${cur.title}'
    data-icon='${cur.icon}'
    data-url='${cur.url}' 
    data-winid='${cur.winId}' 
    data-count='${cur.count}' 
    data-time='${cur.time}' 
    data-nexttime='${cur.nexttime}'
    data-refreshType='${cur.refreshType}'
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
    ['count', 'time', 'nexttime', 'refreshType'].forEach(ele => {
        voltaIcoDom.setAttribute(`data-${ele}`, taskInfo[ele])
    })
}
if (startTaskDom) {
    startTaskDom.onclick = async () => {
        let refreshType = await getCheckedRadio();
        let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const taskListInfo = await getTaskList();
        const type = taskListInfo.hasOwnProperty(tabs[0].id) ? 'update' : 'start';
        // const sss
        let isRefreshChange;
        if (type === 'update') {
            isRefreshChange = taskListInfo[tabs[0].id].refreshType !== refreshType
        }
        if (refreshType === 'alarms') {
            let minutes = +currentTime / 60
            await chrome.alarms.create(`${tabs[0].id || 'volta-id'}`, {
                periodInMinutes: +minutes.toFixed(2)
            });
        } else {
            //如果change了 那么需要取消掉 alarms的闹钟
            
        }
        chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', type, tabId: tabs[0].id, time: currentTime, refreshType, isRefreshChange }).then(async (response) => {
            const addData = {
                tabId: tabs[0].id,
                refreshType,
                icon: tabs[0]?.favIconUrl || defaultImgUrl,
                url: tabs[0].url,
                winId: tabs[0].windowId,
                time: currentTime,
                count: 0,
                nexttime: response?.nextTime
            }
            let taskList = await getTaskList();//这边重新获取一遍 是为了拿到最新的值
            if (type === 'update') {
                updateIcoDomInfo(tabs[0].id, taskList[tabs[0].id])
            } else {
                addNewIcoDom([addData]);
            }
           await chrome.storage.session.set({ vlotaTaskList: { ...taskList, [tabs[0].id]: addData } })
        })
    }
} else {
    console.log('startTaskDom未找到！！')
}
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
    ['url', 'time', 'count', 'nexttime', 'title', 'tabId', 'refreshType'].forEach(f => {
        if (f === 'refreshType') {
            document.getElementById(`${f}Volta`).innerHTML = chrome.i18n.getMessage(`${taskInfoData[f]}${f}`)
        } else {
            document.getElementById(`${f}Volta`).innerHTML = taskInfoData[f];
            if (f === 'title') {
                document.getElementById(`${f}Volta`).title = taskInfoData[f]
            }
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