'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  /**
   * 获取所有版本
   */
  router.get('/api/image/versionList', controller.docker.versionList);
  /**
   * 创建容器
   */
  router.post('/api/container/create', controller.docker.createContainer);
  /**
   * 获取容器列表
   */
  router.post('/api/container/list', controller.docker.listContainers);

  /**
   * 对容器操作， name 容器名称， action 操作(stop, start, remove, upgrade)
   */
  router.post('/api/container/:name/:action', controller.docker.action)

  /**
   * 测试生成配置文件方法
   */
  router.get('/api/test/config/:name', controller.docker.testConfig);

};
