// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDocker = require('../../../app/controller/docker');
import ExportHome = require('../../../app/controller/home');

declare module 'egg' {
  interface IController {
    docker: ExportDocker;
    home: ExportHome;
  }
}
