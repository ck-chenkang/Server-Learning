# vscode调试thingsboard前端程序



![image-20220826095759015](Imag/image-20220826095759015.png)

![image-20220826095818622](Imag/image-20220826095818622.png)

修改需要调试的前端路由

![image-20220826095851218](Imag/image-20220826095851218.png)

```json
{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
  {
    "name": "Launch Chrome",
    "request": "launch",
    "type": "chrome",
    "url": "http://localhost:4200",
    "webRoot": "${workspaceFolder}"
  }
  ]
}
```

启动thingsboard

![image-20220826095945164](Imag/image-20220826095945164.png)

等待启动完成，关掉npm start命令里面自动打开的浏览器窗口

按F5，vscode会自动为我们打开一个浏览器窗口

![image-20220826100303571](Imag/image-20220826100303571.png)

打个断点

![image-20220826100341120](Imag/image-20220826100341120.png)

![image-20220826100356740](Imag/image-20220826100356740.png)

![image-20220826100427977](Imag/image-20220826100427977.png)