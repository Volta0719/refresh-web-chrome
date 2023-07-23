<!--
 * @Author: fanjf
 * @Date: 2023-07-20 10:43:02
 * @LastEditTime: 2023-07-21 15:08:40
 * @LastEditors: fanjf
 * @FilePath: \refresh-web\README.md
 * @Description: 🎉🎉🎉
-->
# refresh-web
Refresh web pages regularly

<meta http-equiv="refresh" content="5">

https://juejin.cn/post/7035782439590952968#heading-10

# Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.
https://blog.csdn.net/m0_46555380/article/details/127314553

接收端, 也就是说目标页面必须有 chrome.runtime.onMessage 监听消息, 如果 “content-script” 没有注入到页面中, 那么这个页面就无法接收消息

如果你的插件刚刚加载, 并且在一个已经加载完毕的页面中使用它, 则会出这个问题.

因为这个页面已经加载完了, 它并没有被注入脚本, 你需要刷新页面, 使脚本注入到页面中, 然后才可以发送消息。

# Refused to execute inline event handler because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.
谷歌插件不允许在html内添加事件，可以在js中通过操作dom元素的方式增添事件。


domDiv.getAttribute("data-index")

favIconUrl
url

# 转场动画

https://www.zhangxinxu.com/wordpress/2019/05/css-transfer-animation/