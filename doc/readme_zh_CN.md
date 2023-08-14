# <img src="https://img1.imgtp.com/2023/08/03/Zain7SkN.png" style="width:30px" /> 定时刷新页面

[English](https://github.com/Volta0719/refresh-web-chrome/blob/main/README.md) | 中文 | [日本語](https://github.com/Volta0719/refresh-web-chrome/blob/main/doc/readme_ja.md)


> 这是一个可以帮助我们定时自动刷新网页的浏览器插件。
>
> 有时候我们需要等待获取最新的操作结果反馈
>
> 有时候我们需要一直刷新来保证页面不会退出登录
>
> 但我们可能没有那么多的时间去关注，所以这个浏览器插件可以帮助我们定时刷新指定页面

支持在以下浏览器中使用：

|              | <img src="https://img1.imgtp.com/2023/08/04/dMvKxCQO.png" style="width:20px" /> Edge | <img src="https://img1.imgtp.com/2023/08/04/T7csyLE3.png" style="width:22px" /> Firefox | <img src="https://img1.imgtp.com/2023/08/04/21gqH24x.png" style="width:20px" /> Chrome |
| :----------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|    源代码    | [refresh-web-chrome](https://github.com/Volta0719/refresh-web-chrome) | [refresh-web-firefox](https://github.com/Volta0719/refresh-web-firefox#refresh-web-firefox) | [refresh-web-chrome](https://github.com/Volta0719/refresh-web-chrome) |
| 插件商店地址 | [微软插件商店](https://microsoftedge.microsoft.com/addons/detail/gjklkjghflejbeibdlefkbdljeoihkcp) | [火狐插件商店](https://addons.mozilla.org/zh-CN/firefox/addon/refresh-web-page-regularly/) |                        从源码安装使用                        |
|   支持语言   |                          中、日、英                          |                          中、日、英                          |                          中、日、英                          |

![](https://img1.imgtp.com/2023/08/03/7hiRC5VM.png)

![](https://img1.imgtp.com/2023/08/03/gzPiVWhw.png)

## 如何使用？

1. **首先你得安装**：你可以从插件商店获取或者从源码安装。
2. **添加一个刷新任务**： 在插件弹出的首页，选择刷新间隔以及刷新方式。不同的刷新方式对应着不同的代码实现。所以加入你需要一整晚一整晚的刷新，请选择*长久刷新*的模式。如果刷新任务添加成功了， 那么这个图标 (<img src="https://img1.imgtp.com/2023/08/03/Zain7SkN.png" style="width:30px" />)将会出现在目标网站靠右居中的位置。 不同的刷新模式将会有不同的动画效果。在目标网站上左键点击可以停止这个刷新任务，右键点击将会在本次刷新周期内暂时隐藏此图标。 
3. **泡杯茶等待刷新**: 在插件弹出页面的底部我们可以看到网站的ICO图标，点击其中的某个图标，我们可以看到关于这个刷新任务的详细情况，包括下次刷新时间以及已经刷新了多少次。

## Q&A

###### 1. 两种刷新模式有什么区别?

- **默认刷新:** 适合短时间的临时刷新。举个例子，假如我需要关注这个页面的刚才操作结果反馈就可以使用这种刷新模式（反馈可能是5-20分钟内完成）。但是一旦你的浏览器将你的页面归为不活跃标签，那么这种刷新方式将会无法按照既定时间刷新（除非你能确认认浏览器已经设置了不休眠标签页）。
- **长久刷新** :适合长时间的刷新场景.即使你已经下班回家并且将电脑锁屏，这种刷新方式仍会一直在工作 。如果你想保持页面的登录状态，那么就采用这种刷新方式，第二天你可以从刷新次数中看到它一直在工作。

###### 2. 怎么样停止任务?

- **插件弹出界面**: 点击底部的ICO图标，在详情页面的右上角有停止按钮。
- **在目标网站上**: 在网站的靠右中间会有这个图标  (<img src="https://img1.imgtp.com/2023/08/03/Zain7SkN.png" style="width:30px" />)，单击这个图标也可以停止。

###### 3. 从源码怎么安装使用?

- 获取源码以及打包插件:

  ```shell
  git clone <从对应的浏览器仓库克隆>
  
  npm install 
  
  npm run build
  ```

- 在插件管理页面打开*开发人员模式*并且选择从文件加载插件（上一步的打包产物）

- 现在你可以使用这个插件了！

###### 4.在火狐浏览器插件的安装界面，下面的这个警告是什么意思？

> ⚠️ 此附加组件未经 Mozilla 主动安全审计，安装前请确认您对其信任

99.65%的扩展都有该警告！

无论如何，如果您可以摆脱“访问所有网站的数据”权限，它可以吸引更多人。您应该能够使用“activeTab”权限或只是“选项卡”权限做很多事情。或者使主机权限可选（尽管这需要很多工作）。

所以你可以忽略这个警告！更加详细的信息你可以访问[这个帖子](https://discourse.mozilla.org/t/this-add-on-is-not-actively-monitored-for-security-by-mozilla-make-sure-you-trust-it-before-installing/121823)。



