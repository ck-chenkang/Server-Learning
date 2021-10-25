# centos网卡配置详解

#### 1.网卡文件位置

centos网卡配置文件一般位于：/etc/sysconfig/network-scripts/

文件名一般为：ifcfg-eno或者ifcfg-eth0类似的文件，可以先用ip addr（centos7） 命令或者是ifconfig命令查看网卡信息

如果是新机器没有配置文件一般也会有ifcfg-lo回环网卡，可以复制一份使用vim编辑（root权限）

#### 一般来说需要自己修改的项

```
BOOTPROTO=static        #static静态、dhcp动态获取、none不指定（可能出现问题）

ONBOOT=yes              #特别注意 这个是开机启动,需要设置成yes

DNS1=8.8.8.8            #DNS域名解析服务器的IP地址

IPADDR=192.168.1.2      #网卡的IP地址

GATEWAY=192.168.1.1     #网关地址

NETMASK=255.255.255.0   #子网掩码
```

可直接复制不带注释版本

```
BOOTPROTO=dhcp
ONBOOT=yes             
DNS1=114.114.114.114           
IPADDR=192.168.1.2      
GATEWAY=192.168.1.1     
NETMASK=255.255.255.0   
```

#### 配置文件解析：

```
DEVICE=ens33                         # 网卡的设备名称
NAME=ens33                           # 网卡设备的别名
TYPE=Ethernet                        #网络类型：Ethernet以太网
BOOTPROTO=none                       #引导协议：static静态、dhcp动态获取、none不指定（可能出现问题
DEFROUTE=yes                         #启动默认路由
IPV4_FAILURE_FATAL=no                #不启用IPV4错误检测功能
IPV6INIT=yes                         #启用IPV6协议
IPV6_AUTOCONF=yes                    #自动配置IPV6地址
IPV6_DEFROUTE=yes                    #启用IPV6默认路由
IPV6_FAILURE_FATAL=no                #不启用IPV6错误检测功能
UUID=sjdfga-asfd-asdf-asdf-f82b      #网卡设备的UUID唯一标识号
ONBOOT=yes                           #开机自动启动网卡
DNS=114.114.114.114                  #DNS域名解析服务器的IP地址 可以多设置一个DNS1
IPADDR=192.168.1.22                  #网卡的IP地址
PREFIX=24                            #子网前缀长度
GATEWAY=192.168.1.1                  #默认网关IP地址
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPADDR=192.168.1.22                  #你想要设置的固定IP，理论上192.168.2.2-255之间都可以，请自行验证；如果是dhcp可以不填写
NETMASK=255.255.255.0                #子网掩码，不需要修改；
```

附上我的虚拟机的配置方便大家复制：

```
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.1.22
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS=114.114.114.114
```

uuid我删掉了每个人的不一样