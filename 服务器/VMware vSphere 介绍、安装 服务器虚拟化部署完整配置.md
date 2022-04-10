# VMware vSphere 介绍、安装 服务器虚拟化部署完整配置

# **一 ，VMware vSphere**

# **什么是VMware vSphere？**

为业务敏捷性释放强大，灵活且安全的基础，加速您向混合云的数字化转型。vSphere是业界领先的服务器虚拟化软件，是现代SDDC的核心，可帮助您在跨云的通用操作环境中运行，管理，连接和保护应用程序。

新的高级安全功能完全集成到虚拟机管理程序中，并由机器学习提供支持，可为安全事件提供更好的可见性，保护和响应时间。借助vSphere，您可以支持新的工作负载和用例，同时满足不断增长的基础架构需求和复杂性。

# **VMware vSphere 部署的前期规划要点**

#  **1 vSphere 的优点** 


使用 vSphere 虚拟化的服务器不仅非常稳定、可靠、安全，同时 VMware ESXi 虚拟化核心很少，
 可以安装在 1GB 的 U 盘上运行，并且在多年的运行时，除了产品版本升级以及必要的补丁更新外，
 VMware ESXi 虚拟化主机不需要重启—只要机房不停电、不升级，VMware ESXi 可以一直运行多年。

# **2 如何利用现在的设备架构虚拟化环境** 


在虚拟化过程中，用户大多会考虑目前现有的服务器、存储、交换机等基础设备是否可以使用，
 这需要根据服务器、存储的性能以及参数综合考虑。
 如果是近一、两年新购买的服务器，则考虑将这些服务器整合、扩充，用做虚拟化主机，一般
 来说大多数标配不高的服务器都能扩充到很高的配置。例如，IBM 3850 X6 服务器最大可以扩充到
 4 个 CPU、1.5TB 内存，以 CPU 为例，IBM 3850 X6 出厂标配 2 个 CPU，这 CPU 可以是 6 核、8 核，
 如果现有多台 IBM 3850 X6 服务器（例如 2 台或更多），可以将这 2 台的 CPU 放到其中一台，而另
 一台则可以新购 4 个 8 核的 CPU，同样，内存也可以集中到一台，另一台则配置多个单条 8GB 的内
 存，同样，对于其他厂家的服务器也可以这样处理，先进行多台整合，然后再进行服务器的升级。
 在虚拟化实施的过程中，如果使用现有的服务器，推荐优先为服务器添加内存、网卡，其次是
 配置冗余电源、CPU；至于硬盘，在虚拟化项目中，**优先是配置共享的存储**，其次是添加本地硬盘。
 除了做虚拟化主机外，还可以将原有的服务器改做存储服务器，例如，如果某服务器配置较低
 并且不具有升级的价值，但具有较多的本地硬盘时，可以将硬盘集中到某台服务器中，将这台服务
 器通过安装 openfiler（32 位或 64 位产品都有）或 Windows Server 2008 R2 或 Windows Server 2012，
 组成存储服务器，通过千兆网络为虚拟化环境提供 iSCSI 的网络存储，这些存储可以用来做数据备
 份或扩展。

# **3 服务器性能与容量规划** 


在实施虚拟化的前期，有一个虚拟机容量规划，就是一台物理服务器上，最大能放多少虚拟机。
 实际上这是一个综合的问题，即要考虑主机的 CPU、内存、磁盘（容量与性能），也要考虑运行的
 虚拟机需要的资源，在实际使用时，系统总有至少 30%甚至更高的富余容量，不可能让一个主机上
 的资源利用率超过 80%以致接近 100%，否则一旦达到这些数值，整个系统响应会比较慢。
 在估算虚拟化的容量时，在只考虑 CPU 的情况下，可以将物理 CPU 与虚拟 CPU 按照 1：4～1：
 10 甚至更高的比例规划，例如一台物理的主机具有 4 个 8 核心的 CPU，在内存、存储足够的情况下，
 按照 1：5 的比例，则可以虚拟出 4×8×5＝160 个 vcpu，假设每个虚拟机需要 2 个 vcpu，则可以
 创建 80 个虚拟机。在实际实施虚拟化的项目中，大多数虚拟机对 CPU 的要求并不是非常的高，即
 使为虚拟机分配了 4 个或更多的 CPU，但实际上该虚拟机的 CPU 使用率只有 10%以下，这时候所消
 耗的物理主机 CPU 资源不足 0.5 个。
 在虚拟化的项目中，对内存占用是最大、要求最高的，在实际使用中经常发现，物理主机的内
 存会接近 80%甚至 90%，因为在同一物理主机上，规划的虚拟机数量较多，而且每个虚拟机分配的
 内存又较大（总是超过该虚拟机实际使用的内存），所以会导致主机可用内存减少。在为物理主机
 配置内存时，要考虑将要在该主机上运行多少虚拟机、这些虚拟机一共需要多少内存，一般情况下，
 每个虚拟机需要的内存在 1GB～4GB 甚至更多，还要为 VMware ESXi 预留一部分内存。通常情况下，
 配置了 4 个 8 核心 CPU 的主机，一般需要配置 96GB 甚至更高的内存；在配置 2 个 6 核心 CPU 的主
 机，通常要配置 32～64GB 内存。

