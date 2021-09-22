# Centos中ifcfg-ens33文件参数解释

ifcfg-ens33是centos中的网卡配置文件

```
DEVICE     接口名（设备,网卡）
USERCTL    [yes|no]（非root用户是否可以控制该设备）
BOOTPROTO  IP的配置方法[none|static|bootp|dhcp]（引导时不使用协议|静态分配IP|BOOTP协议|DHCP协议）
HWADDR     MAC地址   
ONBOOT     系统启动的时候网络接口是否有效（yes/no）   
TYPE       网络类型（通常是Ethemet）   
NETMASK    网络掩码   
IPADDR     IP地址   
IPV6INIT   IPV6是否有效（yes/no）   
GATEWAY    默认网关IP地址
BROADCAST  广播地址
NETWORK    网络地址
 
 
#########start设置静态地址例子#########
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
#BOOTPROTO="dhcp"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="ac9b66bf-74fb-4bda-b89f-c66ff84c9571"
DEVICE="ens33"
#ONBOOT="yes"
 
#static assignment
NM_CONTROLLED=no #表示该接口将通过该配置文件进行设置，而不是通过网络管理器进行管理
ONBOOT=yes #开机启动
BOOTPROTO=static #静态IP 这个可以不要
IPADDR=192.168.59.134 #本机地址
NETMASK=255.255.255.0 #子网掩码
GATEWAY=192.168.59.2 #默认网关
DNS1=8.8.8.8
DNS2=8.8.4.4
 
#########end设置静态地址例子#########
```

