
import * as webpack from 'webpack';

export interface BasebuildModuleInitializer {
  buildSettings(): webpack.Configuration
  registerTasks(gulp:Gulp): void;
}