
import * as webpack from 'webpack';
import { BasebuildModuleInitializer } from './module-initializer.interface';

export interface BasebuildModule {
  uses?: string | Function;
  useClass?: string | BasebuildModuleInitializer;
  settings: webpack.Configuration
}