# centos7.4 fdisk磁盘分区 格式化 挂载

#### 1.查看系统中有多少可以识别的硬盘、U盘

```
[root@localhost ~]# fdisk -l
```


![这里写图片描述](Imag/20171110133834811)

#### 2.使用fdisk命令进行分区

```
[root@localhost ~]# fdisk /dev/sdb
```

![这里写图片描述](Imag/20171110134424842)

![这里写图片描述](Imag/20171110134728052)

![这里写图片描述](Imag/20171110135050865)

![这里写图片描述](Imag/20171110135400027)



![这里写图片描述](Imag/20171110135512471)

记得输入w保存退出！

#### 3.通知操作系统，分区表已经改变

```
[root@localhost ~]# partprobe
```



#### 4.格式化

```
[root@localhost ~]# mkfs -t ext4 /dev/sdb1
[root@localhost ~]# mkfs -t ext4 /dev/sdb5
```


注：-t ext4表示写入的是ext4文件系统。并且只能给主分区sdb1和扩展分区sdb5写入文件系统（不能给扩展分区sdb2写入文件系统）

#### 5.建立挂载点并挂载

```
[root@localhost ~]# mkdir /disk1       
[root@localhost ~]# mkdir /disk5
[root@localhost ~]# mount /dev/sdb1 /disk1
[root@localhost ~]# mount /dev/sdb5 /disk5
```

![这里写图片描述](Imag/20171110140714411)

查看挂载情况：

![这里写图片描述](Imag/20171110140923154)

注：这样的挂载只是临时生效，重启就没了，要想永久生效，请进行下一步

#### 6.修改/etc/fstab,使分区自动挂载

```
[root@localhost disk5]# vim /etc/fstab

#依据/etc/fstab的内容，自动挂载
[root@localhost disk5]# mount -a
```

![这里写图片描述](Imag/20171110141548442)
