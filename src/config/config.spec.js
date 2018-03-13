'use strict';

describe('Config Module', function(){
   'use strict';
    /*
     * Global Variables
    */
    let rootPath      = "..";
    let srcPath       = `./`;
    // let bbNodeModules = "#{rootPath}/node_modules";

    /*
     * Imports
    */
    let defaultOptions = require(`${rootPath}/defaults/defaults.options`)();
    let ConfigModule   = require(`${srcPath}/config.module.js`);
    const _            = require('lodash');

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
    const newModuleUsingClass = {
      initializerClass: class NewModuleUsingClass {
        buildSettings(){

        }

        registerTask(){

        }
      }
    };

    const newModuleUsingClass2 = {
      initializerClass: class NewModuleUsingClass2 {
        buildSettings(){

        }

        registerTask(){

        }
      }
    }


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
        describe("using classes", function(){
          let moduleInstance = null;

          beforeEach(function () {

            const userOptionsWithModulesUsingClasses = {
              modules: {newModuleUsingClass, newModuleUsingClass2}
            };

            moduleInstance = new ConfigModule(userOptionsWithModulesUsingClasses, commonUserDefaults);
            moduleInstance.buildExternalModulesSettings(moduleInstance.userOptions);
            sinon.stub(moduleInstance.userOptions.modules.newModuleUsingClass.initializerInstance, 'buildSettings');
          });

          afterEach(function(){
            moduleInstance.userOptions.modules.newModuleUsingClass.initializerInstance.buildSettings.restore();
          });

          it("runs the buildSettings method for every new module", function(done){
            assert.isTrue(moduleInstance.userOptions.modules.newModuleUsingClass.initializerInstance.buildSettings.calledOnce);
            done();
          });
        })


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