---
title: VagrantとVirtualBoxでLAMP開発環境を整える(CentOS7/PHP7)
tags: ["その他プログラミング系"]
date: "2016-01-16 19:28:40"
---

## 環境構築したもの

### Windows 10 Home
* Vagrant
* VirtualBox

### 仮想環境
* CentOS 7.0 x86_64
* Apache 2.4.6
* MySQL 5.7.10
* PHP 7.0.2

<!-- more -->

<br>

# Vagrant

これを使うとVirtualBoxの設定画面をいちいち弄ったり、ゲストOSをインストールしなくて済みます。便利（昨日知りました）

[f:id:naba0123:20160116171819p:plain:w450]

[https://www.vagrantup.com/]

<br>

# VirtualBox

仮想環境を作る

[https://www.virtualbox.org/:title]

今回は、最新版の5.0を使用しています。

<br>

<br>

# Vagrantの設定

* コマンドプロンプトを立ち上げて、仮想環境のフォルダを作成します。
```
mkdir centos
cd centos
```

<br>

続けて、以下のコマンドを実行
```
vagrant box add CentOS https://f0fff3908f081cb6461b407be80daf97f07ac418.googledrive.com/host/0BwtuV7VyVTSkUG1PM3pCeDJ4dVE/centos7.box
vagrant plugin install vagrant-vbguest
```
1行目は、vagrantのboxを指定。以下から目的のboxを探して下さい。

[http://www.vagrantbox.es/:title]

2行目は、VirtualBoxのGuest Additionsを使用するためのプラグインで、私の環境ではインストールしないとエラーが出ました。

[http://qiita.com/isaoshimizu/items/e217008b8f6e79eccc85:embed:cite]

<br>

仮想環境を作成します
```
vagrant init CentOS
notepad.exe Vagrantfile
```
メモ帳でコンフィグファイルが開くので、以下のように設定
```
Vagrant.configure(2) do |config|
  config.vm.box = "CentOS7"
  config.vm.network "private_network", ip: "192.168.33.10" (←コメントアウトを外す)
  config.vm.synced_folder "../hello", "/var/www/html/hello" (←お好みで設定、後述)
  config.vm.provider "virtualbox" do |vb| (←コメントアウトを外す)
    vb.memory = "1024" (←コメントアウトを外す)
  end (←コメントアウトを外す)
end
```
**config.vm.synced_folder**は、CentOSとHostの共有フォルダになります。  
上記の場合だと、ホストの"../hello"フォルダと、ゲストの"/var/www/html/hello"フォルダが共有されることになります。

<br>

設定は以上です、仮想環境を起動します。
```
vagrant up

vagrant halt (←停止するとき)
vagrant reload (←再起動するとき)
```

<br><br>

# SSHで接続

起動したので、SSHで接続します。  
Windowsにはコマンドラインで使えるSSHクライアントがデフォルトではないので、今回はputtyを使います。

[http://www.chiark.greenend.org.uk/~sgtatham/putty/:title]

* ホスト名：192.168.33.10
* ポート番号：22

[f:id:naba0123:20160116180844p:plain:w450]

文字コードはUTF-8にしないと日本語が文字化けます。

* ユーザー名：vagrant
* パスワード：vagrant

<br><br>

# CentOSの設定

環境構築の時のみルート権限になっておきます
```
$ su -
```

完全ローカルの開発環境なので、ファイアウォールとSELinuxをオフにします
```
# systemctl stop firewalld
# systemctl disable firewalld

# vi /etc/sysconfig/selinux
> SELINUX=disabled (書き換え)
```
<br>

### yumリポジトリの追加
PHP7を入れる時などに、デフォルトのリポジトリでは5.3などとバージョンが古いので、別のリポジトリを追加しておきます。

しかし、デフォルトでオフにしておき、必要に応じて使うように設定しておきます。

```
# yum install wget
# wget http://ftp.iij.ad.jp/pub/linux/fedora/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
# wget http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
# wget http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el7.rf.x86_64.rpm
# rpm -Uvh epel-release-7-5.noarch.rpm remi-release-7.rpm rpmforge-release-0.5.3-1.el7.rf.x86_64.rpm
```

それぞれ、最新は以下から確認できます。

epel : [https://fedoraproject.org/wiki/EPEL/ja]

remi : [http://rpms.famillecollet.com/]

rpmforge : [http://pkgs.repoforge.org/rpmforge-release/]

<br>

デフォルトでオフになるように設定します。
```
# vi /etc/yum.repos.d/epel.repo
> [epel] を enabled=0 に
# vi /etc/yum.repos.d/epel.repo
> [remi] を enabled=0 に (私の環境ではデフォルトでオフでした)
# vi /etc/yum.repos.d/rpmforge.repo
> [rpmforge] を enabled=0 に
```

<br>

どのリポジトリがデフォルトでオンになっているかは、以下のコマンドで確認できます
```
# yum repolist all
```

[http://codaholic.org/?p=1853:title]

<br>

### 日本時刻の設定
vagrantから導入すると、世界標準時になっているので、日本時間に変更します。
```
# yum install ntp
# vi /etc/ntp.conf
> serverを以下に書き換え
server -4 ntp.nict.jp
server -4 ntp1.jst.mfeed.ad.jp
server -4 ntp2.jst.mfeed.ad.jp
server -4 ntp3.jst.mfeed.ad.jp

# systemctl start ntpd
# systemctl enable ntpd.service
```
<br>

* タイムゾーンの変更

```
# timedatectl set-timezone Asia/Tokyo
# timedatectl (Asia/Tokyoになっていることを確認)
```

<br><br>

# Apache

```
# yum install httpd
# systemctl enable httpd.service
```


<br><br>

# PHP

前述のとおり、デフォルトのyumリポジトリではPHP5.3なので、remiのリポジトリを使用します。
```
# yum --enablerepo=remi-php70 install php php-pear php-devel php-mbstring php-mysql php-pdo php-xml
```

確認画面でPHP7.0であることを確認してインストールします。

Apacheで使えるようにモジュールをincludeしておきます
```
# vi /etc/httpd/conf.d/php.conf
> LoadModule php7_module   /usr/lib64/httpd/modules/libphp7.so (←先頭行に追加)
```

<br><br>

# MySQL

MySQLのyumリポジトリを追加してそこからインストールします。
```
# wget http://dev.mysql.com/get/mysql57-community-release-el7-7.noarch.rpm
# rpm -Uvh mysql57-community-release-el7-7.noarch.rpm
# yum --enablerepo=mysql57-community install mysql-community-server
# systemctl enable mysqld.service
```

[http://dev.mysql.com/downloads/repo/yum/:title]

<br>

MySQLは5.7から、rootユーザの初期パスワードがMySQLのログに書かれています。
```
# cat /var/log/mysqld.log | grep 'password is generated'
> [Note] A temporary password is generated for root@localhost: ********
# mysql -u root -p****** (ログイン)
```

[http://qiita.com/ma_me/items/ae449ad8a2c424665310:embed:cite]

<br><br><br>

以上で完了です。後はお好きに開発を進められますね。

思い出しながら書いたので、忘れていることがあったらゴメンナサイ。
