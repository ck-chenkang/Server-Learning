本人idea 版本为 2021.1，顺利编译 thingsboard 打开进行源码阅读时，发现报 Cannot resolve symbol 'TransportProtos'，如下图：



![img](E:\codes\Server-Learning\thingsboard\错误处理\Imag\27733304-fa187131f3e54a4c.png)



解决方式：打开idea菜单： **File->setting->plugins** 搜索 proto*, 安装 `protocol Buffer Linter`插件, 并重启

![img](E:\codes\Server-Learning\thingsboard\错误处理\Imag\27733304-0422369b3861ac0a.png)

image.png



重启后，又出一个问题：



```css
 The file size(3.67 MB) exceeds the configured limit(2.56 MB). Code insight features are not available
```

如图：



![img](E:\codes\Server-Learning\thingsboard\错误处理\Imag\27733304-36e9a6a7802baecc.png)

image.png

解决方式：
打开idea 的路径，找到 bin 下的 **idea.properties 配置文件**， 记事本打开，搜索 `idea.max.intellisense.filesize`将值修改更大一些, 再重启idea



```bash
# Maximum file size (in KiB) IDE should provide code assistance for.
# The larger file is the slower its editor works and higher overall system memory requirements are
# if code assistance is enabled. Remove this property or set to very large number if you need
# code assistance for any files available regardless of their size.
#---------------------------------------------------------------------
idea.max.intellisense.filesize=5000
```

![img](E:\codes\Server-Learning\thingsboard\错误处理\Imag\27733304-83751b89a4417430.png)