'use strict';

const Service = require('egg').Service;
const exec = require('child_process').exec;
const Docker = require('dockerode');
const fs = require('fs').promises;
const dockerBean = new Docker();

const execPromise = function(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err || stderr) {
        reject(err || stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

const configjs = function(agentId) {
  const str = `'use strict';

module.exports = {
  url: 'mongodb://172.17.0.1:27017/${agentId}guarder',
  options: {},
}

`;
  return str;
}

class DockerCmd extends Service {
  /**
   * 命令方式获取镜像列表
   * 废弃
   * @param cb
   */
  async images() {
    const cmd = 'docker images';
    return await execPromise(cmd);
  }

  /**
   * 获取镜像列表
   * @param opts
   * @returns {Promise<void>}
   */
  async listImages(opts = {}) {
    opts.filters = {};
    opts.filters.reference = [ "gs:*" ]
    return await dockerBean.listImages(opts);
  }

  /**
   * 命令方式运行一个docker容器
   * 废弃
   * @param app
   * @param version
   * @param dockerName
   * @param outPort
   * @param inerPort
   * @param cb
   */
  async run({ app = 'guarder_server:latest', dockerName, outPort, inerPort = 8999 }) {
    const cmd = `docker run -d -p ${outPort}:${inerPort} -e dbName=${dockerName}_guarder --name ${dockerName} ${app}`;
    return await execPromise(cmd);
  }

  /**
   * 命令方式显示容器列表
   * 废弃
   * @param opt
   * @param cb
   */
  async ps(opt) {
    let cmd = 'docker ps';
    if (opt.a) {
      // 显示所有容器，包括未运行的
      cmd += ' -a';
    }
    return await execPromise(cmd);
  }

  /**
   * 显示容器列表
   * @param opts
   * opts { all, limit, size, filters}
   * @returns {Promise<void>}
   */
  async listContainers(opts) {
    return await dockerBean.listContainers(opts);
  }

  /**
   * 获取容器
   * @param id
   * @returns {Promise<void>}
   */
  async getContainer(id) {
    return await dockerBean.getContainer(id);
  }

  /**
   * 创建配置文件
   * @param agentId
   * 废弃
   */
  async makeConfig(agentId) {
    await fs.mkdir(`./saasworkspace/${agentId}/logs`,{ recursive: true });
    await fs.writeFile(`./saasworkspace/${agentId}/config.js`, configjs(agentId));
  }
}
module.exports = DockerCmd;
