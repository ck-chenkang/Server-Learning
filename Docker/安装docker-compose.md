## 安装Docker-compose

下载指定版本的docker-compose

```
curl -L https://get.daocloud.io/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

对二进制文件赋可执行权限

```
[root@localhost ~]# chmod +x /usr/local/bin/docker-compose
```

测试下docker-compose是否安装成功

```
[root@localhost ~]# docker-compose --version
docker-compose version 1.13.0, build 1719ceb
```
