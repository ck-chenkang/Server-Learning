# [Centos 挂载U盘](https://www.cnblogs.com/zzy-frisrtblog/p/5973464.html)

**开始**：

　　我拿到的是一个新盘，遇到的第一个问题是插上去后centos不能识别他，使用fdsik -l也没有这个U盘的任何信息，再windows上面查看他的格式也是fat32,没有问题，于是折腾了很久后我重新把他格式化，也同样格式化为fat32，这次就能识别了。

**命令**：fdisk -l (查看磁盘分区信息)

```
[root@phoenix Desktop]# fdisk -l

Disk /dev/sda: 32.2 GB, 32212254720 bytes
255 heads, 63 sectors/track, 3916 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x000f2962

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *           1          26      204800   83  Linux
Partition 1 does not end on cylinder boundary.
/dev/sda2              26         281     2048000   82  Linux swap / Solaris
Partition 2 does not end on cylinder boundary.
/dev/sda3             281        3917    29203456   83  Linux

Disk /dev/sdb: 31.1 GB, 31104958464 bytes
255 heads, 63 sectors/track, 3781 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00000000

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1               1        3782    30371840    c  W95 FAT32 (LBA)
```

通过上面通过上面信息我们可以看出USB设备是FAT32格式的，标识为/dev/sdb1

**命令**：mount -t vfat /dev/sdb1 /mnt/usb（挂载U盘,注意如果是ntfs格式的话可能需要安装ntfs-3g这个插件才能执行，挂载命令：mount -t ntfs-3g /dev/sdb /mnt/udisk）

成功后就可以进入 /mnt/usb查看到U盘相应的内容了

**命令**：umount /mnt/usb（卸载U盘）

执行umount命令卸载U盘时，报如下错误“device is busy”，可以用参数l解决问题。当然你也可以用fuser命令解决问题。如下所示

```
[root@wgods ~]# umount /mnt/usb
umount: /mnt/usb: device is busy
umount: /mnt/usb: device is busy

[root@wgods ~]# umount -f /mnt/usb
umount2: Device or resource busy
umount: /mnt/usb: device is busy
umount2: Device or resource busy
umount: /mnt/usb: device is busy


[root@wgods ~]# umount -l /mnt/usb（成功卸载）
```

