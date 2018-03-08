


interface BasebuildModule {
  buildSettings(): any // Webpack Object
  registerTasks(gulp:Gulp): void;
}