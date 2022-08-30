```shell
# 进入容器
docker exec -it kafka /bin/bash
# 进入kafka配置目录
cd $KAFKA_HOME/config
# 修改生产者配置
vi producter.properties 
# 10M
max.request.size=10485880
# 退出容器
exit
# 重启容器
docker restart kafka
```

