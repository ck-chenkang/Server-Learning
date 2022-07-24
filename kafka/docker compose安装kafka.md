# Docker/Docker-Compose 安装 Kafka       

​     [参考链接](https://blog.csdn.net/csp732171109/article/details/124489764?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165830698916781790756849%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=165830698916781790756849&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~hot_rank-4-124489764-null-null.142^v32^down_rank,185^v2^control&utm_term=docker%20compose%E5%AE%89%E8%A3%85kafka&spm=1018.2226.3001.4187)                      

## **安装环境** 

- [Docker](https://juejin.cn/post/7028500058056163341)
- [Docker-Compose](https://juejin.cn/post/7028555583347228709)
- [Kafka 入门必读](https://blog.csdn.net/csp732171109/article/details/122778348)

## **安装 Zookeeper** 

1.下载镜像

```shell
docker pull zookeeper:3.7
```

2.启动

```shell
docker run -d --name zookeeper -p 2181:2181 -e TZ="Asia/Shanghai" -v /opt/zookeeper/data:/data --restart always zookeeper:3.7
```

## **安装 Kafka** 

1.下载镜像

```shell
docker pull wurstmeister/kafka
```

2.启动

```shell
docker run -d --name kafka -p 9092:9092 -e KAFKA_BROKER_ID=0 -e KAFKA_ZOOKEEPER_CONNECT=Zookeeper-IP:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://IP:9092 -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 -e TZ="Asia/Shanghai" wurstmeister/kafka
```

### 启动环境变量参数说明

| **变量**                   | **描述**                                        |
| :------------------------- | :---------------------------------------------- |
| KAFKA_BROKER_ID            | kafka集群中每个kafka都有一个BROKER_ID来区分自己 |
| KAFKA_ADVERTISED_LISTENERS | kafka的地址和端口，用于向zookeeper注册          |
| KAFKA_ZOOKEEPER_CONNECT    | zookeeper地址                                   |
| KAFKA_LISTENERS            | kafka监听端口                                   |
| TZ                         | 容器时区                                        |

## **安装 Manager** 

1.下载镜像

```shell
docker pull sheepkiller/kafka-manager
```

2.启动

```shell
docker run -d --name kfk-manager --restart always -p 9000:9000 -e ZK_HOSTS=<这里换成你的zookeeper地址和端口> sheepkiller/kafka-manager
```

## **Docker-Compose 安装 Kafka** 

### 新建目录

```shell
mkdir kafka
```

### 新建 docker-compose.yml

```yaml
version: '3.5'
services:
  zookeeper:
    image: wurstmeister/zookeeper   ## 镜像
    container_name: zookeeper
    ports:
      - "2181:2181"                 ## 对外暴露的端口号
    restart: always ## 设置开机自启动
  kafka:
    image: wurstmeister/kafka       ## 镜像
    container_name: kafka
    volumes: 
        - /etc/localtime:/etc/localtime ## 挂载位置（kafka镜像和宿主机器之间时间保持一直）
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: 127.0.0.1         ## 修改:宿主机IP
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181       ## 卡夫卡运行是基于zookeeper的
      KAFKA_ADVERTISED_PORT: 9092
      KAFKA_LOG_RETENTION_HOURS: 120
      KAFKA_MESSAGE_MAX_BYTES: 10000000
      KAFKA_REPLICA_FETCH_MAX_BYTES: 10000000
      KAFKA_GROUP_MAX_SESSION_TIMEOUT_MS: 60000
      KAFKA_NUM_PARTITIONS: 3
      KAFKA_DELETE_RETENTION_MS: 1000
    restart: always ## 设置开机自启动
  kafka-manager:
    image: sheepkiller/kafka-manager                ## 镜像：开源的web管理kafka集群的界面
    container_name: kafka-manager
    environment:
        ZK_HOSTS: 127.0.0.1                         ## 修改:宿主机IP
    ports:  
      - "9009:9000"                                 ## 暴露端口 9000这个端口冲突太多
    restart: always ## 设置开机自启动
```

> 启动

```shell
docker-compose up -d --build
```

## **测试** 

### 1.通过容器名称进入到 kafka 容器中

```shell
docker exec -it kafka /bin/bash
```

### 2.创建一个名称为 mingyue 的 topic

```shell
kafka-topics.sh --create --topic mingyue \
--zookeeper zookeeper:2181 --replication-factor 1 \
--partitions 1
```

> 输出日志：

```
Created topic mingyue.
```

### 3.查看刚刚创建的 topic 信息

```shell
kafka-topics.sh --zookeeper zookeeper:2181 --describe --topic mingyue
```

### 输出日志：

```shell
Topic: mingyue	TopicId: jn6EBXBFStqH4s1zTERmnQ	PartitionCount: 1	ReplicationFactor: 1	Configs: 
Topic: mingyue	Partition: 0	Leader: 1001	Replicas: 1001	Isr: 1001
```

### 4.打开生产者发送消息

```shell
kafka-console-producer.sh --topic=mingyue \
--broker-list kafka:9092
```

### 5.消费者接收消息

```shell
kafka-console-consumer.sh \
--bootstrap-server kafka:9092 \
--from-beginning --topic mingyue
```

> 输入日志：

```shell
# 生产者发送消息
bash-5.1# kafka-console-producer.sh --topic=mingyue \
> --broker-list kafka:9092
>hahah
>love
>mingyue

# 消费者接收消息
bash-5.1# kafka-console-consumer.sh \
> --bootstrap-server kafka:9092 \
> --from-beginning --topic mingyue
hahah
love
mingyue
```