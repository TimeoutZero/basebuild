
interface WebpackOptions {

}

interface Gulp {
  task(taskName:string, dependencies:Array<string>, handler: Function)
  task(taskName:string, handler: Function)
}

interface BasebuildModuleSettingsGenerator {
  buildSettings(): any // Webpack Object
  registerTasks(gulp:Gulp): void;
}