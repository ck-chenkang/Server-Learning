# SVN使用教程

​                                            



### 文章目录

- - [前言](#_2)
  - [1、SVN简介](#1SVN_14)
  - [2、SVN仓库](#2SVN_32)
  - [3、SVN客户端](#3SVN_37)
  - [4、SVN基础操作](#4SVN_48)
  - [5、撤销和恢复](#5_78)
  - [6、添加忽略](#6_94)
  - [7、解决冲突](#7_102)
  - [8、分支](#8_115)
  - [9、代码暂存](#9_150)



## **前言** 

又是一年毕业季，不少小伙伴纷纷入职，我也找到了理想的工作。

正式进入公司后并不会像我们自学时自己一个人随心所欲地写代码，需要我们和同事进行协同开发，此时**代码管理工具**是必不可少的，目前常用的两款工具是：SVN 和 Git，今天我们就来学习一下[SVN](https://so.csdn.net/so/search?q=SVN&spm=1001.2101.3001.7020)的使用！

该技术博客是关于B站SVN视频教程的笔记总结，希望能为大家带来帮助，视频链接如下：

https://www.bilibili.com/video/BV1k4411m7mP?p=5&share_source=copy_web

> ***相关文章推荐***：
>
> - [Git/Github操作指南](https://blog.csdn.net/weixin_46594796/article/details/113102610)

## **1、SVN简介** 

SVN是什么

- 代码版本管理工具
- 它能记住你每一次的代码修改
- 查看所有的修改记录
- 恢复到任何历史版本
- 恢复已经删除的文件

SVN相比于Git的优势

- SVN使用简单，上手快
- 目录级权限控制，企业安全必备
- 子目录Checkout，减少不必要的文件检出

主要应用场景

- 开发人员用来做代码的版本管理工具
- 用来存储一些重要的文件，比如合同
- 公司内部文件共享，并且能按照目录划分权限

## **2、SVN仓库** 

仓库推荐使用：SVN桶，目前最好用的SVN服务，网址如下：

https://svnbucket.com

## **3、SVN客户端** 

客户端推荐使用：TortoiseSVN，安装方式如下：

1. 打开网址https://svnbucket.com，注册登录账号
2. 点击下载SVN客户端
    ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703154044821.png)
3. 点击官网下载
    ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703154149469.png)
4. 点击按钮，就自动进行下载了
    ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\2021070315425018.png)
5. 下载完成后，进行安装，无脑下一步就安装成功了（可以选择安装路径）
    ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703154812807.png)

## **4、SVN基础操作** 

首先我们需要创建一个SVN项目：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703155855479.png)

------

然后我们在桌面上创建文件夹：workspace
 进入到workspace文件夹中，鼠标单击右键，单击SVN Checkout…
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704110205828.png)
 创建一个需要检出的文件夹：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703160532700.png)
 接着，填写刚刚注册时候的用户名和密码：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703160811359.png)
 此时，svnbucket文件夹中的文件（代码）都可以提交到**服务端**
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\202107031636394.png)
 我们在该文件夹中添加两个txt文件，鼠标右键，单击SVN Commit…进行提交
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704110527850.png)

![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703164344817.png)
 提交之后就可以到SVN仓库中查看提交的内容了：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703164833355.png)

------

提交操作演示完毕后，也可以对提交的文件内容进行修改，首先我将xzb.txt文件中的内容进行修改，此时文件就会变红：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703165335493.png)
 然后在文件所在页面鼠标右键，单击SVN Commit…（提交之前单击SVN Update先进行更新，这样可以**避免冲突**）
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703165804109.png)
 此时我们去SVN仓库查看xzb.txt文件，发现内容修改成功！

## **5、撤销和恢复** 

**撤销操作第一种情况**：首先我们将xzb.txt内容进行修改，文件就变成红色的，此时如果我们想撤销刚刚的修改操作，可以直接在修改的文件上鼠标右键，单击 TortoiseSVN——>Revert… 就可以撤销了！
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704111116714.png)

------

