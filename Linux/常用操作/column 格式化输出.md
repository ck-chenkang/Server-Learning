# column命令

最常用： |column -t

比如 ：

```
[root@hdss7-12 etc]# ip route show
default via 10.4.7.254 dev ens33 proto static metric 100
10.4.7.0/24 dev ens33 proto kernel scope link src 10.4.7.12 metric 100
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1
[root@hdss7-12 etc]# ip route show |column -t
default        via  10.4.7.254  dev    ens33   proto  static  metric  100
10.4.7.0/24    dev  ens33       proto  kernel  scope  link    src     10.4.7.12   metric  100
172.17.0.0/16  dev  docker0     proto  kernel  scope  link    src     172.17.0.1
```

### 功能介绍：

格式化输出

### 使用放法：

```csharp
NAME
     column - columnate lists
SYNOPSIS
     column [-tx] [-c columns] [-s sep] [file ...]
DESCRIPTION
     The column utility formats its input into multiple columns.  Rows are filled before columns.  Input is taken from file operands, or, by default, from the standard
     input.  Empty lines are ignored.
     The options are as follows:
     -c      Output is formatted for a display columns wide.
     -s      Specify a set of characters to be used to delimit columns for the -t option.
     -t      Determine the number of columns the input contains and create a table.  Columns are delimited with whitespace, by default, or with the characters supplied
             using the -s option.  Useful for pretty-printing displays.
     -x      Fill columns before filling rows.
     Column exits 0 on success, >0 if an error occurred.
```

实例

```rust
[root@uyhd000225 ~]# mount
/dev/hda1 on / type ext3 (rw)
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw,gid=5,mode=620)
tmpfs on /dev/shm type tmpfs (rw)
/dev/xvdb1 on /data type ext3 (rw)
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw)
[root@uyhd000225 ~]# mount |column -t
/dev/hda1   on  /                         type  ext3         (rw)
proc        on  /proc                     type  proc         (rw)
sysfs       on  /sys                      type  sysfs        (rw)
devpts      on  /dev/pts                  type  devpts       (rw,gid=5,mode=620)
tmpfs       on  /dev/shm                  type  tmpfs        (rw)
/dev/xvdb1  on  /data                     type  ext3         (rw)
none        on  /proc/sys/fs/binfmt_misc  type  binfmt_misc  (rw)
```

### 解释-s选项：

我以为-s选项是输出分隔符，比如上面，我是用如下命令：

```rust
[root@uyhd000225 ms]# mount |column -s '@' -t
/dev/hda1 on / type ext3 (rw)
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw,gid=5,mode=620)
tmpfs on /dev/shm type tmpfs (rw)
/dev/xvdb1 on /data type ext3 (rw)
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw)
[root@uyhd000225 ms]#
```

我以为他会输出以@为分隔符，但是没有安装我的期望输出

man column没有详细说明使用方法，info column也没有：

google发现他是输出分隔符，使用方法如下



```ruby
[root@uyhd000225 testDir]# cat testcolumn
Jackie | 18 | male
Helen | 20 | female
Daniel Liu | 23 | male
[root@uyhd000225 testDir]# cat testcolumn | column -s '|' -t
Jackie        18    male
Helen         20    female
Daniel Liu    23    male
```



作者：西华子
链接：https://www.jianshu.com/p/3a35c66843f3
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。