# vSphere ESXI 7.0部署详细安装指南，奶妈级安装教程(附镜像下载)

[原文](https://blog.csdn.net/qiaohewei/article/details/107748938?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164983893316780366554454%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=164983893316780366554454&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-107748938.142^v7^pc_search_result_control_group,157^v4^control&utm_term=esxi&spm=1018.2226.3001.4187)

### 本文将展示使用原始ISO镜像文件安装vSphere ESXI 7.0所需的所有步骤

1.下载ESXi7.0镜像并刻盘，可参考下方文章进行引导盘刻录

**镜像文件请点击下方链接下载**

[vSphere ESXI 7.0镜像 Rufus U盘安装盘制作(Windows)](https://blog.qiaohewei.cc/2020/07/29/esxi7_install_disk/)

[vSphere ESXI 7.0镜像 U盘安装盘制作(macOS)](https://blog.qiaohewei.cc/2020/07/30/esxi7_install_disk_macos/)

2.设备使用U盘引导启动，进入引导界面，默认选择第一项开始进入系统安装流程

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200368.png)

3.系统加载安装文件，等待[进度条](https://so.csdn.net/so/search?q=进度条&spm=1001.2101.3001.7020)完成

![ESXI7.0部署安装步骤](Imag/format,png-20220413164159968.png)

4.加载VMkerne文件，此屏幕会显示设备的CPU和[内存](https://so.csdn.net/so/search?q=内存&spm=1001.2101.3001.7020)配置信息

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200305.png)

5.所有文件加载完成后会出现欢迎语，按【Enter】开始安装[VMware](https://so.csdn.net/so/search?q=VMware&spm=1001.2101.3001.7020) ESXi 7.0

![ESXI7.0部署安装步骤](Imag/format,png-20220413164159870.png)

6.系统出现安装许可信息界面，选择【F11】接受“Accept and Continue”，接受许可协议，进入下一步安装；

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200423.png)

7.提示选择安装VMware ESXi 使用的存储，ESXi支持U盘以及SD卡安装，如系统中存在多块存储设备，选择需要安装系统的磁盘；。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200159.png)

8.如果原服务器安装有其他ESXi版本，则根据需求选择安装方式。

1）升级Esxi，保留VMFS数据存储

2）安装Esxi，保留VMFS数据存储

3）安装Esxi，覆盖VMFS数据存储(全新安装，将清除所有磁盘数据)

选择磁盘后的确认页面，确认会覆盖磁盘上原本存在的内容，按【Enter】下一步。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200159-9839320.png)

9.提示选择键盘类型，默认“US Default”，按【Enter】继续。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200168.png)

10.配置管理员密码（默认用户为root）。

[ROOT密码要求]

默认情况下，创建密码时，必须混合使用以下四个字符类的字符：小写字母，大写字母，数字和特殊字符，例如下划线或破折号，对于ESXi的默认密码策略，这是一项硬性要求。

- - 默认情况下，密码长度大于7且小于40个字符。
  - 密码必须包含至少三个字符类的字符。（大写字符（AZ），小写字符（az），数字（0-9），特殊字符（〜！@ ＃$％^＆* _- + =`| \（）{} [] :;”'< >，。？/）
  - 具有三个字符类字符的密码必须至少七个字符长。
  - 具有所有四个字符类别的字符的密码必须至少七个字符长。
  - 密码开头的大写字符不会计入所使用的字符类数量。
  - 以密码结尾的数字不会计入所使用的字符类数量。

输入第一个密码后，按【下】键 输入确认密码。

![ESXI7.0部署安装步骤](Imag/format,png.png)

11.确认安装，此页面会显示已经选择的磁盘信息，确认无误后，按【F11】进行系统安装。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200554.png)

12.系统开始安装ESXI7.0跑进度条，安装时间视服务器性能决定。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164159717.png)

13.系统安装完成，保持第一项默认并按【Enter】重启设备。

1）Remove the installation media before rebooting：重新启动前请移除安装介质，然后按Enter以重新启动计算机。

2）Reboot the server to start using ESXI x.x.x：重新启动服务器以开始使用ESXI。

默认第一项会自动移除挂载的ISO设备，如果选择了第二选项，需要你手动进行卸载设备，否则会再次从ISO 设备启动。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200162.png)

14.服务器重启完成后，进入VMware ESXi 7.0 控制台屏幕。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200392.png)

15.按【F2】输入root用户密码进入系统配置页。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164159857.png)

16.选择“【Configure Management Network】”选项，配置管理网络。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200170.png)

17.如果设备有多个物理网络接口，选择“【Network Adapters】”选项，配置管理网口。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200558.png)

 

18.使用键盘“上”、“下”键选择当管理界面的网络接口，使用空格选中，选中后接口名称前为[X]，选择后按【Enter】。

如何确认网络端口(如何区分网卡顺序)

将有效网络电缆依次插入网口中，如果网卡Status(状态)变为Connected(已连接)，则该网口为对应网线的接口，根据需求选择即可。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164159984.png)

19.配置管理接口IP地址，请选择【IPv4 Configuration】，IPV4配置选项。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200736.png)

 

20.选择“set static IPV4 address and network conf iguration:”设置静态IPV4地址和网络配置，配置完成后按【Enter】。

填写规划好的IP地址、子网掩码、网关信息，配置需与路由在同一网段，否则将无法访问ESXI

![ESXI7.0部署安装步骤](Imag/format,png-20220413164159915.png)

 

21.配置完成后，按【ESC】退出网络配置，按【Y】保存配置并重启网络。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164200560.png)

22.完成ESXI IP配置后可以在VMware ESXi 7.0 控制台屏幕看到所配置的网络信息。

![ESXI7.0部署安装步骤](Imag/format,png-20220413164159699.png)

访问ESXI

根据控制台屏幕显示的管理地址使用浏览器访问即可管理ESXI

![ESXI7.0部署安装步骤](Imag/format,png-20220413164159915.png)

 

![img](Imag/format,png-20220413164159988.png)

### 至此，ESXI7.0安装完成，Enjoy~