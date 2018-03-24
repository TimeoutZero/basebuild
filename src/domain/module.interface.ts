
import * as webpack from 'webpack';
import { BasebuildModuleInitializer } from './module-initializer.interface';

export interface BasebuildModule {
  uses?: string | Function;
  initializerClass?: string | BasebuildModuleInitializer;

  /**
   * @description Created on config phase to build the module settings and register it's tasks
   */
  initializerInstance: BasebuildModuleInitializer;
  settings: webpack.Configuration
}