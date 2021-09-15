# 开启SSH服务

参考链接：

[centos7开启SSH服务](https://blog.csdn.net/qq_36663951/article/details/79813038)

1. 查看是否已经安装了ssh服务`yum list installed | grep openssh-server`

![image-20210915210548689](Imag/image-20210915210548689.png)

这里显示已经安装了

如果没有安装，输入yum install openssh-server安装

2. `cd /etc/ssh`

3. vi ./sshd_config

4. 将端口、监听地址前面的#去掉

   ![image-20210915211154515](Imag/image-20210915211154515.png)

   5.允许root登录

   ![image-20210915211415860](Imag/image-20210915211415860.png)

6.允许用户名密码来作为连接验证

![image-20210915211513476](Imag/image-20210915211513476.png)

7. `sudo service ssh start`重启服务

![image-20210915211623253](Imag/image-20210915211623253.png)

8. `ps -e | grep sshd`查看sshd服务是否开启

   ![image-20210915211839148](Imag/image-20210915211839148.png)

9. 或者`netstat -an | grep 22` 查看22端口是否开启监听

![image-20210915212006042](Imag/image-20210915212006042.png)