# yum基础

## 增加yum源

以Docker为例

`yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo`

`yum makecache fast`

## yum makecache fast 和yum clean all

参考链接：

[yum makecache fast 和yum clean all](https://blog.csdn.net/qq_41545647/article/details/102860372)

我们在更新yum源或者出现配置yum源之后，通常都会使用yum makecache 生成缓存

`yum makecache fast`

这个命令是将软件包信息提前在本地缓存一份，用来提高搜索安装软件的速度

`yum clean all`

yum 会把下载的软件包和header存储在cache中而不自动删除。如果觉得占用磁盘空间，可以使用yum clean指令清除缓存。