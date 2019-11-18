// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDb = require('../../../app/service/db');
import ExportDockerCmd = require('../../../app/service/dockerCmd');

declare module 'egg' {
  interface IService {
    db: ExportDb;
    dockerCmd: ExportDockerCmd;
  }
}
