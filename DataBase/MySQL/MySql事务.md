<!-- vscode-markdown-toc -->
* 1. [ 事务的定义：](#)
* 2. [ 事务的四大特整(ACID)：](#ACID)
* 3. [ 关于事务的一些术语：](#-1)
* 4. [ 和事务相关的两条重要的SQL语句(TCL)](#SQLTCL)
* 5. [ 事务开启的标志？事务结束的标志？](#-1)
	* 5.1. [开启标志](#-1)
	* 5.2. [结束标志（提交或者回滚）](#-1)
* 6. [ 事务与数据库底层数据：](#-1)
* 7. [ MySQL中，事务提交与回滚](#MySQL)
* 8. [事务四大特性之一：隔离性](#-1)
	* 8.1. [read uncommitted](#readuncommitted)
	* 8.2. [read committed](#readcommitted)
	* 8.3. [repeatable read](#repeatableread)
	* 8.4. [serializable](#serializable)
* 9. [隔离级别与一致性关系](#-1)
* 10. [设置事务隔离级别](#-1)
* 11. [隔离级别的作用范围围](#-1)
* 12. [查看隔离级别别](#-1)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

# MySql事务
参考链接[MySql事务详解](https://blog.csdn.net/w_linux/article/details/79666086)
##  1. <a name=''></a> 事务的定义：
    - Transaction
    - 事务：一个最小的不可再分的工作单元；通常一个事务对应一个完整的业务(例如银行账户转账业务，该业务就是一个最小的工作单元)
    - 一个完整的业务需要批量的DML(insert、update、delete)语句共同联合完成
    - 事务只和DML语句有关，或者说DML语句才有事务。这个和业务逻辑有关，业务逻辑不同，DML语句的个数不同

##  2. <a name='ACID'></a> 事务的四大特整(ACID)：
    - 原子性（A）：事务的最小单位，不可再分
    - 一致性（C）：事务要求所有的DML语句操作的时候，必须保证同时成功或者失败
    - 隔离性（I）：事务A和事务B之间具有隔离性
    - 持久性（D）：是事务的保证，事务中介的标志（内存的数据持久到硬盘文件中）

##  3. <a name='-1'></a> 关于事务的一些术语：
    - 开启事务：Start Transaction
    - 事务结束：End Transaction
    - 提交事务：Commit Transaction
    - 回滚事务：Rollback Transaction

##  4. <a name='SQLTCL'></a> 和事务相关的两条重要的SQL语句(TCL)
    - commit:提交
    - rollback：回滚

##  5. <a name='-1'></a> 事务开启的标志？事务结束的标志？

###  5.1. <a name='-1'></a>开启标志
    任何一条DML语句(insert、update、delete)执行，标志事务的开启
###  5.2. <a name='-1'></a>结束标志（提交或者回滚）

    -  提交：成功的结束，将所有的DML语句操作历史记录和底层硬盘数据来一次同步
    -  回滚：失败的结束，将所有的DML语句操作历史记录全部清空

##  6. <a name='-1'></a> 事务与数据库底层数据：
    在事物进行过程中，未结束之前，DML语句是不会更改底层数据，只是将历史操作记录一下，在内存中完成记录。只有在事物结束的时候，而且是成功的结束的时候，才会修改底层硬盘文件中的数据

##  7. <a name='MySQL'></a> MySQL中，事务提交与回滚
    在MySQL中，默认情况下，事务是自动提交的，也就是说，只要执行一条DML语句就开启了事务，并且提交了事务

```sql
start transaction;
update tb_account set balance=200 where accid='1111';
update tb_account set balance=400 where accid='2222';
commit;
```

```sql
start transaction;
update tb_account set balance=200 where accid='1111';
update tb_account set balance=400 where accid='2222';
commit; -- 提交才能改变
rollback;  -- 撤销
```
    提交和回滚的用法：先提交，要是有错误，然后回滚

##  8. <a name='-1'></a>事务四大特性之一：隔离性

1. 事务A和事务B之间具有一定的隔离性
2. 歌灵性有四个隔离级别：
   1. 读未提交（read uncommitted）
   2. 读已提交（read committed）
   3. 可重复读（repeatable read）
   4. 串行化（serializable）

###  8.1. <a name='readuncommitted'></a>read uncommitted

   - 事物A和事物B，事物A未提交的数据，事物B可以读取到
   - 这里读取到的数据叫做“脏数据”
   - 这种隔离级别最低，这种级别一般是在理论上存在，数据库隔离级别一般都高于该级别

###  8.2. <a name='readcommitted'></a>read committed

   - 事物A和事物B，事物A提交的数据，事物B才能读取到
   - 这种隔离级别高于读未提交
   - 换句话说，对方事物提交之后的数据，我当前事物才能读取到
   - 这种级别可以避免“脏数据”
   - 这种隔离级别会导致“不可重复读取”
   - Oracle默认隔离级别

###  8.3. <a name='repeatableread'></a>repeatable read

   - 事务A和事务B，事务A提交之后的数据，事务B读取不到
   - 事务B是可重复读取数据
   - 这种隔离级别高于读已提交
   - 换句话说，对方提交之后的数据，我还是读取不到
   - 这种隔离级别可以避免“不可重复读取”，达到可重复读取
   - 比如1点和2点读到数据是同一个
   - MySQL默认级别
   - 虽然可以达到可重复读取，但是会导致“幻像读”

###  8.4. <a name='serializable'></a>serializable

   - 事务A和事务B，事务A在操作数据库时，事务B只能排队等待
   - 这种隔离级别很少使用，吞吐量太低，用户体验差
   - 这种级别可以避免“幻像读”，每一次读取的都是数据库中真实存在数据，事务A与事务B串行，而不并发

##  9. <a name='-1'></a>隔离级别与一致性关系

 隔离级别 | 脏数据 |不可重复读 | 幻象读  
 :-------: | :------:| :----: | :----: 
 读未提交| 读已提交 |  可能 |   可能
 读已提交|不可能 | 可能 |  可能
 可重复读|不可能 |不可能| 对InnoDB不可能
 串行化  |  不可能  |  不可能  |  不可能

##  10. <a name='-1'></a>设置事务隔离级别

##  11. <a name='-1'></a>隔离级别的作用范围围

##  12. <a name='-1'></a>查看隔离级别别








    
