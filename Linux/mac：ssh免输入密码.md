<font style="background-color: yellow">远程生成过ssh密码之后，就可以这样设置了</font>

有无默认端口号：
（1）默认端口号为22：ssh-copy-id -i ~/.ssh/id_rsa.pub user@ip
（2）指定端口号为2212：ssh-copy-id -i ~/.ssh/id_rsa.pub -p 2212 user@ip