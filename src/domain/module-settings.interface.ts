

interface Gulp {
  task(taskName:string, dependencies:Array<string>, handler: Function)
  task(taskName:string, handler: Function)
}
