# centos7安装timescaledb

pg version 12.11

[参考链接1](https://blog.51cto.com/u_15060549/4035302)

[rpm包下载地址](https://download.postgresql.org/pub/repos/yum/12/redhat/rhel-7.5-x86_64/)

[参考链接2](https://blog.csdn.net/weixin_41352552/article/details/124295964?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165829915616780366581006%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=165829915616780366581006&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~hot_rank-9-124295964-null-null.142^v32^down_rank,185^v2^control&utm_term=centos7%20%E5%AE%89%E8%A3%85timescaledb&spm=1018.2226.3001.4187)

[参考链接3](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-timescaledb-on-centos-7)

[如何升级timescaledb](https://chowdera.com/2022/188/202207070123376918.html)

先安装postgres，这里没什么

### 开始安装timescaledb

访问 https://download.postgresql.org/pub/repos/yum/12/redhat/rhel-7.5-x86_64/ 找到timescaledb插件

**注意：**上面的12代表着postgres的版本为12

postgres版本查看方法：psql --version

![image-20220720153341078](\Imag\image-20220720153341078.png)

```
cd ~
mkdir download
cd download

# 下载
wget --no-check-certificate  https://download.postgresql.org/pub/repos/yum/12/redhat/rhel-7.5-x86_64/timescaledb_12-1.7.0-1.rhel7.x86_64.rpm

# 这一步我也不知道有没有用，反正做了，不出错
cat > /etc/yum.repos.d/timescale_timescaledb.repo <<EOL      # 方式三
[timescale_timescaledb]
name=timescale_timescaledb
baseurl=https://packagecloud.io/timescale/timescaledb/el/7/\$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packagecloud.io/timescale/timescaledb/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
EOF
# 这一步一定要做
yum update -y

# 安装
yum install timescaledb_12-1.7.0-1.rhel7.x86_64.rpm -y
```

### 修改postgresql.conf

```
vi /var/lib/pgsql/12/data/postgresql.conf
```

在末尾添加:

```
shared_preload_libraries = 'timescaledb'
```

重启

```
systemctl restart postgresql-12.service
```

### 验证是否安装成功

```
su - postgres   # 切换到 postgres 用户。
-bash-4.2$ psql                     # 进入到 postgres 的命令行，即命令窗口。

postgres=# CREATE DATABASE timeseries;   # 创建数据库 timeseries
postgres=# \l                            # 查看数据库
postgres=# \c timeseries                 # 进入创建的数据库 timeseries


timeseries=# create extension timescaledb;                            # 方式一，添加 TimescaleDB 插件            
timeseries=# CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;      # 方式二，使用 TimescaleDB 扩展数据库
```

![image-20220720153856426](\Imag\image-20220720153856426.png)