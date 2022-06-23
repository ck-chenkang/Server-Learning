# centos安装mysql 5.7

CentOS和MySQL

- CentOS Linux release 7.8.2003 (Core)
- MySQL 5.7

#### 1.安装MySQL源

```shell
cd ~
mkdir download && cd download
# 下载
bash > wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
# 安装 MySQL 源
bash > yum localinstall mysql57-community-release-el7-11.noarch.rpm
```

#### 2.检查源是否安装成功

```shell
bash > yum repolist enabled | grep "mysql.*-community.*"
```

#### 页面输出信息表示源安装成功

```shell
mysql-connectors-community/x86_64 MySQL Connectors Community                 165
mysql-tools-community/x86_64      MySQL Tools Community                      115
mysql57-community/x86_64          MySQL 5.7 Community Server                 444
```

#### 3.使用yum install 命令安装MySQL

```shell
bash > yum install -y mysql-community-server
```

<font color='red'>如果报下面的错误：mysql-community-libs-compat-5.7.37-1.el7.x86_64.rpm 的公钥尚未安装失败的软件包是：mysql-community-libs-compat-5.7.37-1.el7.x86_64
 GPG  密钥配置为：file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql</font>

解决办法：

```
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
```

再次安装

#### 4.启动MySQL服务

在`CentOs7` 下 启动/关闭/重启服务的命令是 `systemctl start|stop|restart`

```shell
bash > systemctl start mysqld
```

用`systemctl status` 命令查看服务运行状态

```shell
bash > systemctl status mysqld
```

```html
● mysqld.service - MySQL Server
Loaded: loaded (/usr/lib/systemd/system/mysqld.service; enabled; vendor preset: disabled)
Active: active (running) since 二 2020-07-28 21:09:44 CST; 57s ago
Docs: man:mysqld(8)
http://dev.mysql.com/doc/refman/en/using-systemd.html
Process: 25677 ExecStart=/usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid $MYSQLD_OPTS (code=exited, status=0/SUCCESS)
Process: 25628 ExecStartPre=/usr/bin/mysqld_pre_systemd (code=exited, status=0/SUCCESS)
Main PID: 25681 (mysqld)
CGroup: /system.slice/mysqld.service
└─25681 /usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid

7月 28 21:09:38 iZm5ebq5g3dxxmygidjc5cZ systemd[1]: Starting MySQL Server...
7月 28 21:09:44 iZm5ebq5g3dxxmygidjc5cZ systemd[1]: Started MySQL Server.
```

这里可看到`MySQL` 运行的状态 `active (running)`

#### 5.设置开机启动MySQL 服务

```shell
bash > systemctl enable mysqld
# 重载所有修改过的配置文件
bash > systemctl daemon-reload
```

重启`ContOs` 服务器测试.（没有问题）

#### 6.查看MySQL默认密码

`MySQL` 安装完成之后，生成的默认密码在 `/var/log/mysqld.log` 文件中。使用 grep 命令找到日志中的密码。

```shell
bash > grep 'temporary password' /var/log/mysqld.log
```

![img](https:////upload-images.jianshu.io/upload_images/14239962-8f8761dd94c05844.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

查看初始密码

#### 7.首次通过初始密码登录后，使用以下命令修改密码

```shell
bash > mysql -u root -p
#输入密码 
#执行修改密码语句.
bash > ALTER USER 'root'@'localhost' IDENTIFIED BY '这里是新密码';
```

#### 8.允许root用户远程连接Mysql

```shell
grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
flush privileges;
```

 <font color='blue'>允许admin用户远程登录方法如下（需要先创建admin用户）：</font>

```
grant all on *.* to admin@'%' identified by '123456' with grant option;
flush privileges;
允许任何ip地址(%表示允许任何ip地址)的电脑用admin帐户和密码(123456)来访问这个mysql server。
注意admin账户不一定要存在。
```

#### 9.设置默认编码为 utf8

`MySQL` 安装后默认不支持中文，需要修改编码。

现在查看编码:

```shell
mysql> show variables like 'character%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | latin1                     |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | latin1                     |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
8 rows in set (0.00 sec)
```

修改 `/etc/my.cnf` 配置文件，在相关节点（没有则自行添加）下添加编码配置，如下：

```shell
[mysqld]
character-set-server=utf8
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```

服务器上配置后这样：

```
character-set-server=utf8
#
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```

<font style="background-color: yellow">保存之后使用`systemctl restart mysqld` 重启mysql服务器，并重新登录</font>。

```shell
mysql> show variables like 'character%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | utf8                       |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | utf8                       |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
8 rows in set (0.00 sec)
```

## **默认配置文件路径：** 

配置文件：/etc/my.cnf
 日志文件：/var/log/mysqld.log
 服务启动脚本：/usr/lib/systemd/system/mysqld.service
 socket文件：/var/run/mysqld/mysqld.pid

