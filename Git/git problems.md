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