# <img src="https://raw.githubusercontent.com/Volta0719/refresh-web-firefox/main/icons/icon.png" style="width:30px" /> ページを定期的に更新する

[English](https://github.com/Volta0719/refresh-web-chrome/blob/main/README.md) | [中文](https://github.com/Volta0719/refresh-web-chrome/blob/main/doc/readme_zh_CN.md) | 日本語


> これは、Webページを定期的に自動的に更新するのに役立つブラウザプラグインです。
>
> 操作の結果に関する最新のフィードバックを待つ必要がある場合があります
>
> ページがログアウトしないように更新し続ける必要がある場合があります
>
> ただし、注意を払う時間が少ない可能性があるため、このブラウザプラグインは特定のページを定期的に更新するのに役立ちます

以下のブラウザでサポートされています:

|                        | <img src="https://raw.githubusercontent.com/Volta0719/refresh-web-firefox/main/image/edge.png" style="width:20px" /> Edge | <img src="https://raw.githubusercontent.com/Volta0719/refresh-web-firefox/main/image/firefox.png" style="width:22px" /> Firefox | <img src="https://raw.githubusercontent.com/Volta0719/refresh-web-firefox/main/image/chrome.png" style="width:20px" /> Chrome |
| :--------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| ソースコードリポジトリ | [refresh-web-chrome](https://github.com/Volta0719/refresh-web-chrome) | [refresh-web-firefox](https://github.com/Volta0719/refresh-web-firefox#refresh-web-firefox) | [refresh-web-chrome](https://github.com/Volta0719/refresh-web-chrome) |
|   プラグインアドレス   | [Edge アド オン](https://microsoftedge.microsoft.com/addons/detail/gjklkjghflejbeibdlefkbdljeoihkcp) | [ファイアーフォックスストア](https://addons.mozilla.org/ja/firefox/addon/refresh-web-page-regularly/) |                ソースからのインストールと使用                |
|        対応言語        |                    中国語、 英語、日本語                     |                    中国語、 英語、日本語                     |                    中国語、 英語、日本語                     |

![](https://raw.githubusercontent.com/Volta0719/refresh-web-firefox/main/image/home.png)

![](https://raw.githubusercontent.com/Volta0719/refresh-web-firefox/main/image/detail.png)

## 使い方？

1. **まず、インストールする必要があります**：プラグインストアから入手するか、ソースコードからインストールできます。
2. **更新タスクを追加する :** 更新するタイミングと方法を選択する。異なる更新方法は、異なるコード実装に対応します。したがって、一晩中、一晩中更新タスクを実行する必要がある場合, 選ぶ*長い*方法. 正常に追加すると、このアイコン(<img src="https://raw.githubusercontent.com/Volta0719/refresh-web-firefox/main/icons/icon.png" style="width:26px" />)がターゲットWebサイトの右中央に表示されます。 異なる更新方法は、異なるアニメーション効果に対応します。左クリックするとタスクを停止でき、右クリックするとこの更新サイクル中にアイコンを非表示にできます。
3. **コーヒーを飲みながらリフレッシュを待つ**: プラグインのポップアップページの下部にICOアイコンが表示され、クリックするとこのタスクの詳細を取得できます(たとえば、次の更新時間やすでに更新された回数)。

## Q&A

###### 1. 2つのリフレッシュモードの違いは何ですか?

- **デフォルト:** 一時的な更新に適しています。たとえば、私が今やったことの結果についてのフィードバックがあるかどうかに注意を払う必要があります。ブラウザがページを非アクティブなタブとして分類している場合、または長時間機能しない場合、機能しません(ブラウザがこれを行わないことを確認できない場合を除く)。
- **長い** :長いリフレッシュに適しています。長期間操作していなくても常に機能します。たとえば、ページをログインしたままにしたい場合は、これを使用するだけです 更新方法 、明日は更新の数が増えます。はい、常に機能します。

###### 2. タスクを停止するにはどうすればよいですか?

- **ポップアップページ**: フッターicoをクリックし、詳細ページの右上隅に、自動的に更新されるタスクを停止する停止ボタンがあります。
- **ターゲットのウェブサイトで**: ターゲットWebサイトの右中央位置にこのアイコンが表示されます(<img src="https://raw.githubusercontent.com/Volta0719/refresh-web-firefox/main/icons/icon.png" style="width:26px" />)、クリックするとタスクが停止します。

###### 3. ソースコードからどのように使用できますか?

- ソースコードを入手し、次のコマンドを実行します:

  ```shell
  git clone <対応するソースリポジトリ>
  
  npm install 
  
  npm run build
  ```

- [プラグイン管理] ページで、開発者モードをオンにし、[ファイルからプラグインを読み込む] を選択します (前の手順のパッケージ製品)

- あなたは今それを使うことができます!

###### 4.プラグインのインストール画面でこの警告はどういう意味ですか?

> ⚠️ このアドオンは、Mozilla によるセキュリティの監視がアクティブに行われていません。インストールする前に、信頼できるアドオンか自分で確かめてください

何もする必要はありません、すべての拡張機能にはその警告があります!

まあ、すべてではなく、それらの99.65%だけです

いずれにせよ、「すべてのWebサイトのデータにアクセスする」権限を取り除くことができれば、より多くの人々を引き付けることができます。あなたは 'activeTab'権限、あるいは単に 'tabs'権限で多くのことができるはずです。または、ホストのアクセス許可をオプションにします(ただし、これは多くの作業です)。

したがって、この警告は無視してかまいません。詳細については、[この投稿](https://discourse.mozilla.org/t/this-add-on-not-active-monitored-for-security-by-mozilla-make-sure-you-trust-before-install/121823)をご覧ください。



