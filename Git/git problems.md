# Git clone 报错：: OpenSSL SSL_read: SSL_ERROR_SYSCALL, errno 10054

```
执行下面的命令，然后重试

git config --global  http.postBuffer 524288000
git config  --global  http.sslVerify "false"
```

# vscode推送、拉取失败

方法一：

```
在目录下cmd，打开终端

git config --global  http.postBuffer 524288000
git config  --global  http.sslVerify "false"

git push origin main:main
```

方法二：
```
在vscode终端下：
git config --global  http.postBuffer 524288000
git config  --global  http.sslVerify "false"

重启一下vscode，然后再推送

```

## 设置github sockets代理

```
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
git config –-global https.https://github.com.proxy socks5://127.0.0.1:1080
```

![image-20211023092421889](Imag/image-20211023092421889.png)

## 设置github http代理

```
git config –global http.https://github.com.proxy https://127.0.0.1:1081
git config –global https.https://github.com.proxy https://127.0.0.1:1081
```

## 查看、重置代理

```
查看所有配置
git config -l
reset 代理设置
git config –global –unset http.proxy
git config –global –unset https.proxy
```

