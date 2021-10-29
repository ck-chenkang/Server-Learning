## 1、查看

```
[root@dev-server ~]# getenforce
Disabled
[root@dev-server ~]# /usr/sbin/sestatus -v
SELinux status:                 disabled
```

## 2、临时关闭

```
##设置SELinux 成为permissive模式
##setenforce 1 设置SELinux 成为enforcing模式
setenforce 0
```

## 3、永久关闭

```
vi /etc/selinux/config
```

将SELINUX=enforcing改为SELINUX=disabled
设置后需要重启才能生效