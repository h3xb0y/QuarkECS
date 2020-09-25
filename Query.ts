import {EcsEngine} from "./EcsEngine";
import {Component} from "./Types";
import {Entity} from "./Entity";

export class Query
{
  constructor
  (
    private readonly _engine: EcsEngine
  )
  {}
  
  get<T1>(c1: Component<T1>): [T1, Entity][];
  get<T1, T2>(c1: Component<T1>, c2: Component<T2>): [T1, T2, Entity][];
  get<T1, T2, T3>(c1: Component<T1>, c2: Component<T2>, c3: Component<T3>): [T1, T2, T3, Entity][];
  get<T1, T2, T3, T4>(c1: Component<T1>, c2: Component<T2>, c3: Component<T3>, c4: Component<T4>): [T1, T2, T3, T4, Entity][];
  get<T1, T2, T3, T4>(c1: Component<T1>, c2?: Component<T2>, c3?: Component<T3>, c4?: Component<T4>): any
  {
    if (c2 != null && c3 != null && c4 != null)
    {
      let selector = (x: Entity) => x.has(c1) && x.has(c2) && x.has(c3) && x.has(c4);
      let entities = this._engine.entities(selector);
      
      let result: [T1, T2, T3, T4, Entity][] = [];
      entities.forEach(x => result.push([x.get(c1), x.get(c2), x.get(c3), x.get(c4), x]));
      
      return result;
    }
    else if (c2 != null && c3 != null)
    {
      let selector = (x: Entity) => x.has(c1) && x.has(c2) && x.has(c3);
      let entities = this._engine.entities(selector);
      
      let result: [T1, T2, T3, Entity][] = [];
      entities.forEach(x => result.push([x.get(c1), x.get(c2), x.get(c3), x]));
      
      return result;
    }
    else if (c2 != null)
    {
      let selector = (x: Entity) => x.has(c1) && x.has(c2);
      let entities = this._engine.entities(selector);
      
      let result: [T1, T2, Entity][] = [];
      entities.forEach(x => result.push([x.get(c1), x.get(c2), x]));
      
      return result;
    }
    else
    {
      let selector = (x: Entity) => x.has(c1);
      let entities = this._engine.entities(selector);
      
      let result: [T1, Entity][] = [];
      entities.forEach(x => result.push([x.get(c1), x]));
      
      return result;
    }
  }
}

export function query(engine: EcsEngine):Query
{
  return new Query(engine);
}
