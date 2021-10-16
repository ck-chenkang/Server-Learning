# kubectl常用命令

参考链接：

[kubectl常用命令一](https://blog.csdn.net/miss1181248983/article/details/88037531)

[kuibectl常用命令二](https://blog.csdn.net/miss1181248983/article/details/88130576)

[kubectl常用命令三](https://blog.csdn.net/miss1181248983/article/details/88181434)

[kubectl常用命令四](https://blog.csdn.net/miss1181248983/article/details/88235664)

## 语法格式

`kubectl [command] [TYPE] [NAME] [flags]`

- command：指定在一个或多个资源上要执行的操作，列如：create，get，describe，delete，apply等

- TYPE：指定资源类型，如：pod、node、services、deployments等。

  - 资源类型大小写敏感
  - 可以是单数、复数、缩写形式，如：
    - kubectl get pod -n kubernets-dashboard
    - kebectl get pods -n kubernetes-dashboard
    - kubectl get po -n kubernets-dashboard

- NANME 指定资源名称。

  - 大小写敏感

  - 如果省略，则显示默认名称空间资源的详细信息或者提示：No resources found in default namespace，如：

  - ```
    1 # 示例：
    2 [root@k8s-master ~]# kubectl get pods
    3 No resources found in default namespace.
    4 [root@k8s-master ~]# kubectl get pods --all-namespaces  # 或者 kubectl get pods --A
    5 NAMESPACE              NAME                                         READY   STATUS    RESTARTS   AGE
    6 kube-system            coredns-6955765f44-c9zfh                     1/1     Running   8          6d7h
    7 kube-system            coredns-6955765f44-lrz5q                     1/1     Running   8          6d7h
    8 kube-system            etcd-k8s-master                              1/1     Running   9          6d7h
    9 kube-system            kube-apiserver-k8s-master                    1/1     Running   9          6d7h
    10 kube-system            kube-controller-manager-k8s-master           1/1     Running   8          6d7h
    11 kube-system            kube-flannel-ds-amd64-dngrk                  1/1     Running   13         6d7h
    12 kube-system            kube-flannel-ds-amd64-h4sn6                  1/1     Running   13         6d6h
    13 kube-system            kube-flannel-ds-amd64-m92wp                  1/1     Running   11         6d6h
    14 kube-system            kube-proxy-28dwj                             1/1     Running   9          6d6h
    15 kube-system            kube-proxy-c875m                             1/1     Running   8          6d7h
    16 kube-system            kube-proxy-stg6w                             1/1     Running   10         6d6h
    17 kube-system            kube-scheduler-k8s-master                    1/1     Running   9          6d7h
    18 kubernetes-dashboard   dashboard-metrics-scraper-7b8b58dc8b-nr5fz   1/1     Running   7          6d1h
    19 kubernetes-dashboard   kubernetes-dashboard-755dcb9575-9kg7p        1/1     Running   9          6d1h
    20 [root@k8s-master ~]# kubectl get service --all-namespaces  # 或者 kubectl get service -A
    21 NAMESPACE              NAME                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                  AGE
    22 default                kubernetes                  ClusterIP   10.96.0.1       <none>        443/TCP                  6d7h
    23 kube-system            kube-dns                    ClusterIP   10.96.0.10      <none>        53/UDP,53/TCP,9153/TCP   6d7h
    24 kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   10.104.12.221   <none>        8000/TCP                 6d1h
    25 kubernetes-dashboard   kubernetes-dashboard        NodePort    10.110.157.29   <none>        443:30001/TCP            6d1h
    ```

- flags：指定可选的标记，例如：可以使用-s或-server标识来指定kubenets api服务器的地址和端口号；-n指定名称空间；等。

  - 注意：命令行指定的flags将覆盖默认值和任何响应的环境变量。优先级最高

- 在多个资源上执行操作时，可以通过类型【TYPE】和名称【NAME】指定每个资源，也可以指定一个或多个文件。

## Command

通过kubectl -h可以查看所有的Command命令，查看具体的命令，需要用kubectl <command> -h

```
kubectl controls the Kubernetes cluster manager.

 Find more information at: https://kubernetes.io/docs/reference/kubectl/overview/

Basic Commands (Beginner):
  create        Create a resource from a file or from stdin
  expose        Take a replication controller, service, deployment or pod and expose it as a new Kubernetes service
  run           在集群中运行一个指定的镜像
  set           为 objects 设置一个指定的特征

Basic Commands (Intermediate):
  explain       Get documentation for a resource
  get           显示一个或更多 resources
  edit          在服务器上编辑一个资源
  delete        Delete resources by file names, stdin, resources and names, or by resources and label selector

Deploy Commands:
  rollout       Manage the rollout of a resource
  scale         Set a new size for a deployment, replica set, or replication controller
  autoscale     Auto-scale a deployment, replica set, stateful set, or replication controller

Cluster Management Commands:
  certificate   修改 certificate 资源.
  cluster-info  Display cluster information
  top           Display resource (CPU/memory) usage
  cordon        标记 node 为 unschedulable
  uncordon      标记 node 为 schedulable
  drain         Drain node in preparation for maintenance
  taint         更新一个或者多个 node 上的 taints

Troubleshooting and Debugging Commands:
  describe      显示一个指定 resource 或者 group 的 resources 详情
  logs          输出容器在 pod 中的日志
  attach        Attach 到一个运行中的 container
  exec          在一个 container 中执行一个命令
  port-forward  Forward one or more local ports to a pod
  proxy         运行一个 proxy 到 Kubernetes API server
  cp            Copy files and directories to and from containers
  auth          Inspect authorization
  debug         Create debugging sessions for troubleshooting workloads and nodes

Advanced Commands:
  diff          Diff the live version against a would-be applied version
  apply         Apply a configuration to a resource by file name or stdin
  patch         Update fields of a resource
  replace       Replace a resource by file name or stdin
  wait          Experimental: Wait for a specific condition on one or many resources
  kustomize     Build a kustomization target from a directory or URL.

Settings Commands:
  label         更新在这个资源上的 labels
  annotate      更新一个资源的注解
  completion    Output shell completion code for the specified shell (bash or zsh)

Other Commands:
  api-resources Print the supported API resources on the server
  api-versions  Print the supported API versions on the server, in the form of "group/version"
  config        修改 kubeconfig 文件
  plugin        Provides utilities for interacting with plugins
  version       输出 client 和 server 的版本信息

Usage:
  kubectl [flags] [options]

Use "kubectl <command> --help" for more information about a given command.
Use "kubectl options" for a list of global command-line options (applies to all commands).
```

## 基础命令

命令具体的使用方法，可以使用kubectl <command> -h来查看

| 命令    | 说明                                                    |
| ------- | ------------------------------------------------------- |
| create  | 使用文件或者标准输入的方式创建一个资源                  |
| expose  | 将一个资源公开为为新的Kubernetes Service                |
| run     | 创建并运行一个或多个容器镜像                            |
| set     | 配置应用资源                                            |
| explain | 显示资源文档信息                                        |
| get     | 获取显示一个或多个资源                                  |
| edit    | 编辑服务器上定义的资源                                  |
| delete  | 按文件名、stdin、资源和名称或按资源和标签选择器删除资源 |

### create

**kubectl create**可以通过配置文件名或stdin创建一个集群资源对象(Pod)。支持JSON和YAML格式的文件。

```
# vim mysql-deploy.yaml
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:5.6
        ports:
        - containerPort: 3306
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: "123456"
```

```
# kubectl create -f mysql-deploy.yaml 
deployment.apps/mysql created

# kubectl get deploy
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
mysql     1         1         1            1           1m

# kubectl get pod
NAME                     READY     STATUS    RESTARTS   AGE
mysql-5fb6c74b86-xg97j   1/1       Running   0          48s
```

![image-20211006071444946](Imag/image-20211006071444946.png)

### expose

**kubectl expose**将RC、Service、Deployment或Pod作为新的Kubernetes Service公开。

下面为Deployment的mysql创建service，并通过Service的33060端口转发至容器的3306端口上。

```
# kubectl expose deploy mysql --port=33060 --target-port=3306
service/mysql exposed               #自动创建一个新的service

# kubectl get svc
NAME         TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)     AGE
kubernetes   ClusterIP   10.68.0.1     <none>        443/TCP     10d
mysql        ClusterIP   10.68.86.66   <none>        33060/TCP   32s

```

### run

**kubectl run**创建并运行一个或多个容器镜像。

kubectl run和docker run一样，它能将一个镜像运行起来。下面使用kubectl run来将一个nginx的镜像启动起来。

```
# kubectl run nginx --image=nginx --expose --port=80            #指定镜像，指定暴露端口
service/nginx created
deployment.apps/nginx created
```

使用kubectl run会自动创建deployment，加上`--export`会自动创建service。

```
# kubectl get svc
NAME         TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.68.0.1     <none>        443/TCP   10d
nginx        ClusterIP   10.68.56.89   <none>        80/TCP    1m

# kubectl get deploy
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
mysql     1         1         1            1           16m
nginx     1         1         1            1           1m

# kubectl get pod
NAME                     READY     STATUS    RESTARTS   AGE
mysql-5fb6c74b86-xg97j   1/1       Running   0          21m
nginx-6f858d4d45-dt44v   1/1       Running   0          6m

```

### set

**kubectl set**用来配置应用资源，可以更改现有应用资源的一些信息。

例如，将deployment的nginx容器cpu限制为200m，将内存设置为512Mi。

```
# kubectl set resources deployment nginx -c=nginx --limits=cpu=200m,memory=512Mi
deployment.extensions/nginx resource requirements updated
```

子命令：

| 命令                  | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| kubectl set resources | 为资源对象中的Pod指定计算资源需求                            |
| kubectl set selector  | 设置资源的selector，若已存在则覆盖                           |
| kubectl set image     | 更新现有的资源对象的容器镜像                                 |
| kubectl set subject   | 更新RoleBinding / ClusterRoleBinding中User、Group 或 ServiceAccount |

### explain

**kubectl explain**可以了解各个部分的说明和组成部分，类似于kubectl help。

```
# kubectl explain deploy
KIND:     Deployment
VERSION:  extensions/v1beta1

DESCRIPTION:
     DEPRECATED - This group version of Deployment is deprecated by
     apps/v1beta2/Deployment. See the release notes for more information.
     Deployment enables declarative updates for Pods and ReplicaSets.

FIELDS:
   apiVersion	<string>
     APIVersion defines the versioned schema of this representation of an
     object. Servers should convert recognized schemas to the latest internal
     value, and may reject unrecognized values. More info:
     https://git.k8s.io/community/contributors/devel/api-conventions.md#resources

   kind	<string>
     Kind is a string value representing the REST resource this object
     represents. Servers may infer this from the endpoint the client submits
     requests to. Cannot be updated. In CamelCase. More info:
     https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds

   metadata	<Object>
     Standard object metadata.

   spec	<Object>
     Specification of the desired behavior of the Deployment.

   status	<Object>
     Most recently observed status of the Deployment.

```

### get

**kubectl get**获取列出一个或多个资源的信息。

例如，分别获取当前集群中pod、deployment和svc的信息。

```
# kubectl get pod
NAME                     READY     STATUS    RESTARTS   AGE
mysql-5fb6c74b86-xg97j   1/1       Running   0          42m
nginx-566c464789-w7669   1/1       Running   0          15m

# kubectl get deploy
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
mysql     1         1         1            1           43m
nginx     1         1         1            1           28m

# kubectl get svc
NAME         TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)     AGE
kubernetes   ClusterIP   10.68.0.1     <none>        443/TCP     10d
mysql        ClusterIP   10.68.86.66   <none>        33060/TCP   36m

```

### edit

kubectl edit用来编辑服务器上定义的资源。

使用命令行工具获取的任何资源都可以使用edit命令编辑。edit命令会打开使用KUBE_EDITOR，GIT_EDITOR 或者EDITOR环境变量定义的编辑器，可以同时编辑多个资源，但所编辑过的资源只会一次性提交。edit除命令参数外还接受文件名形式。

文件默认输出格式为YAML。要以JSON格式编辑，请指定“-o json”选项。

例如，编辑名为“mysql”的service。

```
# kubectl edit svc/mysql
service/mysql edited                #如果没有更改，则会提示 Edit cancelled, no changes made.
```

```
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: 2019-03-04T07:40:31Z
  labels:
    app: mysql
  name: mysql
  namespace: default
  resourceVersion: "1403097"
  selfLink: /api/v1/namespaces/default/services/mysql
  uid: c9fa11a3-3e50-11e9-83ba-000c29d20ca7
spec:
  clusterIP: 10.68.86.66
  ports:
  - port: 33070             #端口由33060改为33070
    protocol: TCP
    targetPort: 3306
  selector:
    app: mysql
  sessionAffinity: None
  type: ClusterIP
status:
  loadBalancer: {}
```

```
# kubectl get svc
NAME         TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)     AGE
kubernetes   ClusterIP   10.68.0.1     <none>        443/TCP     10d
mysql        ClusterIP   10.68.86.66   <none>        33070/TCP   42m
```

可以看到端口已经改成了33070。

### delete

**kubectl delete**可以通过配置文件名、stdin、资源名称或label选择器来删除资源。支持JSON和YAML格式的文件。

下面删除nginx的pod。

```
# kubectl get pod
NAME                     READY     STATUS    RESTARTS   AGE
mysql-5fb6c74b86-xg97j   1/1       Running   0          55m
nginx-566c464789-w7669   1/1       Running   0          27m

# kubectl delete pod/nginx-566c464789-w7669
pod "nginx-566c464789-w7669" deleted

```

```
# kubectl get pod
NAME                     READY     STATUS              RESTARTS   AGE
mysql-5fb6c74b86-xg97j   1/1       Running             0          55m
nginx-566c464789-8lr2x   0/1       ContainerCreating   0          1m
```

又生成了一个新的nginx的pod，为什么？这是因为对应的deployment还存在。

```
# kubectl delete deploy/nginx
deployment.extensions "nginx" deleted

# kubectl get deploy
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
mysql     1         1         1            1           1h

# kubectl get pod
NAME                     READY     STATUS    RESTARTS   AGE
mysql-5fb6c74b86-xg97j   1/1       Running   0          1h

```

删除掉deployment，其对应的pod也会被删除。

## 排错命令

如下命令，与故障排查相关：

| 命令         | 说明                                     |
| ------------ | ---------------------------------------- |
| describe     | 显示特定资源或资源组的详细信息           |
| logs         | 在pod中打印容器的日志                    |
| attach       | 连接到一个正在运行的容器                 |
| exec         | 在容器内部执行命令                       |
| port-forward | 将一个或多个本地端口转发到pod            |
| proxy        | 运行到Kubernetes API服务器的代理         |
| cp           | 将文件和目录复制到容器或从容器复制到容器 |
| auth         | 身份验证检查授权                         |

### describe

**kubectl describe**用来显示特定资源或资源组的详细信息。

例如，显示mysql的deployment的详细信息。

```
# kubectl describe deploy/mysql
Name:                   mysql
Namespace:              default
CreationTimestamp:      Mon, 04 Mar 2019 15:33:58 +0800
Labels:                 <none>
Annotations:            deployment.kubernetes.io/revision=1
Selector:               app=mysql
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=mysql
  Containers:
   mysql:
    Image:      mysql:5.6
    Port:       3306/TCP
    Host Port:  0/TCP
    Environment:
      MYSQL_ROOT_PASSWORD:  123456
    Mounts:                 <none>
  Volumes:                  <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   mysql-5fb6c74b86 (1/1 replicas created)
Events:          <none>

```

### logs

**kubectl logs**输出pod中一个容器的日志。如果pod只包含一个容器则可以省略容器名。

```
kubectl logs [-f] [-p] POD [-c CONTAINER]

```

```
  -c, --container="": 容器名。
  
  -f, --follow[=false]: 指定是否持续输出日志。
      --interactive[=true]: 如果为true，当需要时提示用户进行输入。默认为true。
      --limit-bytes=0: 输出日志的最大字节数。默认无限制。
      
  -p, --previous[=false]: 如果为true，输出pod中曾经运行过，但目前已终止的容器的日志。
      --since=0: 仅返回相对时间范围，如5s、2m或3h，之内的日志。默认返回所有日志。只能同时使用since和since-time中的一种。
      --since-time="": 仅返回指定时间（RFC3339格式）之后的日志。默认返回所有日志。只能同时使用since和since-time中的一种。
      --tail=-1: 要显示的最新的日志条数。默认为-1，显示所有的日志。
      --timestamps[=false]: 在日志中包含时间戳。

```

例如，输出mysql的pod的容器日志。

```
# kubectl logs mysql-5fb6c74b86-xg97j
2019-03-04 07:35:16 1 [Note] InnoDB: Waiting for purge to start
2019-03-04 07:35:16 1 [Note] InnoDB: 5.6.43 started; log sequence number 1625997
2019-03-04 07:35:16 1 [Note] Server hostname (bind-address): '*'; port: 3306
2019-03-04 07:35:16 1 [Note] IPv6 is available.
2019-03-04 07:35:16 1 [Note]   - '::' resolves to '::';
2019-03-04 07:35:16 1 [Note] Server socket created on IP: '::'.
2019-03-04 07:35:16 1 [Warning] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2019-03-04 07:35:16 1 [Warning] 'proxies_priv' entry '@ root@mysql-5fb6c74b86-xg97j' ignored in --skip-name-resolve mode.
2019-03-04 07:35:16 1 [Note] Event Scheduler: Loaded 0 events
2019-03-04 07:35:16 1 [Note] mysqld: ready for connections.
Version: '5.6.43'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)

```

-f 选项可以动态查看日志。

### attach

**kubectl attach**连接到现有容器中一个正在运行的容器。

attach命令类似于docker的attach命令，可以直接查看容器中以daemon形式运行的进程的输出，效果类似于`logs -f`

```
  -c, --container="": 容器名。
  
  -i, --stdin[=false]: 将控制台输入发送到容器。
  
  -t, --tty[=false]: 将标准输入控制台作为容器的控制台输入。

```

```
# kubectl attach mysql-5fb6c74b86-xg97j -c mysql 
If you don't see a command prompt, try pressing enter.

```

### exec

**kubectl exec**在容器内部执行命令。类似于docker的exec命令。

例如登录到容器中。

```
# kubectl exec -it mysql-5fb6c74b86-xg97j bash
root@mysql-5fb6c74b86-xg97j:/# exit

```

直接在容器中执行命令。

```
# kubectl exec mysql-5fb6c74b86-xg97j date
Mon Mar  4 09:30:35 UTC 2019

# kubectl exec mysql-5fb6c74b86-xg97j ls
bin
boot
dev
docker-entrypoint-initdb.d
entrypoint.sh
etc
home
lib
lib64
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
```

### port-forward

**kubectl port-forward**将一个或多个本地端口转发到pod。该命令不常用。

例如，把本地的port映射到pod的port。

```
# kubectl port-forward pod/mysql-5fb6c74b86-xg97j 3306:3306
Forwarding from 127.0.0.1:3306 -> 3306
Forwarding from [::1]:3306 -> 3306

```

### proxy

**kubectl proxy**运行一个到Kubernetes API服务器的代理。建立一条通往API服务器的隧道，可以方便查看API服务器上的资源。该命令不常用。

```
# kubectl proxy
Starting to serve on 127.0.0.1:8001
```

### cp

**kubectl cp**将文件和目录复制到容器或从容器复制到容器。

例如，在容器中创建1.txt，再复制到外部。

```
# kubectl exec -it mysql-5fb6c74b86-xg97j bash

root@mysql-5fb6c74b86-xg97j:/# echo "111222" > 1.txt

root@mysql-5fb6c74b86-xg97j:/# pwd      
/
root@mysql-5fb6c74b86-xg97j:/# exit

# kubectl cp mysql-5fb6c74b86-xg97j:/1.txt 1.txt
tar: Removing leading `/' from member names

# ls
1.txt  

# cat 1.txt 
111222

```

更改一下再复制到容器内。

```
# kubectl cp 1.txt mysql-5fb6c74b86-xg97j:/1.txt

# kubectl exec mysql-5fb6c74b86-xg97j cat /1.txt
333333

```

### auth

**kubectl auth**用于身份验证检查授权。该命令不常用。

可以检查一个动作是否被允许，协调RBAC角色、角色绑定、集群角色和集群角色绑定对象的规则。

## 部署命令

| 命令      | 说明                                      |
| --------- | ----------------------------------------- |
| rollout   | 管理资源的部署                            |
| scale     | 为deployment、rs、rc或job设置新的副本数量 |
| autoscale | 自动调整deployment、rs或者rc的副本数量    |

### rollout

**kubectl rollout**对资源进行管理。可用资源包括：deployment、daemonset。

子命令：

| 命令    | 说明         |
| ------- | ------------ |
| history | 查看历史版本 |
| pause   | 暂停资源     |
| resume  | 恢复暂停资源 |
| status  | 查看资源状态 |
| undo    | 回滚版本     |

DaemonSet保证在每个Node上都运行一个容器副本，常用来部署一些集群的日志、监控或者其他系统管理应用。典型的应用包括：

日志收集，比如fluentd，logstash等
系统监控，比如Prometheus Node Exporter，collectd，New Relic agent，Ganglia gmond等
系统程序，比如kube-proxy, kube-dns, glusterd, ceph等

下面以Deployment “mysql”为例，对其进行升级/回滚。

```
# kubectl get deploy
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
mysql     1         1         1            1           18h

# kubectl rollout history deploy/mysql
deployments "mysql"
REVISION  CHANGE-CAUSE
1         <none>

# kubectl rollout pause  deploy/mysql
deployment.extensions/mysql paused

# kubectl rollout resume deploy/mysql
deployment.extensions/mysql resumed

```

升级：

```
# kubectl set image deploy/mysql mysql=mysql:5.7
deployment.extensions/mysql image updated

# kubectl rollout history deploy/mysql
deployments "mysql"
REVISION  CHANGE-CAUSE
1         <none>
2         <none>


# kubectl rollout status deploy/mysql
deployment "mysql" successfully rolled out

# kubectl rollout history deploy mysql --revision=2             #查看对应历史版本详情
deployments "mysql" with revision #2
Pod Template:
  Labels:	app=mysql
	pod-template-hash=2226664987
  Containers:
   mysql:
    Image:	mysql:5.7
    Port:	3306/TCP
    Host Port:	0/TCP
    Environment:
      MYSQL_ROOT_PASSWORD:	123456
    Mounts:	<none>
  Volumes:	<none>
```

回滚：

```
# kubectl rollout undo deploy mysql                 #回滚版本
deployment.extensions/mysql

# kubectl rollout history deploy/mysql
deployments "mysql"
REVISION  CHANGE-CAUSE
2         <none>
3         <none>


# kubectl rollout history deploy mysql --revision=3             
deployments "mysql" with revision #3
Pod Template:
  Labels:	app=mysql
	pod-template-hash=1962730642
  Containers:
   mysql:
    Image:	mysql:5.6
    Port:	3306/TCP
    Host Port:	0/TCP
    Environment:
      MYSQL_ROOT_PASSWORD:	123456
    Mounts:	<none>
  Volumes:	<none>

```

### scale

kubectl scale用于横向扩展，扩容或缩容 Deployment、ReplicaSet、Replication Controller或Job 中Pod数量。

scale可以指定多个前提条件，如：当前副本数量--current-replicas或资源版本--resource-version，进行伸缩比例设置前，系统会先验证前提条件是否成立。

例如，将mysql的副本数设置为3。

```
# kubectl get pod
NAME                     READY     STATUS    RESTARTS   AGE
mysql-5fb6c74b86-d9qzg   1/1       Running   0          9m

# kubectl scale --replicas=3 deploy/mysql
deployment.extensions/mysql scaled

# kubectl get pod
NAME                     READY     STATUS    RESTARTS   AGE
mysql-5fb6c74b86-4nr59   1/1       Running   0          3s
mysql-5fb6c74b86-d9qzg   1/1       Running   0          10m
mysql-5fb6c74b86-gwn9r   1/1       Running   0          3s
```

或者，将由“mysql-deploy.yaml”配置文件中指定的资源对象和名称标识的pod副本数设为3。

```
# kubectl scale --replicas=2 -f mysql-deploy.yaml
deployment.apps/mysql scaled

# kubectl get pod
NAME                     READY     STATUS    RESTARTS   AGE
mysql-5fb6c74b86-d9qzg   1/1       Running   0          14m
mysql-5fb6c74b86-gwn9r   1/1       Running   0          4m
```

### autoscale

kubectl autoscale自动设置在kubernetes集群中运行的pod数量（水平自动伸缩）。

指定Deployment、ReplicaSet或ReplicationController，并创建已经定义好资源的自动伸缩器。使用自动伸缩器可以根据需要自动增加或减少系统中部署的pod数量。

例如，使用Deployment “mysql”设定，使用默认的自动伸缩策略，指定目标CPU使用率，使其Pod数量在3到10之间。

```
# kubectl autoscale deploy mysql --min=3 --max=10
horizontalpodautoscaler.autoscaling/mysql autoscaled

# kubectl get horizontalpodautoscalers.autoscaling 
NAME      REFERENCE          TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
mysql     Deployment/mysql   <unknown>/80%   3         10        3          2m

# kubectl get pod
NAME                     READY     STATUS    RESTARTS   AGE
mysql-5fb6c74b86-4jl98   1/1       Running   0          2m
mysql-5fb6c74b86-d9qzg   1/1       Running   0          22m
mysql-5fb6c74b86-gwn9r   1/1       Running   0          12m

```

或者，使用Deployment “mysql”设定，使其Pod的数量介于1和10之间，CPU使用率维持在80%。

```
# kubectl delete horizontalpodautoscalers.autoscaling mysql             #先删除之前的autoscaling，否则提示已存在
horizontalpodautoscaler.autoscaling "mysql" deleted

# kubectl autoscale deploy mysql --max=10 --cpu-percent=80
horizontalpodautoscaler.autoscaling/mysql autoscaled

# kubectl get horizontalpodautoscalers.autoscaling mysql
NAME      REFERENCE          TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
mysql     Deployment/mysql   <unknown>/80%   1         10        3          35s
```

## 集群管理命令

下面将会简单介绍一下如下命令，与集群的管理相关：

| 命令         | 说明                            |
| ------------ | ------------------------------- |
| certificate  | 修改证书资源                    |
| cluster-info | 显示集群信息                    |
| top          | 显示资源(CPU/内存/存储)使用情况 |
| cordon       | 将node标记为不可调度            |
| uncordon     | 将node标记为可调度的            |
| drain        | 维护期间排除节点                |
| taint        | 更新一个或多个节点上的taint     |

### certificate

**kubectl certificate**用来修改证书资源。该命令不常用。

子命令：

| 命令    | 说明             |
| ------- | ---------------- |
| approve | 批准证书签名请求 |
| deny    | 拒绝证书签名请求 |

### cluster-info

**kubectl cluster-info**可以显示集群信息。

```
# kubectl cluster-info 
Kubernetes master is running at https://192.168.30.150:8443
Heapster is running at https://192.168.30.150:8443/api/v1/namespaces/kube-system/services/heapster/proxy
CoreDNS is running at https://192.168.30.150:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
kubernetes-dashboard is running at https://192.168.30.150:8443/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy
monitoring-grafana is running at https://192.168.30.150:8443/api/v1/namespaces/kube-system/services/monitoring-grafana/proxy
monitoring-influxdb is running at https://192.168.30.150:8443/api/v1/namespaces/kube-system/services/monitoring-influxdb/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

要进一步调试和诊断集群问题，可以使用 kubectl cluster-info dump 命令查看信息。

### top

**kubectl top**用于显示资源(CPU/内存/存储)使用情况。可用资源包括：node、pod。

例如，显示集群中node的资源使用情况。

```
# kubectl top node
NAME             CPU(cores)   CPU%      MEMORY(bytes)   MEMORY%   
192.168.30.129   117m         2%        3164Mi          15%       
192.168.30.130   125m         3%        4206Mi          26%       
192.168.30.128   180m         4%        4089Mi          20%       
192.168.30.150   576m         14%       4431Mi          22% 
```

或者，显示集群中pod的资源使用情况。

```
# kubectl top pod
NAME                     CPU(cores)   MEMORY(bytes)   
mysql-5fb6c74b86-4jl98   1m           465Mi           
mysql-5fb6c74b86-d9qzg   1m           465Mi           
mysql-5fb6c74b86-gwn9r   1m           460Mi
```

### cordon

**kubectl cordon**将node标记为不可调度的状态，这样就不会让新创建的pod在此node上运行。

例如，将192.168.30.130这个node标记为不可调度状态。

```
# kubectl get node
NAME             STATUS                     ROLES     AGE       VERSION
192.168.30.129   Ready                      node      10d       v1.11.6
192.168.30.130   Ready                      node      10d       v1.11.6
192.168.30.128   Ready,SchedulingDisabled   master    10d       v1.11.6
192.168.30.150   Ready,SchedulingDisabled   master    10d       v1.11.6

# kubectl get pod -o wide
NAME                     READY     STATUS    RESTARTS   AGE       IP            NODE             NOMINATED NODE
mysql-5fb6c74b86-4jl98   1/1       Running   0          1h        172.20.2.22   192.168.30.129   <none>
mysql-5fb6c74b86-d9qzg   1/1       Running   0          1h        172.20.2.21   192.168.30.129   <none>
mysql-5fb6c74b86-gwn9r   1/1       Running   0          1h        172.20.3.15   192.168.30.130   <none>

# kubectl cordon 192.168.30.130              #将node标记为不可调度状态
node/192.168.30.130 cordoned

# kubectl get node
NAME             STATUS                     ROLES     AGE       VERSION
192.168.30.129   Ready                      node      10d       v1.11.6
192.168.30.130   Ready,SchedulingDisabled   node      10d       v1.11.6                 #该node已经显示为SchedulingDisabled状态
192.168.30.128   Ready,SchedulingDisabled   master    10d       v1.11.6
192.168.30.150   Ready,SchedulingDisabled   master    10d       v1.11.6

# kubectl get pod -o wide
NAME                     READY     STATUS    RESTARTS   AGE       IP            NODE             NOMINATED NODE
mysql-5fb6c74b86-4jl98   1/1       Running   0          1h        172.20.2.22   192.168.30.129   <none>
mysql-5fb6c74b86-d9qzg   1/1       Running   0          1h        172.20.2.21   192.168.30.129   <none>
mysql-5fb6c74b86-gwn9r   1/1       Running   0          1h        172.20.3.15   192.168.30.130   <none>

```

可以看到，即使192.168.30.130这个node是不可调度状态，其下还是有pod在运行。

### uncordon

**kubectl uncordon**将node标记为可调度的状态。

下面，我们将192.168.30.130这个node恢复为可调度的状态。

```
# kubectl uncordon 192.168.30.130           #将node标记为可调度的状态
node/192.168.1.253 uncordoned

# kubectl get node
NAME             STATUS                     ROLES     AGE       VERSION
192.168.30.129   Ready                      node      10d       v1.11.6
192.168.30.130   Ready                      node      10d       v1.11.6
192.168.30.128   Ready,SchedulingDisabled   master    10d       v1.11.6
192.168.30.150   Ready,SchedulingDisabled   master    10d       v1.11.6
```

### drain

**kubectl drain**可以让node在维护期间排除节点。drain本意排水，意思是将出问题的node下的pod转移到其它node下运行。

下面新建deployment “nginx”，对192.168.30.130这个node进行drain。

```
# kubectl run nginx --image=nginx --expose --port=80 --replicas=5
service/nginx created
deployment.apps/nginx created

# kubectl get pod -o wide
NAME                     READY     STATUS    RESTARTS   AGE       IP            NODE             NOMINATED NODE
mysql-5fb6c74b86-4jl98   1/1       Running   0          3h        172.20.2.22   192.168.30.129   <none>
mysql-5fb6c74b86-d9qzg   1/1       Running   0          3h        172.20.2.21   192.168.30.129   <none>
mysql-5fb6c74b86-gwn9r   1/1       Running   0          3h        172.20.3.15   192.168.30.130   <none>
nginx-6f858d4d45-4r9b5   1/1       Running   0          24s       172.20.2.25   192.168.30.129   <none>
nginx-6f858d4d45-b98dj   1/1       Running   0          24s       172.20.2.24   192.168.30.129   <none>
nginx-6f858d4d45-m7q9m   1/1       Running   0          24s       172.20.3.18   192.168.30.130   <none>
nginx-6f858d4d45-q42l7   1/1       Running   0          24s       172.20.2.23   192.168.30.129   <none>
nginx-6f858d4d45-vmxq9   1/1       Running   0          24s       172.20.3.19   192.168.30.130   <none>

# kubectl drain 192.168.30.130 --ignore-daemonsets --delete-local-data                #排除192.168.30.130这个node
node/192.168.30.130 cordoned
WARNING: Ignoring DaemonSet-managed pods: kube-flannel-ds-amd64-mkxld; Deleting pods with local storage: metrics-server-75df6ff86f-dwphq, monitoring-grafana-c797777db-qtpsx
pod/monitoring-grafana-c797777db-qtpsx evicted
pod/nginx-6f858d4d45-vmxq9 evicted
pod/nginx-6f858d4d45-m7q9m evicted
pod/mysql-5fb6c74b86-gwn9r evicted
pod/metrics-server-75df6ff86f-dwphq evicted
pod/coredns-695f96dcd5-hc8hx evicted
pod/heapster-56c9dc749-t96kf evicted

# kubectl get pod -o wide
NAME                     READY     STATUS    RESTARTS   AGE       IP            NODE             NOMINATED NODE
mysql-5fb6c74b86-4jl98   1/1       Running   0          3h        172.20.2.22   192.168.30.129   <none>
mysql-5fb6c74b86-d9qzg   1/1       Running   0          3h        172.20.2.21   192.168.30.129   <none>
mysql-5fb6c74b86-h7f4j   1/1       Running   0          13s       172.20.2.26   192.168.30.129   <none>
nginx-6f858d4d45-4r9b5   1/1       Running   0          9m        172.20.2.25   192.168.30.129   <none>
nginx-6f858d4d45-5b2lv   1/1       Running   0          13s       172.20.2.28   192.168.30.129   <none>
nginx-6f858d4d45-b98dj   1/1       Running   0          9m        172.20.2.24   192.168.30.129   <none>
nginx-6f858d4d45-q42l7   1/1       Running   0          9m        172.20.2.23   192.168.30.129   <none>
nginx-6f858d4d45-zj2cv   1/1       Running   0          13s       172.20.2.27   192.168.30.129   <none>                #这里的pod全部运行在192.168.30.129上

# kubectl get node
NAME             STATUS                     ROLES     AGE       VERSION
192.168.30.129   Ready                      node      10d       v1.11.6
192.168.30.130   Ready,SchedulingDisabled   node      10d       v1.11.6
192.168.30.128   Ready,SchedulingDisabled   master    10d       v1.11.6
192.168.30.150   Ready,SchedulingDisabled   master    10d       v1.11.6

```

执行drain命令，发现这条命令做了两件事情:

- 设定此node为不可调度状态（cordon)
- evict（回收）了其上的三个pod

### taint 污点

kubectl taint用来更新一个或多个节点上的taint。该命令不常用。

节点亲和性是pod的一种属性（偏好或硬性要求），它使pod被吸引到一类特定的节点。taint 则相反，它使节点能够排斥一类特定的pod。

taint和toleration相互配合，可以用来避免pod被分配到不合适的节点上。每个节点上都可以应用一个或多个taint ，这表示对于那些不能容忍这些 taint 的 pod，是不会被该节点接受的。
如果将 toleration 应用于 pod 上，则表示这些 pod 可以（但不要求）被调度到具有匹配 taint 的节点上。

## 高级命令

| 命令    | 说明                                      |
| ------- | ----------------------------------------- |
| apply   | 通过文件名或标准输入(stdin)对资源进行配置 |
| patch   | 更新资源的字段                            |
| replace | 用文件名或标准输入替换资源                |
| wait    | 在一个或多个资源上等待一个条件            |
| convert | 将配置文件转换为不同的API Version         |

### apply

**kubectl apply**通过文件名或标准输入(stdin)对资源进行配置。支持JSON和YAML格式的描述文件。

以service “nginx”为例，先准备两个yaml文件。

```
# vim nginx-deploy.yaml 	
```

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx:1.14
        name: nginx
        ports:
        - containerPort: 80
```

```
# vim nginx-svc.yaml 
```

```
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  type: NodePort
  ports:
    - port: 80
      nodePort : 30001
  selector:
    app: nginx
```

```
# kubectl create -f nginx-deploy.yaml 
deployment.apps/nginx created

# kubectl create -f nginx-svc.yaml 
service/nginx created

# kubectl get svc
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.68.0.1      <none>        443/TCP        11d
nginx        NodePort    10.68.63.117   <none>        80:30001/TCP   1m
```

修改nginx-svc.yaml文件，将nodePort改为30002。

```
# grep nodePort nginx-svc.yaml 
      nodePort : 30002
      
# kubectl apply -f nginx-svc.yaml 
Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
service/nginx configured

# kubectl get svc
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.68.0.1      <none>        443/TCP        11d
nginx        NodePort    10.68.63.117   <none>        80:30002/TCP   5m
```

可以看到，nodePort已经变成了30002。通过apply，用户可以将resource的configuration使用source control的方式维护在版本库中。每次有更新时，将配置文件push到server，然后使用kubectl apply将更新应用到resource。kubernetes会在引用更新前将当前配置文件中的配置同已经应用的配置做比较，并只更新更改的部分，而不会主动更改任何用户未指定的部分。

### patch

**kubectl patch**用于更新资源的字段。当部分修改一些设定的时候patch非常有用。支持JSON和YAML格式。

这次以更改nginx版本为例。

```
# kubectl exec -it nginx-666486ddc5-q62w6 bash
root@nginx-666486ddc5-q62w6:/# nginx -v
nginx version: nginx/1.14.2
root@nginx-666486ddc5-q62w6:/# exit
```

```
# kubectl patch pod nginx-666486ddc5-q62w6 -p '{"spec":{"containers":[{"name":"nginx","image":"nginx:1.12"}]}}'
pod/nginx-666486ddc5-q62w6 patched

# kubectl exec -it nginx-666486ddc5-q62w6 bash
root@nginx-666486ddc5-q62w6:/# nginx -v
nginx version: nginx/1.12.2
```

可以看到，nginx的版本变成了1.12.2，而之前版本是1.14.2。不过需要注意的是，patch修改的是pod本身，而不是yaml文件，而且不会重新生成pod。

### replace

kubectl replace用文件名或标准输入替换资源。支持JSON和YAML格式。作用类似于apply，不同的是，apply不会删除原有resource，然后创建新的。apply直接在原有resource的基础上进行更新。同时kubectl apply还会resource中添加一条注释，标记当前的apply。类似于git操作。

还是以更改nginx版本为例。

```
# sed -i 's/nginx:1.14/nginx:1.15/g' nginx-deploy.yaml 

# cat nginx-deploy.yaml
```

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx:1.15
        name: nginx
        ports:
        - containerPort: 80
```

```
# kubectl replace -f nginx-deploy.yaml 
deployment.apps/nginx replaced

# kubectl get pod
NAME                     READY     STATUS        RESTARTS   AGE
nginx-666486ddc5-q62w6   0/1       Terminating   1          31m
nginx-c9bd9bc4-8hnbx     1/1       Running       0          10s

# kubectl get pod
NAME                   READY     STATUS    RESTARTS   AGE
nginx-c9bd9bc4-8hnbx   1/1       Running   0          1m

# kubectl exec -it nginx-c9bd9bc4-8hnbx bash
root@nginx-c9bd9bc4-8hnbx:/# nginx -v
nginx version: nginx/1.15.9
```

可以看到，nginx版本已经变成了1.15。此外，replace会重新生成pod并删除原pod。如果是更新label，原有标签的pod将会与更新label后的deploy断开联系，有新label的deploy将会创建指定副本数的新的pod，但是默认并不会删除原来的pod。

### wait

**kubectl wait**在一个或多个资源上等待一个条件。该命令不常用。

有以下选项：

```
--all-namespaces=false: 如果存在，列出所有名称空间中请求的对象。名称空间在当前即使使用--namespace指定上下文，也会忽略上下文。

--allow-missing-template-keys=true: 如果为真，则忽略模板中缺少字段或映射键时的任何错误的模板。仅适用于golang和jsonpath输出格式。

-f, --filename=[]: 标识资源。
    --for='': 等待的条件:[删除|条件=条件名称]。
    
-o, --output='': 输出格式之一:
json|yaml|name|template|go-template|go-template-file|templatefile|jsonpath-file|jsonpath。

-R, --recursive=true: 递归地处理-f，--filename中使用的目录。当您想要管理相关内容时，它在同一个目录中组织的清单非常有用。

-l, --selector='': 过滤选择器(标签查询),支持“=”、“==”和“!=”。(如 -l key1 = value1, key2 = value2)
    --template='': 模板字符串或模板文件路径，当-o=go-template，-o=go-template-file时使用。
    --timeout=30s: 放弃前等待的时间长度。0表示检查一次，不要等待，负的表示等一个星期。
```

### convert

**kubectl convert**转换配置文件为不同的API版本。支持YAML和JSON格式。

该命令将配置文件名，目录或URL作为输入，并将其转换为指定的版本格式，如果目标版本未指定或不支持，则转换为最新版本。

```
# kubectl convert -f nginx-deploy.yaml
```

```
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: nginx
  name: nginx
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: nginx
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx:1.15
        imagePullPolicy: IfNotPresent
        name: nginx
        ports:
        - containerPort: 80
          protocol: TCP
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
status: {}
```

## 设置命令

| 命令      | 说明                                      |
| --------- | ----------------------------------------- |
| label     | 更新资源的标签                            |
| annotate  | 更新资源的注解                            |
| ompletion | 输出指定shell的代码完成命令 (bash or zsh) |

### label

kubectl label用来更新（增加、修改或删除）资源上的 label（标签）。

label 必须以字母或数字开头，可以使用字母、数字、连字符、点和下划线，最长63个字符。
如果–overwrite 为 true，则可以覆盖已有的 label，否则尝试覆盖 label 将会报错。
如果指定了–resource-version，则更新将使用此资源版本，否则将使用现有的资源版本。

**增加标签：**

```
# kubectl label pod nginx-c9bd9bc4-8hnbx status=healthy
pod/nginx-c9bd9bc4-8hnbx labeled

# kubectl describe pod nginx-c9bd9bc4-8hnbx
Name:           nginx-c9bd9bc4-8hnbx
Namespace:      default
Node:           192.168.30.129/192.168.30.129
Start Time:     Wed, 06 Mar 2019 11:16:02 +0800
Labels:         app=nginx
                pod-template-hash=75685670
                status=healthy
```

**删除标签：**

```
# kubectl label pod nginx-c9bd9bc4-8hnbx status-
pod/nginx-c9bd9bc4-8hnbx labeled

# kubectl describe pod nginx-c9bd9bc4-8hnbx
Name:           nginx-c9bd9bc4-8hnbx
Namespace:      default
Node:           192.168.1.233/192.168.1.233
Start Time:     Wed, 06 Mar 2019 11:16:02 +0800
Labels:         app=nginx
                pod-template-hash=75685670
```

在标签名后跟“-”即可删除对应标签名的标签。

### annotate

kubectl annotate用来更新一个或多个资源的注释信息。

Annotations由key/value组成。目的是存储辅助数据，特别是通过工具和系统扩展操作的数据，更多介绍在这里。
如果–overwrite为true，现有的annotations可以被覆盖，否则试图覆盖annotations将会报错。
如果设置了–resource-version，则更新将使用此resource version，否则将使用原有的resource version。
用法和label有点类似。

**增加注释：**

```
# kubectl annotate pod nginx-c9bd9bc4-8hnbx description="running nginx"
pod/nginx-c9bd9bc4-8hnbx annotated

# kubectl describe pod nginx-c9bd9bc4-8hnbx
Name:           nginx-c9bd9bc4-8hnbx
Namespace:      default
Node:           192.168.1.233/192.168.1.233
Start Time:     Wed, 06 Mar 2019 11:16:02 +0800
Labels:         app=nginx
                pod-template-hash=75685670
Annotations:    description=running nginx

```

**删除注释：**

```
# kubectl annotate pod nginx-c9bd9bc4-8hnbx description-
pod/nginx-c9bd9bc4-8hnbx annotated

# kubectl describe pod nginx-c9bd9bc4-8hnbx
Name:           nginx-c9bd9bc4-8hnbx
Namespace:      default
Node:           192.168.1.233/192.168.1.233
Start Time:     Wed, 06 Mar 2019 11:16:02 +0800
Labels:         app=nginx
                pod-template-hash=75685670
Annotations:    <none>
```

在注释名后跟“-”即可删除对应注释名的注释。

### completion

**kubectl completion**输出指定shell的代码完成命令 (bash or zsh)。该命令可用于自动补全。该命令不常用。

在linux上，

```
# yum install -y bash-completion

# locate bash_completion
/usr/share/bash-completion/bash_completion

# source /usr/share/bash-completion/bash_completion

# source <(kubectl completion bash)
```

## 其它命令

| 命令          | 说明                                   |
| ------------- | -------------------------------------- |
| alpha         | 对应于alpha中特性的命令                |
| api-resources | 打印受支持的API资源                    |
| api-versions  | 打印支持的API版本                      |
| config        | 用来修改kubeconfig文件                 |
| plugin        | 用来运行命令行插件                     |
| version       | 打印当前上下文的客户机和服务器版本信息 |

### alpha

**kubectl alpha**是对应于alpha中特性的命令。该命令不常用。

用法：

```
kubectl alpha diff -f/--filename=
```

### api-resources

**kubectl api-resources**打印受支持的API资源。

```
# kubectl api-resources 
NAME                              SHORTNAMES   APIGROUP                       NAMESPACED   KIND
bindings                                                                      true         Binding
componentstatuses                 cs                                          false        ComponentStatus
configmaps                        cm                                          true         ConfigMap
endpoints                         ep                                          true         Endpoints
events                            ev                                          true         Event
limitranges                       limits                                      true         LimitRange
namespaces                        ns                                          false        Namespace
nodes                             no                                          false        Node
persistentvolumeclaims            pvc                                         true         PersistentVolumeClaim
persistentvolumes                 pv                                          false        PersistentVolume
pods                              po                                          true         Pod
podtemplates                                                                  true         PodTemplate
replicationcontrollers            rc                                          true         ReplicationController
resourcequotas                    quota                                       true         ResourceQuota
secrets                                                                       true         Secret
serviceaccounts                   sa                                          true         ServiceAccount
services                          svc                                         true         Service
```

### api-versions

**kubectl api-versions**打印支持的API版本。

```
# kubectl api-versions 
admissionregistration.k8s.io/v1beta1
apiextensions.k8s.io/v1beta1
apiregistration.k8s.io/v1
apiregistration.k8s.io/v1beta1
apps/v1
apps/v1beta1
apps/v1beta2
authentication.k8s.io/v1
authentication.k8s.io/v1beta1
authorization.k8s.io/v1
authorization.k8s.io/v1beta1
autoscaling/v1
autoscaling/v2beta1
batch/v1
batch/v1beta1
batch/v2alpha1
certificates.k8s.io/v1beta1
events.k8s.io/v1beta1
extensions/v1beta1
metrics.k8s.io/v1beta1
networking.k8s.io/v1
policy/v1beta1
rbac.authorization.k8s.io/v1
rbac.authorization.k8s.io/v1beta1
scheduling.k8s.io/v1beta1
storage.k8s.io/v1
storage.k8s.io/v1beta1
v1
```

### config

**kubectl config**用来修改kubeconfig文件。

子命令：

```
current-context     显示当前上下文
delete-cluster      从kubeconfig中删除指定的集群
delete-context      从kubeconfig中删除指定的上下文
get-clusters        显示kubeconfig中定义的集群
get-context         描述一个或多个上下文
rename-context      从kubeconfig文件重命名上下文。
set                 在kubeconfig文件中设置一个单独的值
set-cluster         在kubeconfig中设置一个集群条目
set-context         在kubeconfig中设置一个上下文条目
set-credentials     在kubeconfig中设置一个用户条目
unset               取消设置kubeconfig文件中的单个值
use-context         在kubeconfig文件中设置当前上下文
view                显示合并的kubeconfig设置或指定的kubeconfig文件
```

```
# kubectl config view

apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: REDACTED
    server: https://192.168.1.52:8443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: admin
  name: kubernetes
current-context: kubernetes
kind: Config
preferences: {}
users:
- name: admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
    
# kubectl config current-context 
kubernetes

# kubectl config get-clusters 
NAME
kubernetes
```

### plugin

**kubectl plugin**用来运行命令行插件。插件可以是不属于主要命令行发行版的子命令，甚至可以由第三方提供。该命令不常用。

### version

**kubectl version**打印当前上下文的客户机和服务器版本信息。

```
plugin
kubectl plugin用来运行命令行插件。插件可以是不属于主要命令行发行版的子命令，甚至可以由第三方提供。该命令不常用。

version
kubectl version打印当前上下文的客户机和服务器版本信息。
```

