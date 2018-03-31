'use strict';
const gutil           = require('gulp-util');
let basebuildMainFile = '../../src/main.js';

let options = {

  gulpSettings: {
    requireName: '../web/node_modules/gulp'
  },

  modules : {
    unitTests: {
      settings: {
        target: 'web'
      }
    }
  }
};

if(gutil.env.prod){
  options.gulpSettings.requireName  = 'gulp';
  basebuildMainFile                 = 'basebuild';
}

require(basebuildMainFile)(options);