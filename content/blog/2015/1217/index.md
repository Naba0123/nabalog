---
title: ApacheのVirtualHostで階層毎にDocumentRootを変える
tags: ["その他プログラミング系"]
date: "2015-12-17 21:33:36"
---

考えれば簡単だったけど、意外と悩んだのでメモしておきます。

<br>

# 環境
* CentOS 6.7
* Apache 2.2.15

<br>

# やりたいこと
`http://naba.biz/sub/` に対してDocumentRootを設定したい

<!-- more -->

<br>

# 解決方法
`/etc/httpd/conf/httpd.conf` を編集。

```
<VirtualHost *:80>
    ServerName naba.biz
    DocumentRoot "/var/www/html"

    <Directory "var/www/html">
        Options FollowSymLinks Indexes
        AllowOverride None
    </Directory>

    Alias /sub/ "/var/www/html2"
    <Directory "var/www/html2">
        Options FollowSymLinks Indexes
        AllowOverride None
    </Directory>

    SetEnvIf    Request_URI "\.(gif|jpg|png|css|js)$" nolog
    ErrorLog    logs/http_error_log
    CustomLog   logs/html_access_log combined env=!nolog
</VirtualHost>
```

<br>

ポート80のVirtualHostを編集する。

`Alias /ディレクトリ名 "DocumentRoot"`を記述する。これだけ。簡単ですね。

<br>

変更した後はApacheの再起動を忘れずに。

```
# service httpd restart
```

<br>
