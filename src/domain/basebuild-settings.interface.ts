import { BasebuildModule } from "./module.interface";

export interface BasebuildSettings {
  src: string
  modules: BasebuildModule[]
}