<!--
 * @Author: fanjf
 * @Date: 2023-07-20 10:43:02
 * @LastEditTime: 2023-07-28 16:42:28
 * @LastEditors: fanjf
 * @FilePath: \refresh-web\README.md
 * @Description: 🎉🎉🎉
-->
# refresh-web
Refresh web pages regularly

https://github.com/Volta0719/refresh-web

<meta http-equiv="refresh" content="5">

https://juejin.cn/post/7035782439590952968#heading-10

# Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.
https://blog.csdn.net/m0_46555380/article/details/127314553

接收端, 也就是说目标页面必须有 chrome.runtime.onMessage 监听消息, 如果 “content-script” 没有注入到页面中, 那么这个页面就无法接收消息

如果你的插件刚刚加载, 并且在一个已经加载完毕的页面中使用它, 则会出这个问题.

因为这个页面已经加载完了, 它并没有被注入脚本, 你需要刷新页面, 使脚本注入到页面中, 然后才可以发送消息。

# Refused to execute inline event handler because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.
谷歌插件不允许在html内添加事件，可以在js中通过操作dom元素的方式增添事件。

# Uncaught TypeError: Error in invocation of tabs.sendMessage(integer tabId, any message, optional object options, optional function callback): No matching signature.
发送消息的时候 tabid应该是一个数字


# The "background.persistent" key cannot be used with manifest_version 3. Use the "background.service_worker" key instead.

domDiv.getAttribute("data-index")

favIconUrl
url
# Alarm period is less than minimum of 1 minutes. In released .crx, alarm "727558402" will fire approximately every 1 minutes.
使用alarms时候  至少应该大于一分钟

# 转场动画

https://www.zhangxinxu.com/wordpress/2019/05/css-transfer-animation/

# 浏览器插件 监听tab页关闭

https://www.bytenote.net/article/175316400598941697

# manifest v3
https://juejin.cn/post/7000363901221093412
https://juejin.cn/post/7021072232461893639#heading-11

# 阻止进入休眠状态
https://microsoftedge.microsoft.com/addons/detail/%E9%98%B2%E6%AD%A2%E4%BC%91%E7%9C%A0%E6%88%96%E5%B1%8F%E5%B9%95%E5%85%B3%E9%97%AD/gpcjnpdkecmdghbnkeifiljlknkjhjke?hl=zh-CN

https://microsoftedge.microsoft.com/addons/detail/keep-awake-display-sys/jjaendaehnalocdginbjmaclfjgidlla

# webpack 打包
https://juejin.cn/post/7100839194641039368
https://juejin.cn/post/7008702136666030111
https://blog.csdn.net/qq_44859233/article/details/121593705
https://blog.csdn.net/weixin_43334673/article/details/107687418

https://blog.csdn.net/Primary_wind/article/details/128053613
https://developer.chrome.com/extensions/i18n

# 插件文档

https://github.com/GoogleChrome/chrome-extensions-samples