# **4 统计与计算现有服务器容量** 


如果要将现有的物理服务器迁移到虚拟机中，可以制作一张统计表这包括现有物理服务器的
 CPU 型号、数量、CPU 利用率、现有内存及内存利用率、现有硬盘数量、大小、RAID 及使用情况，
 然后根据这些来计算，计算方式为：
 实际 CPU 资源=该台服务器 CPU 频率×CPU 数量×CPU 使用率
 实际内存资源=该台服务器内存×内存使用率
 实际硬盘空间=硬盘容量-剩余空间
 假设经过计算，现在已经使用了 91.1944Ghz 的 CPU 资源，以 CPU 频率 3.0HzCPU 为例，则需要
 30 核心（负载 100%），但要考虑整体项目中 CPU 的负载率为 60%～75%，以及管理等其他开销，则
 至少需要 40 个 CPU 核心，如果配置 4 个 6 核心的服务器，则需要大约 4 台物理主机。至于内存，
 假设经计算现在已经使用了 182GB，加上管理以及富余，以 360GB 计算，每服务器 96GB～128GB 即
 可。

# **5 服务器虚拟化时的服务器选择** 


在实施虚拟化的过程中，如果现有服务器可以满足需求虚拟化需求，可以使用现有的服务器，
 如果现有服务器不能完全满足需求，可以部分采用现有服务器，然后再采购新的服务器。
 如果采购新的服务器，可供选择的产品比较多，如果单位机房在机柜存放，则优先采购机架式
 服务器，服务器采购的原则是：
 （1）如果 2U 的服务器能满足需求，则采用 2U 的服务器，通常情况下，2U 的服务器最大支持 、
 2 个 CPU，标配 1 个 CPU，在这个时候，就要配置 2 个 CPU。
 如果 2U 的服务器不能满足需求，则采用 4U 的服务器，通常情况下，4U 的服务器最大支持 4
 个 CPU 并标配 2 个 CPU，在购置服务器时，为服务器配置 4 个 CPU 为宜，如果对服务器的数量不做
 限制，采购两倍的 2U 服务器要比采购 4U 的服务器节省更多的资金，并且性能大多数也能满足需求。
 （2）CPU：在选择 CPU 时，选择 6 核或 8 核的 Intel 系列的 CPU 为宜，10 核或更多核心的 CPU
 较贵，不推荐选择，当然，单位对 CPU 的性能、空间要求较高时除外。
 （3）内存：在配置服务器的时候，近可能为服务器配置较大内存。在虚拟化项目中，内存比
 CPU 更重要。一般情况下，2 个 6 核心的 2U 服务器配置 64GB 内存，4 个 6 核心或 8 核心的 4U 服务
 器配置 128GB 或更多的内存。
 （4）网卡：在选择服务器的时候，还要考虑服务器的网卡数量，至少要为服务器配置 2 接口
 的千兆网卡，推荐 4 端口千兆网卡。
 （5）电源：近可能配置两个电源。一般情况下，2U 服务器选择 2 个 450W 的电源可以满足需
 求，4U 服务器选择 2 个 750W 电源可以满足需求。
 （6）硬盘：如果虚拟机保存在服务器的本地存储，而不是网络存储，则为服务器配置 6 个硬
 盘做 RAID5，或者 8 个硬盘做 RAID50 为宜。由于服务器硬盘槽位有限，故不能选择太小的硬盘，
 当前性价比高的是 600GB 的 SAS 硬盘，2.5 寸 SAS 硬盘转速是 10000 转，3.5 寸 SAS 硬盘转速为 15000
 转，选择 2.5 寸硬盘具有较高的 IOPS。
 至于服务器的品牌，则可以选择华为、IBM、HP 或 Dell，当对服务器占用空间有较高要求时，
 可以配置刀片服务器，例如华为 Tecal E6000 服务器，8U 的空间，可以最大配置 10 个刀片服务器，
 每个服务器可以配 2 个 CPU、2 个 SAS 硬盘、12 个内存插槽、双端口网卡。

