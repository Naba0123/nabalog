---
Title: Surfaceのタッチスクリーンをオンオフするバッチファイルを作った
Category:
- Windows
Date: 2017-07-11T00:27:58+09:00
URL: https://blog.naba.biz/entry/2017/07/11/002758
EditURL: https://blog.hatena.ne.jp/naba0123/naba.hatenablog.jp/atom/entry/8599973812278567687
---

# あらすじ

Surface Pro 4 + 外部ディスプレイを使っていて、「外部ディスプレイに表示のみ」にした場合に**タッチパネルが反応して外部ディスプレイの操作の邪魔をする**など、一時的にタッチパネルを無効化したい場合もあるかと思います。

デイバイスマネージャから「HID 準拠タッチ スクリーン」を無効化すれば解決するのですが、いちいち開いて変更するのが面倒なのでバッチファイルを作成して「Win+R」からサクっと呼び出します。

<!-- more -->

<br>

# 必要なもの

コマンドラインからデバイスの有効・無効化を行うには「DevCon」という
Windows Driver Kit (WDK) に含まれるソフトを使用するため、WDKをインストールします。

[https://developer.microsoft.com/ja-jp/windows/hardware/windows-driver-kit:title]

> 重要: WDK をインストールすると、モダン アプリケーションを開発することができなくなります。

と書いてあるのですが、「モダンアプリケーション」が何を指すのかわかりません…。

また、Visual Studio 2017 とはまだ互換性がないようです。

<br>

# バッチファイル

まず、「デバイスマネージャ」→「ヒューマン インターフェイス デバイス」→「HID 準拠タッチ スクリーン」のハードウェアIDの一番上の長いものをメモります。（今回は「HID 準拠タッチ スクリーン」は2つあったので両方メモ）

[f:id:naba0123:20170711001524j:plain:w550]

その2つに対して、`devcon`コマンドを使用してデバイスを無効化するバッチファイルを作成します。

```
:: devcon.exeのパス（Windows 10 Pro）
@set DEVCON="C:\Program Files (x86)\Windows Kits\10\Tools\x64\devcon.exe"
  
:: HID タッチスクリーンの無効化
%DEVCON% disable "メモしたハードウェアID1"
%DEVCON% disable "メモしたハードウェアID2"
```

有効化のバッチファイルも、同様に作成します。
```
:: devcon.exeのパス（Windows 10 Pro）
@set DEVCON="C:\Program Files (x86)\Windows Kits\10\Tools\x64\devcon.exe"
  
:: HID タッチスクリーンの無効化
%DEVCON% enable "メモしたハードウェアID1"
%DEVCON% enable "メモしたハードウェアID2"
```

<br>

# Win+Rから実行したい

このバッチファイルには管理者権限が必要で、それをバッチファイルで書くと大変（というか知らない）ので、  
バッチファイルのショートカットを作成して、その実行に管理者権限が必要なように設定します。

バッチファイルのショートカットを作成し、「プロパティ」の「詳細設定」から「管理者として実行」にチェックを入れます。

[f:id:naba0123:20170711002519j:plain:w550]

<br>

あとは、このショートカットキーを Path が通っている場所において、Win+Rから叩けば簡単にタッチスクリーンのオンオフを制御することが出来ます。

<br>

## 参考

[https://qwerty.work/blog/2015/03/wdkdevconbatcommand.php:title]

