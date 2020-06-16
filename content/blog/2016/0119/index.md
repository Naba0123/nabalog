---
Title: VagrantでBox追加時にエラーが出た時の話
Category:
- その他プログラミング系
Date: 2016-01-19T22:02:30+09:00
URL: https://blog.naba.biz/entry/2016/01/19/220230
EditURL: https://blog.hatena.ne.jp/naba0123/naba.hatenablog.jp/atom/entry/6653586347153699126
---

# 環境
* Windows 10 Home (ほぼクリーンインストール時)
* Vagrant 1.8.1

<br>

# 症状
```
vagrant box add centos https://f0fff3908f081cb6461b407be80daf97f07ac418.googledrive.com/host/0BwtuV7VyVTSkUG1PM3pCeDJ4dVE/centos7.box
```

を実行してboxを追加しようとすると、以下のエラーが出る

```
An error occurred while downloading the remote file.
The error message, if any, is reproduced below.
Please fix this error and try again.
```
下にエラー詳細が出るって書いてあるのに何も出力されてなくて、「何だこれ」ってなってた。

<br>

# 解決方法(直球)
* [http://www.microsoft.com/downloads/ja-jp/details.aspx?FamilyID=a7b7a05e-6de6-4d3a-a423-37bf0912db84&displayLang=ja:title]
* [http://www.microsoft.com/downloads/ja-jp/details.aspx?familyid=BD512D9E-43C8-4655-81BF-9350143D5867&displaylang=ja:title]

上記をインストールして完了。

<br>

以下、詳細。

<!-- more -->

<br>

# Vagrantのエラーログ

```
set VAGRANT_LOG=DEBUG
```
を実行すると、コマンドプロンプト上でVagrantのデバッグログを出力することが可能。

この状態で、再び ```vagrant box add ***``` を実行。

```
～省略～
ERROR vagrant: C:/HashiCorp/Vagrant/embedded/gems/gems/vagrant-1.8.1/lib/vagrant/util/downloader.rb:206:in `execute_curl'
～省略～

```
どうやら、```downloader.rb```の206行目でエラーが発生している模様。  

<br>

そのあたりを探していると、どうやら```curl.exe```を実行している模様。  
その```curl.exe```は```C:\HashiCorp\Vagrant\embedded\bin\curl.exe```にある。

試しに実行してみると、

[f:id:naba0123:20160119215748p:plain]

ビンゴのようですね。

<br>

あとは、グーグル先生に聞くと、以下の記事がヒットしました。

[http://d.hatena.ne.jp/yasuhallabo/20111105/1320504409:embed:cite]

* [http://www.microsoft.com/downloads/ja-jp/details.aspx?FamilyID=a7b7a05e-6de6-4d3a-a423-37bf0912db84&displayLang=ja:title]
* [http://www.microsoft.com/downloads/ja-jp/details.aspx?familyid=BD512D9E-43C8-4655-81BF-9350143D5867&displaylang=ja:title]

をインストールすれば良いみたいです。

32bitか64bitか自信がなかったので、両方インストールしました。

インストールしてから再度 ```vagrant box add ***``` を実行すると、無事にboxが追加されました。

<br>
