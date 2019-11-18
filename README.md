# serviceNode

基于Docker容器，让你同一台机器运行多个相同的服务在不同端口上，以这种容器隔离的方案给不同的客户提供同一套软件不同的版本。

### 可广泛用于如下场景
- 分布式Saas架构中的内网节点部署管理
- 生成服务容器，映射到宿主机对外的端口
- 对某个容器启/停/升级版本等操作
- 对某个容器管理硬件资源

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