**撤销操作第二种情况**：我们将错误的内容提交到仓库中了，此时我们想要撤销，需要先打开日志信息：鼠标右键——>TortoiseSVN——>Show Log
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\2021070411130797.png)

![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703173217979.png)
 此时这次撤销操作只是在本地撤销，还需要**提交**到服务端，这样才算真正撤销成功了！

------

**撤销操作第三种情况**：我们还可以将提交的错误代码撤销到指定的版本，比如我们想从版本6撤销到版本4，就可以**选中版本4**，鼠标右键，单击Revert to this revision就本地撤销了，最后需要再次提交才能成功：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703175720934.png)

## **6、添加忽略** 

有些时候，我们不是所有文件都想要进行提交，此时我们就可以对不想提交的文件**添加忽略**

我们接下来对zyt.txt文件添加忽略。首先需要选中文件，鼠标右键，点击TortoiseSVN——>Unversion and add to ignore list——>zyt.txt，此时zyt.txt文件上多了个❌标志，说明该文件被忽略了。然后我们进行提交就发现SVN仓库中没有zyt.txt文件了：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704111710514.png)

上述添加忽略的方式同时也是**删除忽略**的方式，如果想要将忽略属性删除那就再次执行上述操作！

## **7、解决冲突** 

什么情况容易发生冲突？

- 多人修改同一文件同一行
- 无法进行合并的二进制文件

怎么避免冲突？

- 经常update同步他人的代码
- 二进制文件不要多个人同时操作

如何解决冲突？（由于该过程需要两台电脑，且很难文字记录，所以提供视频链接）

https://www.bilibili.com/video/BV1k4411m7mP?p=5&spm_id_from=pageDriver

## **8、分支** 

什么时候需要开分支

- 隔离线上版本和开发版本
- 大功能开发，不想影响别人，自己独立开个分支进行开发

SVN经典目录结构

- trunk：主干
- branches：分支
- tags：标签

------

首先我们在文件夹中创建上述经典目录结构（3个文件夹），将代码文件放到trunk文件夹中，加入我们的主干开发已经完成，准备上线了，我们就可以开个线上版本分支。选中trunk文件夹，鼠标右键，单击TortoiseSVN——>Branch/tag，然后按照下图操作就创建好分支了：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704112308118.png)
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210703195310124.png)
 此时我们更新一下，就会发现branches中出现了分支，接着我们把onlinev1.0和trunk文件**重新检出**到workspace文件夹中，鼠标右键查看属性就能得到这两个文件的URL：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704092658371.png)
 然后根据URL 检出SVN Checkout… 到workspace文件夹下，将svnbucket文件夹删除后，我们只有一个主干和一个分支：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704093101278.png)
 此时主干和分支的修改操作，相互之间并没有影响！

在这里我们的svnbucket-onlinev1.0是线上版本，线上版本出现bug我们就对其进行修改提交，这样对主干没有任何影响。

如果我们想把线上的bug修复操作**合并**到主干上，就需要将鼠标移动到线上版本，鼠标右键——>TortoiseSVN——>Show log，选中刚刚修改的版本：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704094326359.png)
 将此版本合并到**svnbucket-trunk**，这样就合并完成了！

------

接下来我们再创建一个onlinev2.0分支文件，演示一下**如何切换分支**，选中svnbucket-trunk文件
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704095900778.png)
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704100201108.png)
 此时另一个分支创建完成了，接下来我们从1.0分支切换到2.0分支：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704100418267.png)
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704100701123.png)

## **9、代码暂存** 

需要使用**代码暂存**的场景：

- 代码修改了很多，突然需要紧急修复一个bug，但是代码并没有写完，不能提交
- 代码重构了很多，突然需要发布新版本，但是代码还跑不起来，不能提交

------

接下来我将文件内容进行修改，然后将文件暂存起来：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\2021070410232562.png)
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704102848111.png)
 **取消暂存**的方式也很简单：
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\2021070410333490.png)
 ![在这里插入图片描述](E:\codes\Server-Learning\SVN\Imag\20210704103444274.png)