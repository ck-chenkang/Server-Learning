# git基本操作

## 查看配置

```
git config --list
```

```
C:\Users\sontech202006>git config --list
diff.astextplain.textconv=astextplain
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
http.sslbackend=openssl
http.sslcainfo=C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt
core.autocrlf=true
core.fscache=true
core.symlinks=false
pull.rebase=false
credential.helper=manager
user.email=bettermanchenkang@163.com
user.name=ck-chenkang
http.postbuffer=524288000
http.sslverify=false
http.https://github.com.proxy=socks5://127.0.0.1:1080
https.https://github.com.proxy=socks5://127.0.0.1:1080
```

## 设置用户名 邮箱

```
git config --global user.name “你的用户名”
git config --global user.email “你的邮箱”
```

## 推送到远程仓库

```
git push
```

## 本地存取账号密码或token

```
 git config --global credential.helper store
```

## 查看仓库状态

```
git status
```

## 添加所有的修改

```
git add .
```

## 确认修改

```
git commit -m '说明'
```

