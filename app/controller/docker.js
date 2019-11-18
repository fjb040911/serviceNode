'use strict';

const Controller = require('egg').Controller;
const errorCode = require('../errorCode');


class Docker extends Controller {
  /**
   * 获取所有的docker
   * @returns {Promise<void>}
   */
  async versionList() {
    const result = await this.ctx.service.dockerCmd.listImages();
    console.log('result-->', result)
    this.ctx.body = errorCode.RESPONE(result);
  }

  /**
   * 新增容器
   * @returns {Promise<*|{msg, res, data, errorCode}>}
   */
  async createContainer() {
    const { app, agentId, port } = this.ctx.request.body;
    console.log('createContainer-->', app, agentId, port);
    if (!agentId || !port) {
      this.ctx.body = errorCode.DATA_MISSING_PARAMETERS;
      return;
    }
    console.log('begin to create DB>', agentId);
    this.ctx.service.db.create(agentId)
    console.log('End create DB>', agentId);
    console.log('begin create config space...');
    /**
    await this.ctx.service.dockerCmd.makeConfig(agentId)
    console.log('End create config space');
     **/
    console.log('begin create Container...');
    const result = await this.ctx.service.dockerCmd.run({ app, dockerName: agentId, outPort: port });
    console.log('End create container>', result);
    this.ctx.body = errorCode.RESPONE(result);
  }

  /**
   * 获取所有容器列表
   * @returns {Promise<void>}
   */
  async listContainers() {
    const { all, name } = this.ctx.request.body;
    const result = await this.ctx.service.dockerCmd.listContainers({ all, filters: { name } });
    console.log('listContainers->', result);
    this.ctx.body = errorCode.RESPONE(result);
  }

  /**
   * 测试方法
   * @returns {Promise<void>}
   */
  async testConfig() {
    console.log('dirname>', __dirname)
    console.log('filename>', __filename)
    const { name } = this.ctx.params;
    this.ctx.service.dockerCmd.makeConfig(name)
    this.ctx.service.db.create(name)
    this.ctx.body = errorCode.RESPONE('success');
  }

  async action() {
    const { name, action } = this.ctx.params;
    const result = await this.ctx.service.dockerCmd.listContainers({ all: true, filters: { "name": [ name ] } });
    console.log('action listContainers->', result);
    if (result && result[0]) {
      const ct = await this.ctx.service.dockerCmd.getContainer(result[0].Id)
      if (action === 'stop') {
        // 停止容器
        ct.stop();
      } else if (action === 'start') {
        // 重新开始容器
        ct.start();
      } else if (action === 'remove') {
        // 强制删除容器
        ct.remove({ force: true });
      } else if (action === 'upgrade') {
        const { app, agentId, port } = this.ctx.request.body;
        // 先跑起新的容器，再延迟销毁旧容器，保证服务不中断
        const newResult = this.ctx.service.dockerCmd.run({ app, dockerName: agentId, outPort: port });
        console.log('End create new container>', newResult);
        console.log('upgrade---', app, agentId, port);
        setTimeout(() => {
          // 之后删除容器，保证服务不间断
          ct.kill();
          ct.remove({ force: true });
        }, 10000);
      }
      this.ctx.body = errorCode.RESPONE('success');
      return;
    }

    this.ctx.body = errorCode.QUERY_DATA_NO_FOUND;
  }
}
module.exports = Docker;
