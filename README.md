# <img src="https://img1.imgtp.com/2023/08/03/Zain7SkN.png" style="width:30px" /> Refresh Web Page Regularly

English | [中文](https://github.com/Volta0719/refresh-web-chrome/blob/main/doc/readme_zh_CN.md) | [日本語](https://github.com/Volta0719/refresh-web-chrome/blob/main/doc/readme_ja.md)


> This is a browser plugin that helps us refresh web pages on a regular basis.
>
> Sometimes we need to get up-to-date information on operations,Sometimes we need to keep the page log-in.But we may not have the free time to manually refresh all the time.This is why I developed this plugin,it can help us refresh regularly.

This plugin supports the following browsers:

|                     | <img src="https://img1.imgtp.com/2023/08/04/dMvKxCQO.png" style="width:20px" /> Edge | <img src="https://img1.imgtp.com/2023/08/04/T7csyLE3.png" style="width:22px" /> Firefox | <img src="https://img1.imgtp.com/2023/08/04/21gqH24x.png" style="width:20px" /> Chrome |
| :-----------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|     Source Code     | [refresh-web-chrome](https://github.com/Volta0719/refresh-web-chrome) | [refresh-web-firefox](https://github.com/Volta0719/refresh-web-firefox#refresh-web-firefox) | [refresh-web-chrome](https://github.com/Volta0719/refresh-web-chrome) |
|   Plugins address   | [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/gjklkjghflejbeibdlefkbdljeoihkcp) | [Firefox Browser ADD-ONS](https://addons.mozilla.org/en-US/firefox/addon/refresh-web-page-regularly/) |                 Use it from the source code                  |
| Supported languages |                  Chinese、English、Japanese                  |                  Chinese、English、Japanese                  |                  Chinese、English、Japanese                  |

![](https://img1.imgtp.com/2023/08/03/7hiRC5VM.png)

![](https://img1.imgtp.com/2023/08/03/gzPiVWhw.png)

## How To Use？

1. **First you have to install**：You can install it from the store or use the source code.
2. **Add a refresh task :** Choose when and how you want to refresh. Different refresh methods correspond to different code implementations. So if you need to perform the refresh task all night and all night, choose *Long-lasting Refresh* type. If you add successfully, this icon  (<img src="https://img1.imgtp.com/2023/08/03/Zain7SkN.png" style="width:26px" />) will appear in the right-centered position on the target website. Different refresh methods correspond to different animation effects. Left-click can stop the task, right-click can hide the icon during this refresh cycle.
3. **Grab a cup of coffee and wait for the refresh**: You can see the ICO icon at the bottom of the plugin's popup page, and You can get the details of this task after you click it (For example, the next refresh time and how many times it had already been refreshed).

## Q&A

###### 1. What is the difference between the two refresh modes?

- **Default Refresh:** Suitable for temporary refreshes. For example, I need to pay attention to whether there is feedback on the results of what I just did. If your browser classifies your page as an inactive tab or doesn't work for a long time, it won't work(Unless you can make sure your browser doesn't do this).
- **Long-lasting Refresh** :Suitable for long refreshes.It will always work even if you have not operated for a long time. For example, If you want to keep your page logged in, just use this refresh method , Tomorrow you will see an increasing number of refreshes. Yes, it always works.

###### 2. How can I stop the task?

- **In the popup page**: Click the footer ico, In the upper right corner of the details page, there is a stop button to stop the task that is automatically refreshed.
- **In the target website**: In the right-centered position on the target website will appear this icon  (<img src="https://img1.imgtp.com/2023/08/03/Zain7SkN.png" style="width:26px" />),click it will stop the task.

###### 3. How can i use it from the source code?

- Obtain the source code and execute the following command:

  ```shell
  git clone <The corresponding source repository>
  
  npm install 
  
  npm run build
  ```

- On the Plugin Management page , turns on developer mode and select Load plugin from file (The packaged product of the previous step)

- You can use it now!



