# 发送http请求

[linux发送http请求](https://www.cnblogs.com/kaleidoscope/p/9719841.html)

## curl模拟get请求

```
curl "http://www.baidu.com"  如果这里的URL指向的是一个文件或者一幅图都可以直接下载到本地
curl -i "http://www.baidu.com"  显示全部信息
curl -I "http://www.baidu.com"  只显示头部信息
curl -v "http://www.baidu.com"   显示get请求全过程解析
```

## wget模拟get请求

```
wget  "http://www.baidu.com"
```

## curl命令模拟Get请求携带参数（linux）：

```
# 错误示范
curl -v http://127.0.0.1:80/xcloud/test?version=1&client_version=1.1.0&seq=1001&host=aaa.com
```

上述命令在linux系统，get请求携带的参数只到version=1，<span style="color:red">”&”符号在linux系统中为后台运行的操作符</span>，此处需要使用反斜杠”\”转义，即：

```
# 使用 \ 转义符
curl -v http://127.0.0.1:80/xcloud/test?version=1\&client_version=1.1.0\&seq=1001\&host=aaa.com
# 或者 加双引号
curl -v "http://127.0.0.1:80/xcloud/test?version=1&client_version=1.1.0&seq=1001&host=aaa.com"
```

## curl发送post

使用curl命令，通过-d参数，把访问参数放在里面，如果没有参数，则不需要-d

```
curl -d "username=user1&password=123" "www.test.com/login"
```

发送格式化json请求

```
curl -i -k  -H "Content-type: application/json" -X POST -d '{"version":"6.6.0", "from":"mu", "product_version":"1.1.1.0"}' https://10.10.10.10:80/test
```

## wget发送post

```
wget –post-data 'username=user1&password=123' http://www.baidu.com
```

## <span style="color:red">curl和wget区别</span>

curl模拟的访问请求一般直接在控制台显示，而wget则把结果保存为一个文件。如果结果内容比较少，需要直接看到结果可以考虑使用curl进行模拟请求，如果返回结果比较多，则可考虑wget进行模拟请求。