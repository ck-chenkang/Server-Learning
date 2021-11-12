创建`docker-init.sh`文件

不包括`docker compose`的安装

```shell
#!/bin/bash
docker_version=18.06.3
docker_dir=/data/docker/data

ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
sudo echo 'LANG="en_US.UTF-8"' >> /etc/profile;source /etc/profile
yum -y  update
yum install -y conntrack ipvsadm ipset jq sysstat curl iptables libseccomp yum-utils device-mapper-persistent-data  lvm2 bash-completion git;
systemctl stop firewalld && systemctl disable firewalld
iptables -F && iptables -X && iptables -F -t nat && iptables -X -t nat && iptables -P FORWARD ACCEPT
swapoff -a
sed -i '/swap/s/^\(.*\)$/#\1/g' /etc/fstab
setenforce 0
service dnsmasq stop && systemctl disable dnsmasq
cat > /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
net.ipv4.ip_forward=1
vm.swappiness=0
vm.overcommit_memory=1
vm.panic_on_oom=0
fs.inotify.max_user_watches=89100
net.ipv4.neigh.default.gc_thresh1=4096
net.ipv4.neigh.default.gc_thresh2=6144
net.ipv4.neigh.default.gc_thresh3=8192
EOF
sysctl -p /etc/sysctl.d/kubernetes.conf
export docker_version=$docker_version
yum-config-manager --add-repo  http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo;
yum makecache all;
version=$(yum list docker-ce.x86_64 --showduplicates | sort -r|grep ${docker_version}|awk '{print $2}');
yum -y install --setopt=obsoletes=0 docker-ce-${version} docker-ce-selinux-${version};
systemctl enable docker
systemctl start docker
cat  <<EOF > /etc/docker/daemon.json
{
    "graph": "${docker_dir}",
    "exec-opts": ["native.cgroupdriver=cgroupfs"],
    "insecure-registries": ["0.0.0.0/0"],
    "oom-score-adjust": -1000,
    "log-driver": "json-file",
    "log-opts": {
    "max-size": "100m",
    "max-file": "3"
    },
    "max-concurrent-downloads": 10,
    "max-concurrent-uploads": 10,
    "bip":"172.24.0.1/24",
    "registry-mirrors": ["https://rfylamyd.mirror.aliyuncs.com","https://registry.docker-cn.com"],
    "storage-driver": "overlay2",
    "storage-opts": [
    "overlay2.override_kernel_check=true"
    ]
}
EOF
systemctl daemon-reload
systemctl restart docker
```

