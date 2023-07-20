<!--
 * @Author: fanjf
 * @Date: 2023-07-20 10:43:02
 * @LastEditTime: 2023-07-20 15:25:07
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