# **6 存储设备的选择** 


在虚拟化项目中，推荐采用存储设备而不是服务器本地硬盘，在配置共享的存储设备时，只有
 虚拟机保存在存储时，才能快速实现并使用 HA、FT、vMotion 等技术。在使用 VMware vSphere 实
 施虚拟化项目时，一个推荐的作法是将 VMware ESXi 安装在服务器的本地硬盘上，这个本地硬盘可
 以是一个固态硬盘（5.2～10GB 即可），也可以是一个 SD 卡（配置 8GB 即可），甚至可以是 1GB 的 U
 盘，如果服务器没有配置本地硬盘，也可以从存储上为服务器划分 8～16GB 的分区用于启动。
 在选择存储设备的时候，要考虑整个虚拟化系统中需要用到的存储容量、磁盘性能、接口数量、
 接口的带宽。对于容量来说，整个存储设计的容量要是实际使用容量的 2 倍以上，例如，整个数据
 中心已经使用了 1TB 的磁盘空间（所有己用空间加到一起），则在设计存储时，要至少设计 2TB 的
 存储空间（是配置 RAID 之后而不是没有配置 RAID、所有磁盘相加的空间）。
 在存储设计中另外一个重要的参数是 IOPS (Input/Output Operations Per Second)，即每秒
 进行读写（I/O）操作的次数，多用于数据库等场合，衡量随机访问的性能，存储端的 IOPS 性能和
 主机端的 IO 是不同的，IOPS 是指存储每秒可接受多少次主机发出的访问，主机的一次 IO 需要多
 次访问存储才可以完成。例如，主机写入一个最小的数据块，也要经过“发送写入请求、写入数据、
 收到写入确认”等三个步骤，也就是 3 个存储端访问，每个磁盘系统的 IOPS 是有上限的，如果设
 计的存储系统，实际的 IOPS 超过了磁盘组的上限，则系统反应会变慢，影响系统的性能。简单来
 说，15000 转的磁盘的 IOPS 是 150，10000 转的磁盘的 IOPS 是 100，普通的 SATA 硬盘的 IOPS 大约
 是 70～80。一般情况下，在做桌面虚拟化时，每个虚拟机的 IOPS 可以设计为 3～5 个；普通的虚
 拟服务器 IOPS 可以规划为 15～30 个（看实际情况），当设计一个同时运行 100 个虚拟机的系统时，
 IOPS 则至少要规划为 2000 个，如果采用 10000 转的 SAS 磁盘，则至少需要 20 个磁盘，当然这只
 是简单的测算，在真正实施时需要考虑多方面的因素。
 在规划存储时，还要考虑存储的接口数量及接口的速度，通常来说，在规划一个具有 4 主机、
 1 个存储的系统中，采用具有 2 个接口器、4 个 SAS 接口的存储服务器是比较合适的，如果有更多
 的主机，或者主机需要冗余的接口，则可以考虑配 FC 接口的存储，并采用光纤交换机连接存储与
 服务器。

# **7 网络及交换机选择** 


