# win7 安装 mosquitto

## 下载

[官网下载地址](https://mosquitto.org/download/)

下载好后，双击安装

## 启动 

### 打开windows服务管理器

`services.msc`

![image-20220616135449954](E:\codes\Server-Learning\MQTT服务器\Imag\image-20220616135449954.png)

### 启动mosquitto

![image-20220616135534674](E:\codes\Server-Learning\MQTT服务器\Imag\image-20220616135534674.png)

## 修改配置

```shell
# 不允许无密码访问
allow_anonymous false
# 设置账号密码本地存储文件，路径为绝对路径
password_file C:\Program Files\mosquitto\pwfile.example
# 允许远程访问
listener 1883
```

## 创建账号方法

cmd切换到mosquitto的安装目录下

```shell
# 创建admin 密码为 admin1的账号
# 加入-c 之前创建的账号会被删除，不加，会附加在后面
mosquitto_passwd -c -b ./pwfile.example admin admin1
```

## 其他

### 配置文件不生效

解决方法：重启windows

