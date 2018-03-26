'use strict';
const gutil           = require('gulp-util');
let basebuildMainFile = '../../src/main.js';

let options = {
  modules : {
    // gulp : {
    //   uses: '../demo-web/node_modules/gulp'
    // },

    unitTests: {
      settings: {
        target: 'web'
      }
    }
  }
};

if(gutil.env.prod){
  options.modules.gulp.uses  = 'gulp';
  basebuildMainFile          = 'basebuild';
}

require(basebuildMainFile)(options);