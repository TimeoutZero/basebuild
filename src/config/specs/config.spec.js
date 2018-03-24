'use strict';

describe('Config Module', function(){
   'use strict';
    /*
     * Global Variables
    */
    let rootPath      = "../..";
    let srcPath       = `../`;
    // let bbNodeModules = "#{rootPath}/node_modules";

    /*
     * Imports
    */
    let defaultOptions = require(`${rootPath}/defaults/defaults.options`)();
    let ConfigModule   = require(`${srcPath}/config.module.js`);
    const _            = require('lodash');
    const newModuleInitializerByPath = require('./newModuleInitializerByPath.mock');
    const path = require('path');

    const sinon  = require('sinon');
    const chai   = require('chai');
    const assert = chai.assert;
    const expect = chai.expect;

    const commonUserDefaults = {
      deep: {
        string: 'string',
        array : ['item1', 'item2'],
        date  : new Date()
      }
    };

    class NewModuleUsingClass {
      buildSettings(){
        return {
          entry: '[name]-2.js'
        };
      }

      registerTask(){

      }
    };

    class NewModuleUsingClass2 {
      buildSettings(){
        return {
          entry: '[name]-2.js'
        };
      }

      registerTask(){

      }
    }

    const newModuleUsingClass = {
      initializerClass: NewModuleUsingClass
    };

    const newModuleUsingClass2 = {
      initializerClass: NewModuleUsingClass2
    };


    /*
     * Tests
    */

    describe('New instance', function () {


      describe('which user options is empty and defaults is not', function () {
        let moduleInstance = null;

        beforeEach(function () {
          moduleInstance = new ConfigModule({}, commonUserDefaults);
        });


        it('Sets user options as empty object', function () {
          assert.isObject(moduleInstance.userOptions);
          assert.isTrue( _.isEmpty(moduleInstance.userOptions) );
        });

        it('Sets default options up by parameter', function () {
          assert.isObject(moduleInstance.defaults);
          assert.isFalse( _.isEmpty(moduleInstance.defaults) );
        });

        it('Sets merged options as empty object', function () {
          assert.isObject(moduleInstance.finalOptions);
        });


      });



    });

    describe("When setups the basebuild", function(){
      describe("and user has added new modules", function(){
        describe("using defined classes as initializers", function(){
          let moduleInstance = null;

          beforeEach(function () {

            const userOptionsWithModulesUsingClasses = {
              modules: {newModuleUsingClass, newModuleUsingClass2}
            };

            moduleInstance = new ConfigModule(userOptionsWithModulesUsingClasses, commonUserDefaults);
            moduleInstance.buildModulesSettings(moduleInstance.userOptions.modules);
          });

          it("runs the buildSettings method for every new module", function(done){
            const expectedSettings = new NewModuleUsingClass().buildSettings();
            assert.deepEqual(moduleInstance.userOptions.modules.newModuleUsingClass.settings, expectedSettings);
            done();
          });
        })


        describe("using string paths as initializers", function(){

          let moduleInstance = null;

            beforeEach(function () {

              const userOptionsWithModulesUsingClassesByPath = {
                modules: {
                  newModuleInitializerByPath: {
                    initializerClass: "src/config/specs/newModuleInitializerByPath.mock.js"
                  }
                }
              };

              moduleInstance = new ConfigModule(userOptionsWithModulesUsingClassesByPath, commonUserDefaults);
              moduleInstance.buildModulesSettings(moduleInstance.userOptions.modules);
            });

            it("runs the buildSettings method for every new module", function(done){
              const expectedSettings = new newModuleInitializerByPath().buildSettings();
              assert.deepEqual(moduleInstance.userOptions.modules.newModuleInitializerByPath.settings, expectedSettings);
              done();
            });


          describe("and changing the current working directory", function(){
            let moduleInstance = null;

            beforeEach(function () {
              let defaults = _.clone(commonUserDefaults);
              defaults.cwd = path.resolve(__dirname);
              const userOptionsWithModulesUsingClassesByPath = {
                modules: {
                  newModuleInitializerByPath: {
                    initializerClass: "./newModuleInitializerByPath.mock.js"
                  }
                }
              };

              moduleInstance = new ConfigModule(userOptionsWithModulesUsingClassesByPath, defaults);
              moduleInstance.buildModulesSettings(moduleInstance.userOptions.modules);
            });

            it("runs the buildSettings method for every new module", function(done){
              const expectedSettings = new newModuleInitializerByPath().buildSettings();
              assert.deepEqual(moduleInstance.userOptions.modules.newModuleInitializerByPath.settings, expectedSettings);
              done();
            });
          });
        });

      })
    });


    // describe('Provides a merge to user and default options', function () {
    //    let instance = null;

    //   it('should do what...', function () {
    //       assert.deepPropertyVal(instance, 'defaults.deep.string', commonUserDefaults.deep.string);
    //       assert.deepPropertyVal(instance, 'defaults.deep.array' , commonUserDefaults.deep.array );
    //       assert.deepPropertyVal(instance, 'defaults.deep.date'  , commonUserDefaults.deep.date );
    //   });

    // });



});