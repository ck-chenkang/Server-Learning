# k8s yaml 资源清单

## yaml语法

参考链接：

[k8s之yaml](https://www.136.la/jingpin/show-130798.html)

### 说明是yaml

**YAML 是一种非常简洁/强大/专门用来写配置文件的语言**

YAML 全称是 ”YAML Ain’t a Markup Language” 的递归缩写，该语言的设计参考了 JSON / XML 和 SDL 等语言,强调以数据为中心，简洁易读，编写简单。

![在这里插入图片描述](https://img.136.la/20210516/76b2940ba68a4b58873e1e0baed34923.jpg)



### yaml语法特点

- 大小写敏感
- 通过缩进表示层级关系
- 禁止使用tab缩进，只能使用空格键
- 缩进的空格数目不重要，只要相同层级左对齐
- 一般开头缩进两个空格，字符串口缩进一个空格，比如冒号，逗号等后面
- 使用#表示注释
- 使用---表示一个新的yaml文件的开始
- 想要表示列表项，使用一个短横杠加一个空格

还有一些其他的数据表示方法，可以参考上面的链接。

## Pod yaml详细说明

参考链接：

[k8s yaml详细说明](https://my.oschina.net/jastme/blog/4269071)

K8S Yaml 配置文件主要分为**基本标签、元数据标签、资源内容 3 个部分**

<span style="color:red">k8s中一般有两种缩进，两个空格和一个空格，不同层级两个空格，'-'，':'等符号后面一个空格</span>

- 基本标签

```yaml
apiVersion: v1 #必选，版本号，例如v1
kind: Pod #必选，Pod
```

- 元数据标签

```yaml
metadata:       #必选，元数据
  name: string       #必选，Pod名称
  namespace: string    #必选，Pod所属的命名空间
  labels:      #自定义标签
    - name: string     #自定义标签名字
  annotations:       #自定义注释列表
    - name: string
```

- 内容标签

```yaml
spec:         #必选，Pod中容器的详细定义
  containers:      #必选，Pod中容器列表
  - name: string     #必选，容器名称
    image: string    #必选，容器的镜像名称
    imagePullPolicy: [Always | Never | IfNotPresent] #获取镜像的策略 Alawys表示下载镜像 IfnotPresent表示优先使用本地镜像，否则下载镜像，Nerver表示仅使用本地镜像
    command: [string]    #容器的启动命令列表，如不指定，使用打包时使用的启动命令
    args: [string]     #容器的启动命令参数列表
    workingDir: string     #容器的工作目录
    volumeMounts:    #挂载到容器内部的存储卷配置
    - name: string     #引用pod定义的共享存储卷的名称，需用volumes[]部分定义的的卷名
      mountPath: string    #存储卷在容器内mount的绝对路径，应少于512字符
      readOnly: boolean    #是否为只读模式
    ports:       #需要暴露的端口库号列表
    - name: string     #端口号名称
      containerPort: int   #容器需要监听的端口号
      hostPort: int    #容器所在主机需要监听的端口号，默认与Container相同
      protocol: string     #端口协议，支持TCP和UDP，默认TCP
    env:       #容器运行前需设置的环境变量列表
    - name: string     #环境变量名称
      value: string    #环境变量的值
    resources:       #资源限制和请求的设置
      limits:      #资源限制的设置
        cpu: string    #Cpu的限制，单位为core数，将用于docker run --cpu-shares参数
        memory: string     #内存限制，单位可以为Mib/Gib，将用于docker run --memory参数
      requests:      #资源请求的设置
        cpu: string    #Cpu请求，容器启动的初始可用数量
        memory: string     #内存清楚，容器启动的初始可用数量
    livenessProbe:     #对Pod内个容器健康检查的设置，当探测无响应几次后将自动重启该容器，检查方法有exec、httpGet和tcpSocket，对一个容器只需设置其中一种方法即可
      exec:      #对Pod容器内检查方式设置为exec方式
        command: [string]  #exec方式需要制定的命令或脚本
      httpGet:       #对Pod内个容器健康检查方法设置为HttpGet，需要制定Path、port
        path: string
        port: number
        host: string
        scheme: string
        HttpHeaders:
        - name: string
          value: string
      tcpSocket:     #对Pod内个容器健康检查方式设置为tcpSocket方式
         port: number
       initialDelaySeconds: 0  #容器启动完成后首次探测的时间，单位为秒
       timeoutSeconds: 0   #对容器健康检查探测等待响应的超时时间，单位秒，默认1秒
       periodSeconds: 0    #对容器监控检查的定期探测时间设置，单位秒，默认10秒一次
       successThreshold: 0
       failureThreshold: 0
       securityContext:
         privileged:false
    restartPolicy: [Always | Never | OnFailure]#Pod的重启策略，Always表示一旦不管以何种方式终止运行，kubelet都将重启，OnFailure表示只有Pod以非0退出码退出才重启，Nerver表示不再重启该Pod
    nodeSelector: obeject  #设置NodeSelector表示将该Pod调度到包含这个label的node上，以key：value的格式指定
    imagePullSecrets:    #Pull镜像时使用的secret名称，以key：secretkey格式指定
    - name: string
    hostNetwork:false      #是否使用主机网络模式，默认为false，如果设置为true，表示使用宿主机网络
    volumes:       #在该pod上定义共享存储卷列表
    - name: string     #共享存储卷名称 （volumes类型有很多种）
      emptyDir: {}     #类型为emtyDir的存储卷，与Pod同生命周期的一个临时目录。为空值
      hostPath: string     #类型为hostPath的存储卷，表示挂载Pod所在宿主机的目录
        path: string     #Pod所在宿主机的目录，将被用于同期中mount的目录
      secret:      #类型为secret的存储卷，挂载集群与定义的secre对象到容器内部
        scretname: string  
        items:     
        - key: string
          path: string
      configMap:     #类型为configMap的存储卷，挂载预定义的configMap对象到容器内部
        name: string
        items:
        - key: string
          path: string
```



## 常用字段说明

| 参数名                                      | 字段类型 | 说明                                                         |
| ------------------------------------------- | -------- | ------------------------------------------------------------ |
| version                                     | string   | k8s api的版本号，目前是v1，可以通过kubectl api-version查看   |
| kind                                        | string   | 指定资源类型，例如Pod，Deployment，Service等                 |
| metadata                                    | object   | 自定义metadata                                               |
| metadata.name                               | string   | 对象名字，用户自定义                                         |
| metadata.namespace                          | string   | 对象的命名空间，用户自定义                                   |
| spec                                        | Object   | 对象的详细信息                                               |
| spc.restartPolicy                           | string   | pod重启策略<br />Always：pod一旦退出就要进行重启<br />OnFailure：只有非正常退出才进行重启<br />Nerver：退出后不再拉起 |
| spec.hostNetwork                            | bool     | 是否使用主机网络，默认值false设置为true，表示与主机在同一个网络空间 |
| spec.nodeSelector                           | object   | 标签选择器，k-v形式                                          |
| spec.containers[]                           | list     | 容器对象列表                                                 |
| spec.containers[].name                      | string   | 容器的名称                                                   |
| spec.containers[].image                     | string   | 容器使用的镜像                                               |
| spec.containers[].imagePullPolicy           | string   | Always：每次都重新下载<br />IfNotPresent：如果本地存在则使用本地镜像，不重新拉取<br />Never：表示仅使用本地镜像 |
| spec.containers[].command[]                 | list     | 指定容器启动命令，可以是多个命令，如果不指定则使用镜像中启动命令 |
| spec.containers[].args[]                    | list     | 启动命令参数，可以多个                                       |
| spec.containers[].workingDir                | string   | 容器的工作目录                                               |
| spec.containers[].volumeMounts[]            | list     | 指定容器的挂在卷，可以多个                                   |
| spec.containers[].volumeMounts[].name       | string   | 挂在卷名称                                                   |
| spec.containers[].volumeMounts[].mountPath  | string   | 挂在卷路径                                                   |
| spec.containers[].volumeMounts[].readOnly   | bool     | 读写模式，true只读（默认值），false读写                      |
| spec.containers[].ports[]                   | list     | 容器用到端口                                                 |
| spec.containers[].ports[].name              | string   | 端口名称                                                     |
| spec.containers[].ports[].containerPort     | number   | 端口号                                                       |
| spec.containers[].ports[].hostPort          | number   | 指定host主机使用端口。主要适用于端口映射，默认值是和容器内端口相同 |
| spec.containers[].ports[].protocol          | string   | 监听协议，tcp、udp，默认是tcp                                |
| spec.containers[].env[]                     | list     | 容器的环境变量列表                                           |
| spec.containers[].env[].name                | string   | 环境变量name                                                 |
| spec.containers[].env[].value               | string   | 环境变量value                                                |
| spec.containers[].resources                 | object   | 用于设置资源限制和资源请求                                   |
| spec.containers[].resources.limits          | object   | 设置资源上限                                                 |
| spec.containers[].resources.limits.cpu      | string   | 对cpu的限制，k8s将一个逻辑cpu划分成1000个millicore(毫核)。例如 limits.cpu=500m相当于0.5个cpu。 limits.cpu=2表示占用2个cpu |
| spec.containers[].resources.limits.memory   | string   | 对内存的限制                                                 |
| spec.containers[].resources.requests        | object   | 容器启动和调度是的限制设置                                   |
| spec.containers[].resources.requests.cpu    | string   | 对cpu的限制，k8s将一个逻辑cpu划分成1000个millicore(毫核)。例如 limits.cpu=500m相当于0.5个cpu。 limits.cpu=2表示占用2个cpu |
| spec.containers[].resources.requests.memory | string   | 对内存的限制                                                 |

## kind种类

| 分类                        | 说明                                              | 其他                                                         |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| Pod                         | k8s最基本管理单元                                 |                                                              |
| ReplicationController（RC） | 副本控制器，用于控制Pod副本数，目前官方不建议使用 | 保证副本数，始终为用户指定数目                               |
| ReplicaSet（RS）            | 是RC的升级版本，比RC多了一个选择器，其他都一样。  | 保证副本数，始终为用户指定数目，不能动态扩缩容               |
| Deployment                  | 支持动态扩缩容，滚动升级，版本回滚，RS不支持      |                                                              |
| DeamonSet                   | 确保全部或部分Node 上运行一个 Pod 的副本          | 例如：要求每个node上都有监控系统，日志系统等                 |
| Job                         | 执行脚本，linux命令等                             | 适用于批处理任务                                             |
| CronJob                     | 定时执行脚本，linux命令等                         | 定时批处理任务                                               |
| Service                     | 提供负载均衡和服务自动发现，底层通过EndPoint实现  |                                                              |
| EndPoints                   | pod名字和ip映射关系集合，支撑Service              |                                                              |
| ConfigMap                   | 配置集合，用于给pod/容器传递参数                  | 1、 将环境变量直接定义在configMap中，当Pod启动时,通过env来引用configMap中定义的环境变量。 <br />2、 将一个完整配置文件封装到configMap中,然后通过共享卷的方式挂载到Pod中,实现给应用传参。 |



## 各类yaml文件详解

[各类yaml文件详解](https://www.pianshen.com/article/6425350768/)

[更加丰富的yaml文件](https://blog.csdn.net/weixin_43357497/article/details/107645691)

### glustersfsPV.yaml

#### endpoint.yaml

```yaml
apiVersion: v1
kind: Endpoints
metadata: ------------------------------------#元数据
  name: glusterfs ----------------------------#ep名称
  namespace: default -------------------------#命名空间
subsets: -------------------------------------#配置glusterfs连接信息
- addresses: ---------------------------------#添加glusterfs分布式地址
  - ip: 10.0.0.14 
  - ip: 10.0.0.15
  - ip: 10.0.0.16
  ports: -------------------------------------#设定glusterfs服务端口
  - port: 49152
    protocol: TCP
```

#### glusterfs server.yaml

```yaml
apiVersion: v1
kind: Service
metadata: 
  name: glusterfs
  namespace: default
spec:
  ports:
  - port: 49152
    protocol: TCP
    targetPort: 49152
  sessionAffinity: None ----------------------#是否支持session
  type: ClusterIP
```

### PV.yaml

```yaml
apiVersion: v1
kind: PersistentVolume
metadata: -------------------------------------#元数据
  name: tomcat-mysql --------------------------#pv名称
  labels: -------------------------------------#标签信息
    xxx: xxx 
spec: -----------------------------------------#定义pv模板
  capacity: -----------------------------------#定义pv容量
    storage: 10Gi 
  accessModes: --------------------------------#访问模型；对象列表 
  											   #ReadWriteOnce一人读写
  											   #ReadOnlyMany 多人只读
  											   #ReadWriteMany多人读写
    - ReadWriteMany 
  persistentVolumeReclaimPolicy: Recycle ------#pvc解除绑定后，数据操作
                                               #默认是Retain保留生成的数据、
                                               #recycle回收
                                               #delete，删除
=========================================================================================  
  #nfs: 类型
  nfs:  ---------------------------------------#nfs挂载类型
    path: "/data/tomcat" ----------------------#nfs服务目录
    server: 172.16.20.101 ---------------------#nfs服务地址
    readOnly: false ---------------------------#关闭只读
=========================================================================================
   #glusterfs：分布式类型 注意：使用glusterfs 需要提交部署endpoint服务
   glusterfs:	-------------------------------#glusterfs挂载类型
    endpoints: "glusterfs" --------------------#端点类型 请保持与glusterfs ep服务名称一致。
    path: "qiangge" ---------------------------#挂载目录 glusterfs文件名称
    readOnly: false ---------------------------#关闭只读
```

### PVC.yaml

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata: -------------------------------------#元数据
  name: html ----------------------------------#pvc名称
  namespace: xxxx -----------------------------#命名空间
spec: -----------------------------------------#pvc模板
  selector: -----------------------------------#标签选择器
    matchLabels:  -----------------------------#必须与pv标签信息一致才可关联 如果不指定则随机匹配pv
	  xxx: xxx
  accessModes: --------------------------------#访问模型；对象列表 
  											   #ReadWriteOnce一人读写
  											   #ReadOnlyMany 多人只读
  											   #ReadWriteMany多人读写
    - ReadWriteMany
  resources: ----------------------------------#资源信息
    requests: ---------------------------------#请求容量
      storage: 99Gi
  storageClassName: xxxx -----------------#存储类名称 注意1.5.2版本不可用
  volumeMode: Filesystem ----------------------#卷模式为文件系统 注意1.5.2版本不可用
  volumeName: pvc-ff926bb2-3029-4a08-b123-31a2ad1b6a19 --#卷名称
```

### Deployment.yaml

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:	----------------------------------------#元数据
  annotations: -------------------------------------#注释信息
    deployment.kubernetes.io/revision: '1'
    k8s.kuboard.cn/ingress: 'false'
    k8s.kuboard.cn/service: NodePort
    k8s.kuboard.cn/workload: nextcloud
  labels:-------------------------------------------#标签信息
    k8s.kuboard.cn/layer: ''						
    k8s.kuboard.cn/name: nextcloud
  name: nextcloud-----------------------------------#名称
  namespace: nextcloud------------------------------#命名空间	
spec:-----------------------------------------------#定义容器模板，该模板可以包含多个容器	
  replicas: 3---------------------------------------#副本数量
  selector:-----------------------------------------#标签选择器
    matchLabels:
      k8s.kuboard.cn/layer: ''
      k8s.kuboard.cn/name: nextcloud
  strategy:-----------------------------------------#滚动升级策略
    type: RollingUpdate-----------------------------#类型
    rollingUpdate:----------------------------------#由于replicas为3,则整个升级,pod个数在2-4个之间		
      maxSurge: 25%---------------------------------#滚动升级时会先启动25%pod	
      maxUnavailable: 25%---------------------------#滚动升级时允许的最大Unavailable的pod个数
  template:											#镜像模板										
    metadata:	------------------------------------#元数据
      labels:---------------------------------------#标签
        k8s.kuboard.cn/layer: ''
        k8s.kuboard.cn/name: nextcloud
    spec: ------------------------------------------#定义容器模板，该模板可以包含多个容器
      containers: ----------------------------------#容器信息
		- name: nextcloud --------------------------#容器名称
          image: '172.16.20.100/library/nextcloud:yan' #镜像名称
          imagePullPolicy: Always ------------------#镜像下载策略	
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          env
          resources: -------------------------------#CPU内存限制
		    limits:	--------------------------------#限制cpu内存											
              cpu: 200m
              memory: 200m
            requests: ------------------------------#请求cpu内存
              cpu: 100m
              memory: 100m
          securityContext: -------------------------#安全设定
            privileged: true -----------------------#开启享有特权
          volumeMounts:	----------------------------#挂载volumes中定义的磁盘
		    - name: html ---------------------------#挂载容器1
              mountPath: /var/www/html 
            - name: session ------------------------#挂载容器1
              mountPath: /var/lib/php/session			  
      volumes:  ------------------------------------#在该pod上定义共享存储卷列表
        - name: html -------------------------------#共享存储卷名称 （volumes类型有很多种）
          persistentVolumeClaim: -------------------#volumes类型为pvc
            claimName: html  -----------------------#关联pvc名称
        - name: session
          persistentVolumeClaim:
            claimName: session			  
      restartPolicy: Always	------------------------#Pod的重启策略 
      												#Always表示一旦不管以何种方式终止运行，
      												#kubelet都将重启，
      												#OnFailure表示只有Pod以非0退出码退出才重启，
      												#Nerver表示不再重启该Pod
      schedulerName: default-scheduler -------------#指定pod调度到节点

```

### Pod.yaml

```yaml
  apiVersion: v1             #指定api版本，此值必须在kubectl apiversion中  
  kind: Pod                  #指定创建资源的角色/类型  
  metadata:                  #资源的元数据/属性  
    name: django-pod         #资源的名字，在同一个namespace中必须唯一  
    labels:                  #设定资源的标签，使这个标签在service网络中备案，以便被获知
      k8s-app: django
      version: v1  
      kubernetes.io/cluster-service: "true"  
    annotations:             #设置自定义注解列表  
       - name: String         #设置自定义注解名字  
  spec:                      #设置该资源的内容  
    restartPolicy: Always    #表示自动重启，一直都会有这个容器运行
    nodeSelector:            #选择node节点14     zone: node1  
    containers:  
    - name: django-pod        #容器的名字  
      image: django:v1.1      #容器使用的镜像地址  
      imagePullPolicy: Never #三个选择Always、Never、IfNotPresent，每次启动时检查和更新（从registery）images的策略，
                             # Always，每次都检查
                             # Never，每次都不检查（不管本地是否有）
                             # IfNotPresent，如果本地有就不检查，如果没有就拉取
      command: ['sh']        #启动容器的运行命令，将覆盖容器中的Entrypoint,对应Dockefile中的ENTRYPOINT  
      args: ["$(str)"]       #启动容器的命令参数，对应Dockerfile中CMD参数  
      env:                   #指定容器中的环境变量  
      - name: str            #变量的名字  
        value: "/etc/run.sh" #变量的值  
      resources:             #资源管理
        requests:            #容器运行时，最低资源需求，也就是说最少需要多少资源容器才能正常运行  
        cpu: 0.1           #CPU资源（核数），两种方式，浮点数或者是整数+m，0.1=100m，最少值为0.001核（1m）
          memory: 32Mi       #内存使用量  
        limits:              #资源限制  
          cpu: 0.5  
          memory: 32Mi  
      ports:  
      - containerPort: 8080    #容器开发对外的端口
        name: uwsgi          #名称
        protocol: TCP  
      livenessProbe:         #pod内容器健康检查的设置
        httpGet:             #通过httpget检查健康，返回200-399之间，则认为容器正常  
          path: /            #URI地址  
          port: 8080  
          #host: 127.0.0.1   #主机地址  
          scheme: HTTP  
        initialDelaySeconds: 180 #表明第一次检测在容器启动后多长时间后开始  
        timeoutSeconds: 5    #检测的超时时间  
        periodSeconds: 15    #检查间隔时间  
        #也可以用这种方法  
        #exec: 执行命令的方法进行监测，如果其退出码不为0，则认为容器正常  
        #  command:  
        #    - cat  
        #    - /tmp/health  
        #也可以用这种方法  
        #tcpSocket: //通过tcpSocket检查健康   
        #  port: number   
      lifecycle:             #生命周期管理(钩子)  
        postStart:           #容器运行之前运行的任务  
          exec:  
            command:  
              - 'sh'  
              - 'yum upgrade -y'  
        preStop:             #容器关闭之前运行的任务  
          exec:  
            command: ['service httpd stop']  
      volumeMounts:          #挂载设置
      - name: volume         #挂载设备的名字，与volumes[*].name 需要对应    
        mountPath: /data     #挂载到容器的某个路径下  
        readOnly: True  
    volumes:                 #定义一组挂载设备  
    - name: volume           #定义一个挂载设备的名字  
      #meptyDir: {}  
      hostPath:  
        path: /opt           #挂载设备类型为hostPath，路径为宿主机下的/opt

```

### Service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:  ---------------------------------#元数据
  annotations: -----------------------------#注释信息
    k8s.kuboard.cn/workload: nextcloud
  labels: ----------------------------------#标签信息
    k8s.kuboard.cn/layer: ''
    k8s.kuboard.cn/name: nextcloud
  name: nextcloud --------------------------#名称
  namespace: nextcloud ---------------------#命名空间
spec: --------------------------------------#定义Service模板
  clusterIP: 10.0.181.206 ------------------#指定svcip地址 不指定则随机 
  
 =================================================================================================
  #NodePort类型：集群外网络
  type: NodePort ---------------------------#类型为NodePort  
  ports:
    - name: mnwwwp
      nodePort: 30001 ----------------------#当type = NodePort时，指定映射到物理机的端口号
      port: 80 -----------------------------#服务监听的端口号
      protocol: TCP ------------------------#端口协议，支持TCP和UDP，默认TCP
      targetPort: 80 -----------------------#需要转发到后端Pod的端口号
  
  ==================================================================================================
  #ClusterIP类型： 集群内网络
  type: ClusterIP --------------------------#
  ports:
    - name: mnwwwp
      port: 80
      protocol: TCP
      targetPort: 80
    - name: j5smwx
      port: 22
      protocol: TCP
      targetPort: 22
      
  selector:  -------------------------------#label selector配置，将选择具有label标签的Pod作为管理 
    k8s.kuboard.cn/layer: ''
    k8s.kuboard.cn/name: nextcloud
  sessionAffinity: None --------------------#是否支持session

```

### StatefulSet.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web01-satefulset
  labels:
    app: web01-satefulset
spec:
  clusterIP: None 
  selector:
    app: web01-satefulset
  ports:
  - port: 80
    name: web
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web01-satefulset
  namespace: default
spec:
  serviceName: web01-satefulset
  replicas: 3
  selector:
    matchLabels:
      app: web01-satefulset
  template:
    metadata:
      labels:
        app: web01-satefulset
    spec:
      containers:
      - name: web01-satefulset
        image: nginx:1.14
        ports:
        - containerPort: 80
```

