# ssh免密登录

# ssh免密码输入登录服务器（精简命令行登录）

每次ssh登录服务器都要输入一串字符，还要输入密码，很是麻烦。

如比：

```shell
ssh username@192.168.1.100 

ssh username@domain.com 

ssh username@domain.com -p 222
```

常用的登录命令形式，之后还需要输入密码验证。麻烦。如何才能简化呢。方法如下：

第一步：简化登录命令行

既要达到这么一个效果，即：

```shell
ssh 100 <=等效于=> ssh username@192.168.1.100

ssh one <=等效于=> ssh username@domain_one.com

ssh two <=等效于=> ssh username@domain.com_two -p 222
```

如何设置呢？很简单，方法如下：修改~/.ssh/config （如果没有.ssh或者config，就新建一个）

```shell
test@ubuntu:~$ cd .ssh/
test@ubuntu:~/.ssh$ cat config
Host 100

vis      HostName 192.168.1.100

vis      Port 22

vis      User username

Host one

      HostName domain_one.com

vis      Port 22

vis      User username

Host two

vis     HostName domain_two.com

vis     Port 222

vis     User username
```

保存后，输入：ssh 100 就可以等了服务器了，但是还是需要输入密码。

第二步：实现免密码登录

ssh常用公钥和私钥的方式实现免密码登录，在你安装ssh后，自带了一个ssh-genkey的工具生成公钥和私钥。

设置方法如下：

```shell
test@ubuntu:~$
test@ubuntu:~$ cd .ssh/
test@ubuntu:~/.ssh$
test@ubuntu:~/.ssh$ ls
config
test@ubuntu:~/.ssh$
test@ubuntu:~/.ssh$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/yaolan/.ssh/id_rsa): id_rsa (输入保存的文件名称)
Enter passphrase (empty for no passphrase): （输入Enter键）
Enter same passphrase again: （输入Enter键）
Your identification has been saved in id_rsa.
Your public key has been saved in id_rsa.pub.
The key fingerprint is:
14:b5:e4:73:1a:c7:95:d1:f4:86:3e:0c:6d:6e:cc:ef yaolan@VirtualBox
The key's randomart image is:
+--[ RSA 2048]----+
|    ..o  o=.|
|     + o o..o|
|    . = = + o|
|    .  * O . |
|    S .  O |
|       . o |
|        .|
|        . |
|        E|
+-----------------+
test@ubuntu:~/.ssh$ ls
config id_rsa id_rsa.pub
```

id_rsa私钥，id_rsa.pub公钥，采用RSA加密形式。我们只要把 id_rsa.pub里面的公钥添加到服务器 `~./.ssh/`文件夹下的 authorized_keys文件中就可以了，

完成这步，我们就可以免密码等了

总结：做完第一步和第二步后，输入 ssh 100就可以直接登录服务器了。如下：

```shell
test@ubuntu:~$ ssh 100
Welcome to Ubuntu 14.04.4 LTS (GNU/Linux 4.2.0-35-generic x86_64)

 \* Documentation: https://help.ubuntu.com/

191 packages can be updated.
108 updates are security updates.

New release '16.04.1 LTS' available.
Run 'do-release-upgrade' to upgrade to it.

Last login: Tue Nov 1 14:44:36 2016 from 192.168.1.120
username@Server:~$
username@Server:~
```

备注：私钥要保护好，注意它的权限。其他帐号在获取你的私钥后，可以通过你的帐号免密码等了服务器。

 同样你可以把公钥上传到其他服务器，这样用同一个私钥就可以登录多台服务器了。

原文链接：https://blog.csdn.net/u011774239/article/details/52995411

## 补充的简单方法

上述方法生成自己对应的密钥文件之后，可以采用 `ssh-copy-id username@remote-server`来将你的公钥上传到你要免密登录的服务器上就可以了，如果不是默认的22端口进行登录，可以在后面加上 `-p 端口号`来进行上传，运行上述命令后需要输入登录账户的密码，例子如下：

```bash
 ssh-copy-id lwl@23.45.173.88 -p 2061
```