# serviceNode

基于Docker容器，让你同一台机器运行多个相同的服务在不同端口上，以这种容器隔离的方案给不同的客户提供同一套软件不同的版本。

### 可广泛用于如下场景
- 分布式Saas架构中的内网节点部署管理
- 生成服务容器，映射到宿主机对外的端口
- 对容器启/停/升级版本等操作
- 对容器管理硬件资源
- 监控宿主机的硬件资源消耗情况
- 监控容器内的资源消耗情况

## QuickStart

<!-- add docs here for user -->

服务启停等命令请移步 [egg docs][egg]
请确保系统中已经安装了Docker

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7777/
```

### Deploy

```bash
$ npm start
$ npm stop
```