在一个虚拟化环境里，每台物理服务器一般拥有更高的网卡密度，虚拟化主机有 6 个、8 个甚
 至更多的网络接口卡（NIC）是常见的，反之，没有被虚拟化的服务器只有 2 个或 4 个 NIC，这成
 为数据中心里的一个问题，因为边缘或分布交换机放在机架里，以简化网络布线，然后上联到网络
 核心，在这种解决方案里，一个典型的 48 端口的交换机仅能处理 4～8 台虚拟主机，为了完全添满
 机架，需要更多的边缘或分布交换机。
 在虚拟化环境里，当多个工作负荷整合到这些主机里时，根据运行在主机上的工作负荷数量，
 网络流量增加了，网络利用率将不再像过去每台物理服务器上那样低了。
 为了调节来自整合工作负荷增加的网络流量，可能需要增加从边缘或分布交换机到网络核心的
 上联数量，这时对交换机的背板带宽及上行线路就达到较高的要求。
 另一个关键的改变来自最新一代虚拟化产品的动态性质，拥有诸如热迁移和多主机动态资源管
 理。虚拟化里固有的动态更改性能意味着不能再对服务器之间的流量流动作任何假设。
 在进行虚拟机之间的动态迁移，或者将虚拟机从一个存储迁移到另一个存储时，为了减少迁移
 的时间，不对关键业务造成影响，在迁移期间会占用大量的网络资源，另外，在迁移的时候，虽然
 可以减少并发迁移的数量，但在某些应用中，可能会同时迁移多台虚拟机，这对交换机背板带宽以
 及交换机的性能的要求达到更高。
 另外，虚拟化使数据中心里网络层的一些能见度降低了，网络工程师在虚拟交换机里没有能见
 度，也不能轻松决定哪个物理 NIC 对应哪个虚拟交换机，这在故障检修中是最重要的信息，为了减
 少故障率，为交换机配置冗余的业务板及冗余电源也应该考虑，同时，在近可能的前提下，配置更
 高的交换机。
 在大多数的情况下，物理主机配置 4 端口千兆网卡，并且为了冗余，近可能是每两个网卡绑定
 在一起，用做负载均衡及故障转移。
 对于中小企业虚拟化环境中，为虚拟化系统配置华为 S5700 系列千兆交换机即可满足大多数的
 需求，华为 S5700 系列分 24 端口、48 端口两种，如果需要更高的网络性能，可以选择华为 S9300
 系列交换机，如果在虚拟化规划中，物理主机中的虚拟机只需要在同一个网段（或者在两个等有限
 的网段中），并且对性能要求不高但对价钱敏感的时候，可以选择华为的 S1700 系列普通交换机。
 无论是 VMware ESXi 还是 Hyper-V Server，都支持在虚拟交换机中划分 VLAN，即将主机网卡连接
 到交换机的 Trunk 端口、然后在虚拟交换机一端划分 VLAN，这样可以在只有一到两个物理网卡时，
 可以让虚拟机划分到所属网络中的不同 VLAN

