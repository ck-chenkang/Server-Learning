# 操作zip

`yum install -y unzip zip`

```
解压文件
unzip test.zip 				->将test.zip解压到当前文件下
unzip -n test.zip -d /tmp 	->将test.zip解压到/tmp目录下，并且不要覆盖已有文件
unzip -v test.zip			->查看test.zip内容，但不解压
unzip -o test.zip -d tmp/	->将test.zip解压到/tmp目录下，并且覆盖已有文件


压缩文件
zip 文件名.zip 文件夹名称或文件名称
```

