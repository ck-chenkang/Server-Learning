## 方法一 ： vi关闭不掉

```
vim /etc/inputrc 

# 取消下面这个注释，重启
set bell-style none
```

## 方法二：

        在使用VMware下Linux的时候 ，操作出错或按tab补全的时候老是会有“嘀嘀”的报警声音， 如何关闭?
    
        步骤：
    
        ① 关闭虚拟机；
    
        ②在找到目标操作系统的文件夹，用文本编辑器打开 *.vmx文件；
    
        ③在里加入下面一行代码：
    
                 mks.noBeep = "TRUE"
    
        ④重启虚拟机操作系统。

  
