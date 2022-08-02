# centos安装openvpn

[原文](https://blog.csdn.net/edgar_t/article/details/118384159?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165907790216781683996866%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=165907790216781683996866&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-118384159-null-null.142^v35^down_rank&utm_term=%E5%AE%B9%E5%99%A8%E5%8C%96%E9%83%A8%E7%BD%B2vpn%E6%9C%8D%E5%8A%A1%E5%99%A8&spm=1018.2226.3001.4187)

参考链接：                                            

> 参考：
>  [linux中用iptables开启指定端口](https://www.cnblogs.com/xiujin/p/11494471.html)
>  [openvpn 为指定客户端配置规则和访问策略](http://www.suoniao.com/article/32292)
>  [dockerhub 镜像地址](https://hub.docker.com/r/kylemanna/openvpn)
>  [linux基于docker安装openvpn服务端及客户端](https://my.oschina.net/yyqz/blog/4518374)
>  [cert.pem和key.pem文件生成](https://www.jianshu.com/p/1de38a3f50f3)

## **1、openvpn容器部署及配置** 

1. 设置环境变量（docker volume 名称，example 可以替换为自己的设定的）

```shell
OVPN_DATA="ovpn-data-example"
```

1. 初始化$OVPN_DATA将保存配置文件和证书的容器。容器将提示输入密码来保护新生成的证书颁发机构使用的私钥

```shell
#新建容器卷
docker volume create --name $OVPN_DATA
#生成配置文件信息，服务器地址VPN.SERVERNAME.COM替换为自己的公网IP或者域名
docker run -v $OVPN_DATA:/etc/openvpn --rm kylemanna/openvpn ovpn_genconfig -u udp://VPN.SERVERNAME.COM
#初始化生成密钥，
docker run -v $OVPN_DATA:/etc/openvpn --rm -it kylemanna/openvpn ovpn_initpki
```

启动过程中需要输入域名和证书密码：例如此处输入：vpn123pwd

```shell
init-pki complete; you may now create a CA or requests.
Your newly created PKI dir is: /etc/openvpn/pki


Using SSL: openssl OpenSSL 1.1.1d  10 Sep 2019

Enter New CA Key Passphrase:  #此处输入密码 
Re-Enter New CA Key Passphrase:  #此处确认密码
Generating RSA private key, 2048 bit long modulus (2 primes)
.................+++++
.......................................+++++
e is 65537 (0x010001)
Can not load /etc/openvpn/pki/.rnd into RNG
140360007494984:error:2406F079:random number generator:RAND_load_file:Cannot open file:crypto/rand/randfile.c:98:Filename=/etc/openvpn/pki/.rnd
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
----
######此处输入公网地址或者域名 ####
Common Name (eg: your user, host, or server name) [Easy-RSA CA]:VPN.SERVERNAME.COM

CA creation complete and you may now import and sign cert requests.
Your new CA certificate file for publishing is at:
/etc/openvpn/pki/ca.crt


Using SSL: openssl OpenSSL 1.1.1d  10 Sep 2019
Generating DH parameters, 2048 bit long safe prime, generator 2
This is going to take a long time
.................+.........................................................................++*++*++*++*

DH parameters of size 2048 created at /etc/openvpn/pki/dh.pem


Using SSL: openssl OpenSSL 1.1.1d  10 Sep 2019
Generating a RSA private key
...............+++++
...............................................................................+++++
writing new private key to '/etc/openvpn/pki/private/openvpn.gongstring.com.key.XXXXcMLjEc'
-----
Using configuration from /etc/openvpn/pki/safessl-easyrsa.cnf
Enter pass phrase for /etc/openvpn/pki/private/ca.key:
Check that the request matches the signature
Signature ok
The Subject is Distinguished Name is as follows
commonName 			 :ASN.1 12:'openvpn.gongstring.com'
Certificate is to be certified until Aug  5 07:14:33 2023 GMT (1080 days)

Write out database with 1 new entries
Data Base Updated

Using SSL: openssl OpenSSL 1.1.1d  10 Sep 2019
Using configuration from /etc/openvpn/pki/safessl-easyrsa.cnf
## 此处输入密码
Enter pass phrase for /etc/openvpn/pki/private/ca.key:

An updated CRL has been created.
CRL file: /etc/openvpn/pki/crl.pem
```

1. 启动 OpenVPN 服务器进程

```shell
 docker run -v $OVPN_DATA:/etc/openvpn -d -p 1194:1194/udp --cap-add=NET_ADMIN kylemanna/openvpn
```

1. 生成客户端证书（可多次生成）
    中间会需要添加上面的密码：vpn123pwd

```shell
# CLIENTNAME为客户端名，可以替换成自己的用户名
# 
docker run -v $OVPN_DATA:/etc/openvpn --rm -it kylemanna/openvpn easyrsa build-client-full CLIENTNAME nopass
```

1. 导出证书给客户端使用

```shell
docker run -v $OVPN_DATA:/etc/openvpn --rm kylemanna/openvpn ovpn_getclient CLIENTNAME > CLIENTNAME.ovpn
```

1. 防火墙开放端口

> 防火墙开放允许1194/udp 访问

1. 客户端使用，windows
    下载openvpn客户端:

> 链接：https://pan.baidu.com/s/1oUKLTWeektDbfhivQ94xGw
>  提取码：715u
>  安装完成后导入配置CLIENTNAME.ovpn，即可连接

## **2、openvpn 访问权限设置** 

1. 查看openvpn配置文件

```shell
# 宿主机默认位置（未修改docker根目录）
# 根据命令：find / -name openvpn.conf，找到这个目录
 cd /var/lib/docker/volumes/ovpn-data-jnby/_data/
 ls -l ./
总用量 24
drwxr-xr-x 2 root root   19 7月   1 11:55 ccd   #目录下配置文件中定义，拨入到vpn的用户设置固定的地址
-rw-r--r-- 1 root root  658 7月   1 10:02 crl.pem   
-rwxr-xr-x 1 root root  960 4月  21 2020 down.sh   #停止脚本
-rw-r--r-- 1 root root 1141 7月   1 12:19 iptables  
-rw-r--r-- 1 root root  644 7月   1 10:00 openvpn.conf  #server配置文件
-rw-r--r-- 1 root root  808 7月   1 10:00 ovpn_env.sh   #环境变量脚本
drwx------ 8 root root  329 7月   1 10:52 pki     #公钥证书文件目录
-rwxr-xr-x 1 root root 2612 4月  21 2020 up.sh   #启动脚本
#查看server配置目录
cat openvpn.conf 
#客户端dhcp地址池
server 192.168.255.0 255.255.255.0
verb 3
key /etc/openvpn/pki/private/VPN.SERVERNAME.COM.key
ca /etc/openvpn/pki/ca.crt
cert /etc/openvpn/pki/issued/VPN.SERVERNAME.COM.crt
dh /etc/openvpn/pki/dh.pem
tls-auth /etc/openvpn/pki/ta.key
key-direction 0
keepalive 10 60
persist-key
persist-tun

proto udp
# Rely on Docker to do port mapping, internally always 1194
port 1194
dev tun0
status /tmp/openvpn-status.log

user nobody
group nogroup
comp-lzo no

### Route Configurations Below
route 192.168.254.0 255.255.255.0

### Push Configurations Below
push "block-outside-dns"
push "dhcp-option DNS 8.8.8.8"
push "dhcp-option DNS 8.8.4.4"
push "comp-lzo no"
```

1. 添加用户拨入固定IP分配设置

```shell
# 切换到 ccd目录
# CLIENTNAME  为1.4中设置的用户名
vim CLIENTNAME
#添加如下内容，CLIENTNAME固定IP为192.168.254.5，192.168.254.6
# 这里的192.168.254.5是windows系统的固定ip
# dhcp分配的ip是192.168.255.x，可以和客户端联通的
ifconfig-push 192.168.254.5 192.168.254.6
特别注意： ifconfig-push中的每一对IP地址表示虚拟客户端和服务器的IP端点。它们必须从连续的/30子网网段中获取(这里是/30表示xxx.xxx.xxx.xxx/30，即子网掩码位数为30)，以便于与Windows客户端和TAP-Windows驱动兼容。明确地说，每个端点的IP地址对的最后8位字节必须取自下面的集合。 [ 1, 2] [ 5, 6] [ 9, 10] [ 13, 14] [ 17, 18] [ 21, 22] [ 25, 26] [ 29, 30] [ 33, 34] [ 37, 38] [ 41, 42] [ 45, 46] [ 49, 50] [ 53, 54] [ 57, 58] [ 61, 62] [ 65, 66] [ 69, 70] [ 73, 74] [ 77, 78] [ 81, 82] [ 85, 86] [ 89, 90] [ 93, 94] [ 97, 98] [101,102] [105,106] [109,110] [113,114] [117,118] [121,122] [125,126] [129,130] [133,134] [137,138] [141,142] [145,146] [149,150] [153,154] [157,158] [161,162] [165,166] [169,170] [173,174] [177,178] [181,182] [185,186] [189,190] [193,194] [197,198] [201,202] [205,206] [209,210] [213,214] [217,218] [221,222] [225,226] [229,230] [233,234] [237,238] [241,242] [245,246] [249,250] [253,254]
```

1. 客户端验证ip地址分配

```
#windows 查看连接状态
Notified TAP-Windows driver to set a DHCP IP/netmask of 192.168.254.5/255.255.255.252 on interface
 {xxxxxx} [DHCP-serv: 192.168.254.6, lease-time: 31536000]
```

1. 添加访问策略与权限

```shell
#默认内网开放，可以使用交换机器acl设置策略，也可以使用iptables 在容器内设置规则
#1、进入容器交互
docker exec -it containername bash
#2、查看IPtables 规则
bash-5.0# iptables -L -n -v
Chain INPUT (policy ACCEPT 49449 packets, 26M bytes)
 pkts bytes target     prot opt in     out     source               destination         

Chain FORWARD (policy ACCEPT 112K packets, 70M bytes)
 pkts bytes target     prot opt in     out     source               destination         

Chain OUTPUT (policy ACCEPT 67051 packets, 50M bytes)
 pkts bytes target     prot opt in     out     source               destination    
 
#3、添加iptables规则
#允许IP访问权限
bash-5.0# iptables -I FORWARD -i tun0 -s 192.168.254.5 -d 10.2.2.3 -j ACCEPT
bash-5.0# iptables -I FORWARD -i tun0 -s 192.168.254.6 -d 10.2.2.3 -j ACCEPT
#允许端口访问权限
bash-5.0# iptables -I FORWARD -i tun0 -s 192.168.254.5 -d 10.2.2.14 -ptcp --dport 7180 -j ACCEPT
#拒绝网段内其他地址访问权限
bash-5.0# iptables -A FORWARD -i tun0 -s 192.168.254.5 -d 10.2.2.0/24 -j DROP
bash-5.0# iptables -A FORWARD -i tun0 -s 192.168.254.6 -d 10.2.2.0/24 -j DROP
# 4、在客户端连接测试访问权限
略略略
# 5、保存iptables 配置
bash-5.0#iptables-save > /etc/openvpn/iptables
# 6、导入iptables 配置(备用)
bash-5.0# iptables-restore < /etc/openvpn/iptables
#查看iptables 配置文件
bash-5.0#iptables-save 
# Generated by iptables-save v1.8.4 on Thu Jul  1 07:05:07 2021
*filter
:INPUT ACCEPT [1026:245528]
:FORWARD ACCEPT [1474:763507]
:OUTPUT ACCEPT [787:636748]
-A FORWARD -s 192.168.254.5/32 -d 10.2.2.14/32 -i tun0 -p tcp -m tcp --dport 7180 -j ACCEPT
-A FORWARD -s 192.168.254.6/32 -d 10.2.2.3/32 -i tun0 -j ACCEPT
-A FORWARD -s 192.168.254.5/32 -d 10.2.2.3/32 -i tun0 -j ACCEPT
-A FORWARD -s 192.168.254.5/32 -d 10.2.2.0/24 -i tun0 -j DROP
-A FORWARD -s 192.168.254.6/32 -d 10.2.2.0/24 -i tun0 -j DROP
COMMIT
# Completed on Thu Jul  1 07:05:07 2021
# Generated by iptables-save v1.8.4 on Thu Jul  1 07:05:07 2021
*nat
:PREROUTING ACCEPT [1247:80359]
:INPUT ACCEPT [2:140]
:OUTPUT ACCEPT [0:0]
:POSTROUTING ACCEPT [0:0]
-A POSTROUTING -s 192.168.255.0/24 -o eth0 -j MASQUERADE
-A POSTROUTING -s 192.168.254.0/24 -o eth0 -j MASQUERADE
COMMIT
# Completed on Thu Jul  1 07:05:07 2021
```

## 使用方法

1. 打开openvpn客户端
2. 右击右下角的托盘图标
3. 选择导入文件
4. 将生成的xx.vpn导入进去即可

## 系统重启后

系统重启后，这里的openvpn是没有自启动的，所以需要手动启动

```
OVPN_DATA="ovpn-data-example"
docker run -v $OVPN_DATA:/etc/openvpn -d -p 1194:1194/udp --cap-add=NET_ADMIN kylemanna/openvpn
```

## 生成客户的方法

```bash
# 进入容器
docker exec -it bash
# 执行
# 创建客户
easyrsa build-client-full CLIENTNAME nopass
# 导出连接的配置文件
ovpn_getclient CLIENTNAME > CLIENTNAME.ovpn
```

## 容器重启方法

```bash
# 查看容器id
docker ps 
docker restart 容器id
```

## 配置分流

[参考链接](https://blog.csdn.net/zzchances/article/details/124801161)

**我们因为某些原因需要特定的流量不进VPN隧道或者进VPN隧道转发，我们就可以通过定义路由实现。**

路由控制需要由三个参数进行定义：

1、route-nopull

如果在客户端配置文件中配route-nopull，openvpn连接后将不会在电脑上添加任何路由，所有流量都将本地转发。

2、vpn_gateway

如果在客户端配置文件中配vpn_getaway，默认访问网络不走vpn隧道，如果可以通过添加该参数，下发路由，访问目的网络匹配到会自动进入VPN隧道。

```
route 10.0.0.0 255.255.255.0  vpn_gateway
route 172.16.0.0 255.255.255.0  vpn_gateway
```

3、net_gateway

这个参数和 vpn_gateway 相反,表示在默认出去的访问全部走 openvpn 时,强行指定部分IP地址段访问不通过 Openvpn 出去。
**max-routes** 参数表示可以添加路由的条数,默认只允许添加100条路由,如果少于100条路由可不加这个参数。

```
max-routes 1000
route 10.100.0.0 255.255.255.0 net_gateway
```

4、删除redirect-gateway def1

把下面三行，放进去。

**配置如下：**

```

client
nobind
dev tun
remote-cert-tls server

remote 1.117.60.61 1194 udp


route-nopull
route 192.168.255.0 255.255.255.0  vpn_gateway
route 192.168.254.0 255.255.255.0  vpn_gateway
```

<span style="background-color:yellow">修改完配置文件后，然后再导进去</span>
