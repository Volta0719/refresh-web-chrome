/*
 * @Author: fanjf
 * @Date: 2023-07-20 14:20:05
 * @LastEditTime: 2023-07-21 16:35:16
 * @LastEditors: fanjf
 * @FilePath: \refresh-web\popup\popup.js
 * @Description: 🎉🎉🎉  <p class="time-item">60</p>
 */
console.log('chrome popup', chrome)
const startTaskDom = document.getElementById("startTask");
const timeBoxDom = document.getElementById("timeBox");
const choosedTimeList = ['30', '60', '180', '300', '600', '900', '1200', '1800', '3600']
let currentTime = 20;
let finalTimeItem = choosedTimeList.reduce((acc, cur, index, arr) => `${acc}
<p class='time-item ${index === 0 ? 'volta-active' : ''}' data-index='${index}' data-time='${cur}'>${cur}</p>
`, '')
timeBoxDom.innerHTML = finalTimeItem;
finalTimeItem = null;
if (startTaskDom) {
    startTaskDom.onclick = () => {
        console.log('我点击了启动按钮！')
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    type: 'start',
                    tabId: tabs[0].id,
                    time: currentTime
                },
                function (response) {
                    console.log(response?.farewell);
                }
            );
        });
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
    console.log('e.target.classList1', e.target)
    if (e.target.classList.contains('time-item')) {
        removeItemActive();
        currentTime = e.target.getAttribute("data-time");
        e.target.classList.add('volta-active');
    }
}