VMware [vSphere](https://so.csdn.net/so/search?q=vSphere&spm=1001.2101.3001.7020)® 使用虚拟化将单个数据中心转换为包括 CPU、存储和网络资源的聚合计算基础架构。VMware vSphere 将这些基础架构作为一个统一的运行环境来管理，并为您提供工具来管理该环境中的数据中心。

VMware vSphere 堆栈包括虚拟化、管理和接口层。vSphere 的两个核心组件是 ESXi 和 vCenter Server。ESXi 虚拟化平台用于创建和运行[虚拟机](https://so.csdn.net/so/search?q=虚拟机&spm=1001.2101.3001.7020)和虚拟设备。vCenter Server 服务用于管理网络和池主机资源中连接的多个主机。

VMware vSphere 是业界领先且最可靠的虚拟化平台。vSphere将[应用程序](https://baike.baidu.com/item/应用程序/5985445)和[操作系统](https://baike.baidu.com/item/操作系统/192)从底层硬件分离出来，从而简化了 IT操作。您现有的[应用程序](https://baike.baidu.com/item/应用程序/5985445)可以看到专有资源，而您的服务器则可以作为[资源池](https://baike.baidu.com/item/资源池/4386889)进行管理。因此，您的业务将在简化但恢复能力极强的 IT 环境中运行。

VMware、vSphere、Essentials 和 Essentials Plus 套件专为工作负载不足 20 台服务器的 IT 环境而设计，只需极少的投资即可通过经济高效的服务器整合和[业务连续性](https://baike.baidu.com/item/业务连续性/5034951)为小型企业提供企业级 IT 管理。结合使用 vSphere Essentials Plus 与 vSphere Storage Appliance[软件](https://baike.baidu.com/item/软件/12053)，无需共享存储硬件即可实现[业务连续性](https://baike.baidu.com/item/业务连续性/5034951)。

vSphere 是VMware公司推出一套服务器虚拟化解决方案，目前的最新版本为6.7 。

外文名     VMware vSphere

属  性     虚拟化平台

核心组件    VMware ESXi 5.0.0

优  点      简化IT环境、提高服务级别等

 

 

## **核心组件**

vSphere5 中（取代原ESX）, ESXi与Citrix 的XenServer 相似，它是一款可以独立安装和运行在祼机上的系统，因此与其他我们以往见过的VMware Workstation 软件不同的是它不再依存于宿主操作系统之上。在ESXi安装好以后，我们可以通过vSphere Client 远程连接控制，在ESXi 服务器上创建多个VM（虚拟机），在为这些虚拟机安装好Linux /Windows Server 系统使之成为能提供各种网络应用服务的虚拟服务器，ESXi 也是从内核级支持硬件虚拟化，运行于其中的虚拟服务器在性能与稳定性上不亚于普通的硬件服务器，而且更易于管理维护。

VMware ESXi 5.0.0 的安装文件可以从VMware的官方网站上直接下载（注册时需提供一个有效的邮箱），下载得到的是一个VMware-VMvisor- Installer-5.0.0-469512.x86_64.iso 文件，可以刻录成光盘或量产到U盘使用，由于ESXi 本身就是一个操作系统(Linux内核)，因此在初次安装时要用它来引导系统；

 

## **主要优点**

· 确保[业务连续性](https://baike.baidu.com/item/业务连续性)和始终可用的 IT。

· 降低 IT 硬件和运营成本。

· 提高[应用程序](https://baike.baidu.com/item/应用程序)质量。

· 增强安全性和数据保护能力。

 

## **区别**

vSphere Essentials 和 Essentials Plus 专门为刚开始体验虚拟化的小型组织而设计。两个版本都提供最多三台服务器主机的虚拟化和集中化管理。vSphere Essentials 可以整合服务器以帮助您充分利用硬件。

Essentials Plus 添加了 vSphere Data Recovery 等功能，可以实现数据和[虚拟机](https://baike.baidu.com/item/虚拟机)的无代理[备份](https://baike.baidu.com/item/备份)。它还包括[业务连续性](https://baike.baidu.com/item/业务连续性)功能，如 vSphere High Availability（用于在检测到服务器故障时自动重启[应用程序](https://baike.baidu.com/item/应用程序)）和 vSphere vMotion（可完全消除用于服务器维护的计划内停机）。由此可以建立一个始终可用的IT 环境，此环境更经济高效、恢复能力更强，并且能更好地响　应业务需求。要获得具有更高级功能的可扩展解决方案，请升级到vSphere Acceleration Kit。

 

## **重要特点**

推出 vSphere Storage Appliance ：vSphere Essentials Plus 中的高级特性需要共享存储功能。过去，这意味着您的环境中需要有共享存储硬件，vSphere Essentials Plus问世后，您可以将服务器变为共享存储。vSphere Storage Appliance 这款革命性[软件](https://baike.baidu.com/item/软件)让您免去了共享存储硬件的成本和复杂性，却能拥有共享存储的功能。只需点击几下鼠标即可完成安装，而使用 vCenter Server 即可对其进行管理 – 非常适合所有中小型企业。保持 IT 操作的简　单性，同时使用 vSphere 的高可用性和自动化功能。

 

## **用途介绍**

· 消除停机并保护数据 — 利用[虚拟机](https://baike.baidu.com/item/虚拟机)实时迁移和虚拟机集群中的[应用程序](https://baike.baidu.com/item/应用程序)高可用性实现始终可用的 IT。

· 整合并优化 IT 投资 — 实现 10:1 或更高的整合率，将硬件利用率从 5% - 15% 提高到 80% 甚至更高，而无需牺牲[应用程序](https://baike.baidu.com/item/应用程序)性能。

· 最大程度提高[应用程序](https://baike.baidu.com/item/应用程序)可用性并保护信息资产 — 通过 vSphere坚实的可靠性以及集成的[备份](https://baike.baidu.com/item/备份)、恢复和故障切换功能，确保始终可用的 IT 运营连续性。

· 简化管理和提高工作效率 — 在数分钟（而不是数日或数周）内部署新的[应用程序](https://baike.baidu.com/item/应用程序)，监控[虚拟机](https://baike.baidu.com/item/虚拟机)性能，并实现修补程序和更新管理的自动化。

· 优化[软件](https://baike.baidu.com/item/软件)开发过程 — 允许测试和开发团队在共享服务器、网络和存储基础架构的同时，在安全、隔离的[沙箱](https://baike.baidu.com/item/沙箱)环境中安全地测试复杂的多层配置。

 

## **功能和组件**

VMware vSphere Essentials 和 Essentials Plus 包括以下主要功能和组件 ：

· VMware ESXi[虚拟化管理](https://baike.baidu.com/item/虚拟化管理)程序[体系结构](https://baike.baidu.com/item/体系结构)提供强健的、经过生产验证的高性能虚拟化层，允许多个[虚拟机](https://baike.baidu.com/item/虚拟机)共享硬件资源，性能可以达到甚至在某些情况下超过本机吞吐量。

· VMware vCenter Server for Essentials 通过内置的[物理机](https://baike.baidu.com/item/物理机)到[虚拟机](https://baike.baidu.com/item/虚拟机)(P2V) 转换和使用虚拟机模板进行快速部署，可为所有虚拟机和 vSphere[主机](https://baike.baidu.com/item/主机)提供集中化管理和性能监控。

· vSphere 虚拟[对称多处理](https://baike.baidu.com/item/对称多处理)(SMP) 使您能使用拥有多达 4 个虚拟 CPU 的超强[虚拟机](https://baike.baidu.com/item/虚拟机)。

· vSphere vStorage Virtual Machine File System (VMFS) 允许[虚拟机](https://baike.baidu.com/item/虚拟机)访问共享存储设备（[光纤通道](https://baike.baidu.com/item/光纤通道)、iSCSI 等），而且是其他 vSphere 组件（如 Storage vMotion）的关键促成技术。

· vSphere vStorage Thin Provisioning 提供共享存储容量的动态分配，允许 IT 部门实施[分层存储](https://baike.baidu.com/item/分层存储)战略，同时将存储开支削减多达 50%。

· vSphere vStorage API 可提供与受支持的第三方数据保护的集成。

· vCenter Update Manager 可自动跟踪、修补和更新 vSphere[主机](https://baike.baidu.com/item/主机)以及 VMware[虚拟机](https://baike.baidu.com/item/虚拟机)中运行的[应用程序](https://baike.baidu.com/item/应用程序)和[操作系统](https://baike.baidu.com/item/操作系统)。

· vCenter Converter 允许 IT[管理员](https://baike.baidu.com/item/管理员)将物理服务器和第三方[虚拟机](https://baike.baidu.com/item/虚拟机)快速转换为 VMware 虚拟机。

· vSphere VMsafe API 支持使用与虚拟化层[协同工作](https://baike.baidu.com/item/协同工作)的安全产品，从而为[虚拟机](https://baike.baidu.com/item/虚拟机)提供甚至比物理服务器级别更高的安全性。

· 硬件兼容性可兼容最广泛的 32 位和 64 位服务器和[操作系统](https://baike.baidu.com/item/操作系统)、存储和[网络设备](https://baike.baidu.com/item/网络设备)以及[企业管理工具](https://baike.baidu.com/item/企业管理工具)。

此外，VMware vSphere Essentials Plus 还包括为实现始终可用的 IT 而提供的以下[业务连续性](https://baike.baidu.com/item/业务连续性)功能和组件 ：

· vSphere vMotion 支持在不中断用户使用和不丢失服务的情况下在服务器间实时迁移[虚拟机](https://baike.baidu.com/item/虚拟机)，从而无需为服务器维护安排[应用程序](https://baike.baidu.com/item/应用程序)停机。

· vSphere High Availability 可在硬件或[操作系统](https://baike.baidu.com/item/操作系统)发生故障的情况下在几分钟内自动重新启动所有[应用程序](https://baike.baidu.com/item/应用程序)，实现经济高效的高可用性。

· vSphere Data Recovery 可为小型环境中的[虚拟机](https://baike.baidu.com/item/虚拟机)提供简单、经济高效、无代理的[备份](https://baike.baidu.com/item/备份)和恢复。



## **vSphere网络**

## **存储管理功能**

 

## **安装配置**

编辑

vSphere 5中，除了基于Windows[操作系统](https://baike.baidu.com/item/操作系统)的vCenter Server外，VMware还推出了基于SuSE Linux 11的vCenter Server Appliance（vCSA）虚拟机。和vCenter Server相比，vCSA的安装配置过程大大简化了，同时VMware也摆脱了对Windows操作系统的依赖。

下载vCenter Server Appliance

登录到VMware官方网站就可以下载VMware vCenter Server Appliance 5.0。下载到vSphere Client所在的服务器即可。

部署vCenter Server Appliance

为了部署vCenter Server Appliance[虚拟机](https://baike.baidu.com/item/虚拟机)，首先需要使用vSphere Client连接到ESXi主机或者现有的vCenter Server服务器，然后选择“文件”菜单中的“部署OVF模板”，会出现“部署OVF模板”向导。点击“浏览”按钮，选择刚刚下载的OVF软件包所在的路径，然后单击下一步即可。

读取OVF文件后将获取该模板的详细信息，包括产品、版本、供应商、文件大小等等。

接下来需要输入vCenter Server Appliance的名称，并选择将要安装的数据中心位置、[集群](https://baike.baidu.com/item/集群)、数据存储等信息。完成上述设置后需要选择磁盘的格式。选择“精简配置”可以节省多达70多个GB的磁盘空间。

然后需要选择网络映射，可以选择Network 1并映射到VM Network。

完成[网络映射](https://baike.baidu.com/item/网络映射)后，可以看到部署配置信息，勾选“部署后打开电源”。单击完成按钮后将开始在数据中心中部署vCenter Server Appliance的过程。

在10分钟以内就可以完成vCenter Server Appliance的部署过程。部署过程主要和系统磁盘和数据磁盘这两个文件相关。

在控制台配置vCenter Server Appliance

部署完成后，实际上是在数据中心中新建了一台虚拟机。

选择“网络配置”选项，然后输入回车键，进行网络配置。输入IP地址、子网掩码、网关以及[DNS服务器](https://baike.baidu.com/item/DNS服务器)地址、主机名等信息。

选择“时区配置”选项，然后输入回车键，进行时区配置，依次选择亚洲、中国，最后选择中国标准时间即可。

接下来登录到浏览器中对vCenter Server Appliance进行配置管理。

通过浏览器配置vCenter Server Appliance

打开IE浏览器，在地址栏输入https://192.168.5.33:5480/#core.Login，输入用户名和密码信息（root/vmware）后就可以登录到vCenter Server Appliance的管理控制台了。

首先需要选择“vCenter Server”选项卡下的“EULA”子选项，在界面中单击右侧的“Accept EULA”按钮接受VMware最终用户许可协议（EULA）。

接下来需要选择“Database”子选项，选择vCenter Server的数据库类型。vCenter Server Appliance支持两种类型的[数据库](https://baike.baidu.com/item/数据库)，即集成的DB2 Express数据库以及外部的Oracle数据库。然后选择右侧的“测试设置”按钮，如果一切顺利的话可以看到操作成功的提示。

如果连接不正常，那么需要使用SSH客户端登录到vCenter Server Appliance虚拟机，切换到db2inst1实例用户下，确认数据库是否已经启动。

切换到db2inst1实例用户：su - db2inst1

查看数据库列表：db2 list db directory

连接到vcdb数据库：db2 connect to vcdb

如果需要启动和关闭实例，那么需要执行db2stop force和db2start命令。

接下来需要点击“Status”子选项检查vCenter Server的状态是否正常，如果服务的状态为停止，那么需要点击右侧的“启动vCenter”按钮，启动VMware vCenter Server。如果一切顺利，将会看到操作执行成功的结果。

也可以通过“Services”选项卡下的“Status”子选项检查与ESXi主机相关的配置的状态，当然也可以通过右侧的按钮开启或关闭ESXi Services以及vSphere Web Client。

通过网络选项卡下的“Status”选项可以看到之前在vCenter Server Appliance控制台中配置的IP地址信息，如果要修改IP地址，可以通过右侧的“Address”选项卡进行配置。

如果要重启或关闭vCenter Server Appliance，可以通过“System”选项卡下的“Information”子选项右侧的“Reboot”和“Shutdown”按钮来实现。

在IE浏览器中完成上述配置后，就可以使用vSphere Client连接到vCenter Server Appliance新建数据中心并对ESXi主机进行管理了。需要注意的是在登录时输入的用户名已经不再是所熟悉的Administrator而是root了，因为vCenter Server Appliance使用的操作系统已经是SuSE Linux了。

 

## **特征介绍**

 

# **二，下载、制作、 安装 ESXi 主机**

官网下载镜像 地址：登账号、下载的是试用期的

https://my.vmware.com/cn/group/vmware/details?productId=353&rPId=28784&downloadGroup=ESXI550

下载 ESXI6.0U1 的安装镜像文件
 （VMware-VMvisor-Installer-6.0.0.update01-3073146.x86_64.ISO），并将其刻录成光盘，
 放入 CD-ROM 中，启动服务器并从光盘引导，安装系统经过一段时间会自动进入引导界面
 也可以将安装镜像直接刻录到 U 盘，通过服务器的 USB 引导安装 ESXi，但要注意刻录时会清
 空 U 盘

镜像制作U盘启动盘 

![img](https://img-blog.csdnimg.cn/2019050610255730.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

![img](https://img-blog.csdnimg.cn/20190506102658316.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

## **一，**

\1) 安装 ESXi 主机

![img](https://img-blog.csdnimg.cn/20190506105401836.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

\2) 正在自动开始引导 ESXi6.0 安装程序

![img](https://img-blog.csdnimg.cn/20190506105629909.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

![img](https://img-blog.csdnimg.cn/20190506110317915.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

\3) 来到 ESXi 安装的欢迎界面，按“回车”进入下一步

![img](https://img-blog.csdnimg.cn/20190506110444916.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

\4) 协议界面，按“F11”进入下一步

![img](https://img-blog.csdnimg.cn/20190506110528858.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

\5) 此时系统开始自动查询可用存储设备 ,选择本地设备

在选择磁盘页面中，选择要在其上安装 ESXi 的存储设备，如果这里有 iSCSI 存储设备也可以
 进行选择，然后按“回车”进入下一步
 选择磁盘时，千万不要依赖列表中的磁盘顺序，其磁盘顺序是由 BIOS 确定的 
 如果选择的是 SSD，则同一磁盘组中的 SSD 和所有基础 HDD 将被清除
 如果选择的是 HDD，并且磁盘组有两个以上磁盘，则只有选定的 HDD 才会被清除
 如果选择的是 HDD 磁盘，并且磁盘组的磁盘不超过两个，则 SSD 和选定的 HDD 将被清除

![img](https://img-blog.csdnimg.cn/20190506110635249.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

6） 选择键盘类型，默认即可，按“回车”进入下一步

![img](https://img-blog.csdnimg.cn/20190506110805987.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

7） 设置管理员 root 的密码，大于等于 7 位即可，按“回车”进入下一步

![img](https://img-blog.csdnimg.cn/20190506110901315.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

8） 此时系统正在自动整理和收集安装信息

![img](https://img-blog.csdnimg.cn/20190506110940354.png)

 

9） 确认以上配置无误后，即可按“F11”开始安装 ESXi 了

![img](https://img-blog.csdnimg.cn/20190506111005109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

10） 正在安装 ESXi 操作系统

![img](https://img-blog.csdnimg.cn/20190506111035296.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

11） 安装完成，按“回车”重启服务器

![img](https://img-blog.csdnimg.cn/20190506111152375.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

## **二 ，配置 ESXi** 


 \1) 在 ESXi 主界面，按“F2”弹出登陆框，输入管理员 root 密码，然后按“回车”登陆 ESXi 系
 统

![img](https://img-blog.csdnimg.cn/20190506111320950.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

\2) 进入 ESXI 系统的菜单及配置内容如下

![img](https://img-blog.csdnimg.cn/20190506111359823.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

选择“Configure Management Network”，按“回车”进入网络配置界面

![img](https://img-blog.csdnimg.cn/20190506111436795.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

\3) 配置网络的菜单如下：

![img](https://img-blog.csdnimg.cn/20190506111517692.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

\4) IPv4 的配置菜单如下：

![img](https://img-blog.csdnimg.cn/20190506111611624.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

![img](https://img-blog.csdnimg.cn/20190506111700434.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

![img](https://img-blog.csdnimg.cn/20190506111727454.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

![img](https://img-blog.csdnimg.cn/20190506111744602.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTYxOTE0Mw==,size_16,color_FFFFFF,t_70)

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 