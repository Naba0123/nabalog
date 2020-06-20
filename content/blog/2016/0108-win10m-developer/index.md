---
title: Windows 10 Mobile の MADOSMA で開発者登録をしてサンプルアプリを動かす
tags: ["Windows 10 Mobile"]
date: "2016-01-08 22:38:42"
---

<div class="alert info">
はてなブログからの移行記事
</div>

先月 MADOSMA を買いましたが、まだ Visual Studio すら立ち上げていない状態だったので、そろそろ開発環境の構築をしておきます。

偉大なる **かずあき** さんのブログを参考にさせて頂きました。

[http://blog.kazuakix.jp/entry/2015/06/20/215827](http://blog.kazuakix.jp/entry/2015/06/20/215827)

上の記事は Windows Phone 8.1 での記事だったので、Windows 10 / Windows 10 Mobile での方法をメモします。

# Visual Studio 2015 Communityのインストール

Community エディションは、個人開発であれば Professional 相当の機能が無料で使えます。

[https://www.microsoft.com/ja-jp/dev/products/community.aspx](https://www.microsoft.com/ja-jp/dev/products/community.aspx)


# 開発のための開発者ロック解除(PCから)

<div class="alert info">
参考記事の通り(Windows Phone 8.1)に以下の方法でやってみましたが、次のセクションで紹介しているように、Windows 10 Mobile からは端末から開発者ロック解除が出来るかもしれません。
</div>
<br>

Visual Studioをインストールすると、**Windows Phone Developer Registration** が同時にインストールされる（と思う）ので、起動します。

![20160108221451](20160108221451.png)

電話に接続しろと言われるので、MADOSMAをUSBでPCへ接続します。

![20160108221556](20160108221556.png)

画面のロックを解除しろと言われるので、解除しておきます。

![20160108221641](20160108221641.png)

何故か「Windows Phone 8」を検知されていますが、気にせず「登録」をクリック。  
Microsoftアカウントを入力し、登録完了です。

![20160108222114](20160108222114.png)

<br>

## 開発のための開発者ロック解除（端末側から）（動作未確認）

Windows 10 Mobile 上で設定項目を探していたら、開発者モードに切り替えるボタンがあったので、ここからも解除が出来るかもしれません。  
なお、私は Windows Phone 8.1 端末を持っていないので、そちらでこの設定項目があるかは分かりません…。

![20160108222212](20160108222212.png)

`設定` → `更新とセキュリティ` → `開発者向け`

![20160108222356](20160108222356.png)

開発者モードに切り替えようとすると上のようなポップアップが出るので、「はい」をタップ。

![20160108223615](20160108223615.png)

この状態で Windows Phone Developer Registration を起動すると、上のように出ます。  
PCからロック解除してもこの表記になるので、恐らく Windows 10 Mobile 上からでもロック解除が出来るかと思います。

## サンプルアプリを動かす

折角 Windows 10 Mobile なので、UWP アプリを MADOSMA で実行してみます。

![新しいプロジェクトウィンドウ](20160108222727.png)

新しいプロジェクトから、「空白のアプリ（ユニバーサル Windows）」を選択して作成します。

![実行構成](20160108222916.png)

デバッグ設定を「Debug」「ARM」「Device」にして、実行します。

![Vistual Studio 側のログ](20160108223043.png)

MADOSMAの画面がロックされた状態だと、エラーが出ます。  
ロックを解除します。

初回は、ライブラリの配置などでしばらく時間がかかり、しばらくするとMADOSMA上でアプリが実行されます。

![スプラッシュ画面](20160108223210.png)

![アプリ実行画面](20160108223223.png)

ひとまず実行まで出来ました。

あれこれの勉強はこれからしていきます。おわり。
