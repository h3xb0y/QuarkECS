import {EcsEngine} from "./EcsEngine";

export interface IUpdateSystem
{
  update(engine: EcsEngine): void;
}

export interface IInitSystem
{
  init(engine: EcsEngine): void;
}
