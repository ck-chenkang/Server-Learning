# linux命令cat EOF详解

[linux命令cat EOF详解](https://blog.csdn.net/robin90814/article/details/86705155)

一,关于cat << EOF语句的意思

在linux shell脚本中cat << EOF的语句，起到什么作用？

首先必须要说明的是EOF在这里没有特殊的含义，你可以使用FOE或OOO等（当然也不限制在三个字符或大写字符）。

接下来，简单描述一下几种常见的使用方式及其作用：

1、cat<<EOF，以EOF输入字符为标准输入结束：

2、cat>filename，**创建文件，并把标准输入输出到filename文件中**，以ctrl+d作为输入结束：

3、cat>filename<<EOF，以EOF作为输入结束，和ctrl+d的作用一样：

 ```
# 参考示例
cat > kubernetes.conf <<EOF
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
net.ipv4.ip_forward=1
net.ipv4.tcp_tw_recycle=0
vm.swappiness=0 # 禁止使用 swap 空间，只有当系统 OOM 时才允许使用它
vm.overcommit_memory=1 # 不检查物理内存是否够用
vm.panic_on_oom=0 # 开启 OOM  
fs.inotify.max_user_instances=8192
fs.inotify.max_user_watches=1048576
fs.file-max=52706963
fs.nr_open=52706963
net.ipv6.conf.all.disable_ipv6=1
net.netfilter.nf_conntrack_max=2310720
EOF
cp kubernetes.conf  /etc/sysctl.d/kubernetes.conf
sysctl -p /etc/sysctl.d/kubernetes.con
 ```



二，cat <<EOF与cat <<-EOF的区别

 

两个都是获取stdin,并在EOF处结束stdin，输出stdout。

但是<<-是什么意思呢？

先来看man中的说明：

If the redirection operator is <<-, then all leading tab characters are stripped from input lines and  the  line  containing  delimiter.   

翻译过来的意思就是：如果重定向的操作符是<<-，那么分界符（EOF）所在行的开头部分的制表符（Tab）都将被去除。

这可以解决由于脚本中的自然缩进产生的制表符。

通俗一点的解释：

在我们使用cat <<EOF时，我们输入完成后，需要在一个新的一行输入EOF结束stdin的输入。EOF必须顶行写，前面不能用制表符或者空格。

比如,下面的语句就不会出错：

 

cat >1.txt<<EOF  
Hello,world!  
EOF  
如果结束分解符EOF前有制表符或者空格，则EOF不会被当做结束分界符，只会继续被当做stdin来输入。

而<<-就是为了解决这一问题：

 

cat >1.txt<<-EOF  
Hello,world!  
      EOF  
上面的写法，虽然最后的EOF前面有多个制表符和空格，但仍然会被当做结束分界符，表示stdin的结束,这就是<<和<<-的区别。