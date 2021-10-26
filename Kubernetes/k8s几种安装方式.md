# k8s几种安装方式

参考链接：

[k8s部署实战](https://edu.csdn.net/course/detail/26967?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163525602416780261996524%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fcourse.%2522%257D&request_id=163525602416780261996524&biz_id=3&utm_medium=distribute.pc_search_result.none-task-course-2~course~first_rank_v2~rank_edu_v1-1-26967.first_rank_v2_rank_edu_v1&utm_term=rancher&spm=1018.2226.3001.4453)

- minikube
- kubeadm
- kubeasy
- rancher

## minikube

简单来说，就是 minikube 借助 VirtualBox 创建了名叫 Minikube VM 的虚拟机，然后在这个虚拟机中运行了一个单节点的 Kubernetes 集群 Minikube 利用本地虚拟机环境部署 Kubernetes，其基本架构如下图所示：

![img](Imag/c03a43e0731ca579d1844fb44269fd2fd257bfb3.jpeg)

## kubeadm

不推荐使用，部署起来很麻烦

## kubeasy

[github仓库地址](https://github.com/easzlab/kubeasz)

生产环境推荐使用

## rancher

[rancher中国](https://www.rancher.cn/)

[rancher中国文档](https://docs.rancher.cn/rancher2/)

生产环境推荐使用

