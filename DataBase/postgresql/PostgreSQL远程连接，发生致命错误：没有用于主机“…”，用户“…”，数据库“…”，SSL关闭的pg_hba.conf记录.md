# [PostgreSQL远程连接，发生致命错误：没有用于主机“…”，用户“…”，数据库“…”，SSL关闭的pg_hba.conf记录](https://www.cnblogs.com/88223100/p/postgresql_connect_error.html)

[原文](https://www.cnblogs.com/88223100/p/postgresql_connect_error.html)

有时候在远程连接时，会报Error connecting to the server：致命错误：没有用于主机“…”，用户“…”，数据库“…”，SSL关闭的pg_hba.conf记录：

![img](E:\codes\Server-Learning\DataBase\postgresql\Imag\27422-20210930143052103-845412940.png)

 

 

这是在远程连接时pg_hba.conf文件没有配置正确。

 pg_hba.conf文件在Postgre安装文件目录下的data文件夹中。

 正确安装文件后应该是下图所示：

![img](E:\codes\Server-Learning\DataBase\postgresql\Imag\27422-20210930143114783-596485562.png)

 

 ![img](E:\codes\Server-Learning\DataBase\postgresql\Imag\27422-20210930143123818-6920513.png)

 

在文件末尾添上：

\# TYPE DATABASE USER CIDR-ADDRESS METHOD
host all all 0.0.0.0/0 md5
此时文件最后应该是：

![img](E:\codes\Server-Learning\DataBase\postgresql\Imag\27422-20210930143157591-11944213.png)

 

 


重启服务i，重新连接，问题解决。