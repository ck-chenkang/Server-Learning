# yum命令详解

[yum命令详解](https://blog.csdn.net/shuaigexiaobo/article/details/79875730)

## yum介绍

Yum(全称为 Yellow dogUpdater, Modified)是一个在Fedora和RedHat以及CentOS中的Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。yum提供了查找、安装、删除某一个、一组甚至全部软件包的命令，而且命令简洁而又好记。

### yum的命令形式一般是如下：  

```
yum –选项命令包 [command] [package ...]
```

- 其中选项是可选的，选项包括-h（帮助），-y（当安装过程提示选择全部为"yes"），-q（

不显示安装的过程）等等。

- [command]为所要进行的操作
- [package ...]是操作的对象

### /etc/yum.reops.d 目录

yum的一切信息都存储在一个叫yum.reops.d目录下的配置文件中，通常位于/etc/yum.reops.d目录下。

```
vi /etc/yum.repos.d/CentOS-Base.repo

# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client.  You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
# If the mirrorlist= does not work for you, as a fall back you can try the
# remarked out baseurl= line instead.
#
#

[base]
name=CentOS-$releasever - Base
mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os&infra=$infra
#baseurl=http://mirror.centos.org/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

#released updates
[updates]
name=CentOS-$releasever - Updates
mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates&infra=$infra
#baseurl=http://mirror.centos.org/centos/$releasever/updates/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

#additional packages that may be useful
[extras]
name=CentOS-$releasever - Extras
mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras&infra=$infra
#baseurl=http://mirror.centos.org/centos/$releasever/extras/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

#additional packages that extend functionality of existing packages
[centosplus]
name=CentOS-$releasever - Plus
mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=centosplus&infra=$infra
#baseurl=http://mirror.centos.org/centos/$releasever/centosplus/$basearch/
gpgcheck=1
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
```

- [extras]这个表示的是名称，--->yum的ID，必须唯一，本地有多个yum源的时候，这里必须是唯一的

- name=CentOS-$releasever - Base     ----->具体的yum源名字，其实相当于对它的描述描述信息  $r releasever你可以使用这个变量参考红帽企业Linux发行版，也就是说表示当前发行版的大版本号。

- baseurl是镜像服务器地址，只能写具体的确定地址。下面的例子中，只能有一个baseurl，但里面可以包含多个url

- mirrorlist是镜像服务器的地址列表，里面有很多的服务器地址。这里有一个变量$arch，cpu体系，还有一个变量：$basearch，cpu的基本体系组

baseurl和mirrorlist都是指向yum源的地址，不同点是包含地址的多少。你若自己写的话，我们一般只写一个地址，直接用baseurl就行

- gpgcheck=0    ---->要不要验证呢，取消验证。1，使用公钥检验rpm的正确性。

- gpgcheck若是1将对下载的rpm将进行gpg的校验，校验密钥就是gpgkey，一般自己的yum源是不需要检测的。gpgcheck=0，那么gpgkey就可以不填写

### /etc/yum.conf 文件

```
[main]
cachedir=/var/cache/yum/$basearch/$releasever
keepcache=0
debuglevel=2
logfile=/var/log/yum.log
exactarch=1
obsoletes=1
gpgcheck=1
plugins=1
installonly_limit=5
bugtracker_url=http://bugs.centos.org/set_project.php?project_id=23&ref=http://bugs.centos.org/bug_report_page.php?category=yum
distroverpkg=centos-release


#  This is the default, if you make this bigger yum won't see if the metadata
# is newer on the remote and so you'll "gain" the bandwidth of not having to
# download the new metadata and "pay" for it by yum not having correct
# information.
#  It is esp. important, to have correct metadata, for distributions like
# Fedora which don't keep old packages around. If you don't like this checking
# interupting your command line usage, it's much better to have something
# manually check the metadata once an hour (yum-updatesd will do this).
# metadata_expire=90m

# PUT YOUR REPOS HERE OR IN separate files named file.repo
# in /etc/yum.repos.d
~
```

- cachedir=/var/cache/yum         #yum下载的RPM包的缓存目录

- keepcache=0                        #缓存是否保存，1保存，0不保存。

- debuglevel=2                       #调试级别(0-10)，默认为2

- logfile=/var/log/yum.log       #yum的日志文件所在的位置

## 常用命令介绍

### yum清空缓存列表

yum clean packages 清除缓存目录下的软件包，清空的是(/var/cache/yum)下的缓存
yum clean headers 清除缓存目录下的 headers
yum clean oldheaders 清除缓存目录下旧的 headers
yum clean, yum clean all (= yum clean packages; yum clean oldheaders) 清除缓存目录下的软件包及旧的headers

###  yum显示信息

yum list          # yum list显示所有已经安装和可以安装的程序包

这些列表里面的包的来源就是/etc/yum.repo.d。 base  docker-ce-stable  epel/x86_64/metalink   epel  extras   rpmforge  updates    

yum list rpm 显示安装包信息rpm

显示installed ，这里是包名，版本和仓库名

yum list httpd

这里是可获得包，说明还没有安装。

yum info rpm 显示安装包rpm的详细信息

### yum安装

yum -y install httpd

如果你不加-y他会问你要不要安装。如果你想自己来控制有些包是否安装，这里不要加-y，如果你想自动安装，不进行交互，这里加入-y。这个就是yum 的安装了，非常简单。

安装完之后查询一下

yum list httpd，Installed 说明已经安装好了

### yum删除

yum remove httpd 删除程序包httpd ，也就是卸载。

### yum查看依赖

yum deplist rpm 查看程序rpm依赖情况

### yum包的升级

yum check-update 检查可更新的程序
yum update 全部更新，升级所有包，以及升级软件和系统内核，这就是一键升级。他可以更新CentOS的内核到最新版本。
yum update package1 更新指定程序包package1，   
yum upgrade package1 升级指定程序包package1

## yum 解决依赖的原理

YUM 解决依赖关系问题，自动下载软件包。yum是基于C/S架构。C指的是客户端， S指的是服务器，想ftp，http,file、关于yum为什么能解决依赖关系：所有的Yum 源里面都有repodata，它里面是有XML格式文件，里面有说明需要什么包。例如上堂课实验的：mysql-server  rpm 需要：perl-DBI ，python，或者是php等等包。

## yum 组的管理

yum进行安装的时候可以一组一组的进行安装，先来看看有那些组yumgrouplist。可用的组有这么多。

Available Environment Groups:首先是可用的环境分组。

  Compute Node  计算节点

  Infrastructure Server 基础设施服务器

  File and Print Server  文件和打印服务

  Cinnamon Desktop   Cinnamon桌面

Installed Groups:已安装的组，开发工具

  Development Tools

Available Groups:可用的组。

如果我们想以组的方式来安装，加入我想安装安全工具：

输入：yumgroupinstall "Security Tools"

看到这里询问是否要安装，当然是N不安装了。如果想直接安装，不询问的话，这里也在后面加上选项 –y。
    yum groupremove group1 删除程序组group1

## 常用命令速查

### 1 安装

yum install 全部安装
yum install package1 安装指定的安装包package1
yum groupinsall group1 安装程序组group1

### 2 更新和升级

yum update 全部更新
yum update package1 更新指定程序包package1
yum check-update 检查可更新的程序
yum upgrade package1 升级指定程序包package1
yum groupupdate group1 升级程序组group1

### 3 查找和显示

yum info package1 显示安装包信息package1
yum list 显示所有已经安装和可以安装的程序包
yum list package1 显示指定程序包安装情况package1
yum groupinfo group1 显示程序组group1信息yum search string 根据关键字string查找安装包

yum install isntlled 显示已经安装了的

### 4 删除程序

yum remove &#124; erase package1 删除程序包package1
yum groupremove group1 删除程序组group1
yum deplist package1 查看程序package1依赖情况

### 5 清除缓存

yum clean packages 清除缓存目录下的软件包
yum clean headers 清除缓存目录下的 headers
yum clean oldheaders 清除缓存目录下旧的 headers
yum clean, yum clean all (= yum clean packages; yum clean oldheaders) 清除缓存目录下的软件包及旧的header