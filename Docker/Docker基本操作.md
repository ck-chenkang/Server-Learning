[TOC]

# Docker基本操作

参考链接：

[Docker超详细基础教程](https://blog.csdn.net/lqpf199681/article/details/110518692?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163175415316780366557218%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=163175415316780366557218&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~hot_rank-11-110518692.pc_search_result_hbase_insert&utm_term=docker&spm=1018.2226.3001.4187)

[Docker——从入门到实践](https://yeasy.gitbook.io/docker_practice/install/centos)

[Dokcer入门--很不错](https://blog.csdn.net/m0_46690280/article/details/108742843?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163178071316780265440704%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=163178071316780265440704&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-2-108742843.pc_search_result_hbase_insert&utm_term=docerfile&spm=1018.2226.3001.4187)

## 安装Dokcer

```shell
# 切换到root
# 1.下载关于Docker的依赖环境
yum -y install yum-utils device-mapper-persistent-data lvm2

# 2.设置下载Docker的镜像源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 3.将软件包信息提前在本地缓存一份，用来提高搜索安装软件的速度
yum makecache fast

# 4.安装Docker
yum -y install docker-ce

# 5.启动Docker，并设置为开机自动启动，测试
# 启动Docker服务
systemctl start docker
# 设置开机自动启动
systemctl enable docker
# 测试
docker run hello-world
```

出现这个则是安装成功

![image-20210916105128853](Imag/image-20210916105128853.png)

## Docker命令

```
# 启动Docker服务
systemctl start docker

# 停止Docker服务
systemctl stop docker

# 重启Docker服务
systemctl restart docker

# 查看Docker服务状态
systemctl status docker

# 开机启动Docker服务
systemctl enable docker

```

## 卸载

```
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

## 修改国内镜像源

[Docker设置国内镜像源](https://blog.csdn.net/whatday/article/details/86770609?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163175415316780366557218%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=163175415316780366557218&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~hot_rank-19-86770609.pc_search_result_hbase_insert&utm_term=docker&spm=1018.2226.3001.4187)

1. `cd /etc/docker`

2. `vim ./daemon.json`

3. ```
   {
       "registry-mirrors": ["http://hub-mirror.c.163.com"]
   }
   ```

4. `systemctl restart docker.service`

## 搭建公司内部的镜像仓库

怎么搭建，百度一下

```
# 需要在/etc/docker/daemon.json
{
	"registry-mirrors": ["https://registry.docker-cn.com"],
	"insecure-registries": ["ip:port]
}
# ip:port
公司私服的ip和port
# insecure-registries 这个后面是私有的仓库地址
# 重启两个服务
systemctl daemon-reload
systemctl restart docker                          

```

## 操作镜像

```
# 1. 拉取镜像到本地
docker pull 镜像名称[:tag]
# 举个例子 tomcat
docker pull daocloud.io/library/tomcat:8.5.15-jre8

# 2. 查看全部本地的镜像
docker images

说明：
REPOSITORY：镜像名称
TAG：镜像标签
IMAGE ID：镜像ID
CREATED：镜像的创建日期
SIZE：镜像大小

# 3. 删除本地镜像
docker rmi 镜像的标识  # 删除本地镜像
docker rmi `docker images -q` # 删除所有本地镜像

# 4. 镜像的导入导出(不规范)
# 将本地的镜像导出
docker save -o 导出的路径 镜像id
# 加载本地的镜像文件
docker load -i 镜像文件
# 修改镜像名称
docker tag 镜像id 新镜像名称:版本

# 5.从网络中查找需要的镜像
docker search 镜像名称

说明：
NAME：镜像名称
DESCRIPTION：镜像描述
STARS：用户评价，反应一个镜像的受欢迎程度
OFFICIAL：是否官方
AUTOMATED：自动构建，表示该镜像由Docker Hub自动构建流程创建的


```



## 操作容器

```
# 1. 运行容器
# 简单操作
docker run 镜像的标识|镜像名称[tag]

# 常用的参数
docker run -d -p  宿主机端口:容器端口 --name 容器名称 镜像的标识|镜像名称[tag]
# -d: 代表后台运行容器
# -p: 宿主机端口:容器端口: 为了映射当前Linux的端口和容器的端口
# --name 容器名称: 指定容器的名称

# 2. 查看正在运行的容器
docker ps [OPTIONS]
# OPTIONS说明:
# -a: 代表查看全部的容器，包括没有运行
# -q: 只查看容器的标识
# -f: 根据条件过滤显示的内容
# --format: 指定返回值的模板文件
# -l: 显示最近创建的容器
# -n: 列出最近创建的n个容器
# --no-trunc: 不截断输出
# -s: 显示总的文件大小

# 3. 查看容器的日志
docker logs -f 容器id
# -f: 可以滚动查看日志的最后几行

# 4. 进入到容器内部
docker exec -it 容器id bash

# 5. 删除容器(删除容器前，需要先停止容器)
docker stop 容器id
# 停止指定的容器
docker stop $(docker ps -qa)
# 停止全部容器
docker rm 镜像id
# 删除指定容器
docker rm $(docker ps -qa)
# 删除全部容器

#6. 启动容器
docker start 容器id
```

### 运行容器

参数说明：
• -i：保持容器运行。通常与 -t 同时使用。加入it这两个参数后，容器创建后自动进入容器中，退出容器后，容器自动关闭。

• -t：为容器重新分配一个伪输入终端，通常与 -i 同时使用。

• -d：以守护（后台）模式运行容器。创建一个容器在后台运行，需要使用docker exec 进入容器。退出后，容器不会关闭。

• -it 创建的容器一般称为交互式容器，-id 创建的容器一般称为守护式容器

• --name：为创建的容器命名。

### 1）交互式容器

以**交互式**方式创建并启动容器，启动完成后，直接进入当前容器。使用exit命令退出容器。需要注意的是以此种方式 启动容器，**如果退出容器**，则容器会进入**停止**状态。

```
# 先拉取一个镜像；这一步不是每次启动容器都要做的，而是因为前面我们删除了镜像，无镜像可用所以才再拉取一个 
docker pull centos:7 

#创建并启动名称为 mycentos7 的交互式容器；下面指令中的镜像名称 centos:7 也可以使用镜像id 
docker run -it --name=mycentos7 centos:7 /bin/bash

```

### 2）守护式容器

创建一个守护式容器；如果对于**一个需要长期运行的容器**来说，我们可以创建一个守护式容器。命令如下（容器名称 不能重复）：

```
#创建并启动守护式容器
docker run -di --name=mycentos2 centos:7

#登录进入容器命令为：docker exec -it container_name (或者 container_id) /bin/bash（exit退出 时，容器不会停止）
docker exec -it mycentos2 /bin/bash

```

### 查看容器状态

`docker inspect 容器名称或者容器id`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200922223454348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ2NjkwMjgw,size_16,color_FFFFFF,t_70#pic_center)

说明：容器之间在一个局域网内，linux宿主机器可以与容器进行通信；但是外部的物理机笔记本是不能与容器直接通信的，如果需要则需要通过宿主机器端口的代理。

## Dockerfile 制作镜像

- Dockerfile 是一个文本文件
- 包含了一条条的指令
- 每一条指令构建一层，基于基础镜像，最终构建出一个新的镜像
- 对于开发人员：可以为开发团队提供一个完全一致的开发环境
- 对于测试人员：可以直接拿开发时所构建的镜像或者通过Dockerfile文件，构建一个新的镜像开始工作了
- 对于运维人员：在部署时，可以实现应用的无缝移植

| 关键字     | 作用         | 备注                                                         |
| ---------- | ------------ | ------------------------------------------------------------ |
| FROM       | 指定父镜像   | 指定`Dockerfile`基于哪个image构建<br />一个 `Dockerfile` 中 `FROM` 是必备的指令，并且必须是第一条指令。<br />`FROM centos:7` |
| MAINTAINER | 作者信息     | 用来标明这个dockerfile谁写的<br />MAINTAINER ck bettermanchenkang@163.com |
| LABEL      | 标签         | 1. `LABEL` 指令用来给镜像以键值对的形式添加一些元数据（metadata）。<br />`LABEL <key>=<value> <key>=<value> <key>=<value> ...`<br />2. 也可以使用Label代替Maintainer 最终都是在docker image基本信息中可以查看<br />`LABEL org.opencontainers.image.authors="yeasy"`<br />`LABEL org.opencontainers.image.documentation="https://yeasy.gitbooks.io"` |
| RUN        | 执行命令     | `RUN` 指令是用来执行命令行命令的。<br />格式有两种：<br />*shell* 格式：`RUN <命令>`，就像直接在命令行中输入的命令一样。刚才写的 Dockerfile 中的 `RUN` 指令就是这种格式。<br />`RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html`<br />*exec* 格式：`RUN ["可执行文件", "参数1", "参数2"]`，这更像是函数调用中的格式。<br /><span style="color:red">RUN命令，可以把很多个命令合在一起，因为每个RUN都会新建一层</span><br />正确的RUN：<br />![image-20210916172718515](Imag/image-20210916172718515.png)<br />错误的RUN：<br />![image-20210916172822074](Imag/image-20210916172822074.png) |
| CMD        | 容器启动命令 | `CMD` 指令的格式和 `RUN` 相似，也是两种格式：<br />shell` 格式：`CMD <命令><br />exec` 格式：`CMD ["可执行文件", "参数1", "参数2"...]<br />和ENTRYPOINT配合使用：<br />参数列表格式：`CMD ["参数1", "参数2"...]`<br />在指定了 `ENTRYPOINT` 指令后，用 `CMD` 指定具体的参数。 |
| ENTRYPOINT | 入口         | 一般在制作一些执行就关闭的容器中会使用<br /><span style="color:red">用**RUN**来给你的initial iamge加层</span><br /><span style="color:red">如果你的image需要有一定要执行的指令，那么使用ENTRYPOINT，别用CMD</span><br /><span style="color:red">CMD可以给ENTRYPOINT提供额外的默认参数</span> |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |
|            |              |                                                              |

### Dockerfile里RUN、CMD、ENTRYPOINT的区别

CMD放到后台的命令不一定会执行，要从EXE和SHELL两种命令形式去分析：

参考链接：[Docker RUN vs CMD vs ENTRYPOINT](https://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/)

## 容器转为镜像（了解，不要使用docker commit命令）

1. 使用docker commit命令可以将容器保存为镜像。

   命令形式：docker commit 容器名称 镜像名称

   ```
   eg:
   docker commit 381827f60f70 itheima_tomcat:1.0
   ```

2. 使用docker save命令可以将已有镜像保存为tar 文件。 

   命令形式：docker save –o tar文件名 镜像名

   ```
   docker save -o itheima_tomcat:1.0.tar itheima_tomcat:1.0
   ```

3. 用docker load命令可以根据tar文件恢复为docker镜像。命令形式：docker load -i tar文件名

   ```
   # 加载恢复镜像
   docker load -i itheima_tomcat.tar 
   # 在镜像恢复之后，基于该镜像再次创建启动容器 
   docker run -di --name=new_tomcat -p 8080:8080 itheima_tomcat:1.0
   ```

   **注意：新的镜像制作后，原本容器中挂载的目录将失效， 索引一般在恢复镜像创建容器容器的时候需要重新挂载。**

   

