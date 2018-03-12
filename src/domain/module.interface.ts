
import * as webpack from 'webpack';
import { BasebuildModuleInitializer } from './module-initializer.interface';

export interface BasebuildModule {
  uses?: string | Function;
  initializerClass?: string | BasebuildModuleInitializer;
  initializerInstance: BasebuildModuleInitializer;
  settings: webpack.Configuration
}