'use strict';
/**
 * 再宿主机动态创建Mongodb数据库实例，方便给容器内应用调用
 */
const Service = require('egg').Service;
const mongodb = require('mongodb');

class DbCmd extends Service {
  create(dbName) {
    console.log('dbName is :', dbName);
    const newSrv = new mongodb.Server('127.0.0.1', 27017, { auto_reconnect: true });
    console.log('newSrv is :', newSrv);
    const newDb = new mongodb.Db(`${dbName}_guarder`, newSrv, { safe: true });
    console.log('newDb is :', newDb);
  }
};
module.exports = DbCmd;
