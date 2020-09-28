import {Entity} from "./Entity";
import {IInitSystem, IUpdateSystem} from "./System";
import {Component, Data, Service} from "./Types";

export class EcsEngine
{
  private readonly _entities: Entity[] = [];
  private readonly _updateSystems: IUpdateSystem[] = [];
  private readonly _initSystems: IInitSystem[] = [];
  private readonly _data: Record<string, any> = {};
  private readonly _services: Record<string, any> = {};
  private readonly _eventComponents: Component<any>[] = [];
  
  public initialize(): void
  {
    this._initSystems.forEach(x => x.init(this));
  }
  
  public update(): void
  {
    this._updateSystems.forEach(x => x.update(this));
    this._eventComponents.forEach(x => this._entities.forEach(y => y.remove(x)));
    this._entities.forEach(x => {
      if(x.hasAnyComponent())
        return;
    
      this.removeEntity(x);
    });
  }
  
  public addSystem(system: IUpdateSystem | IInitSystem): EcsEngine
  {
    if ("update" in system)
      this._updateSystems.push(system);
    
    if("init" in system)
      this._initSystems.push(system);
    
    return this;
  }
  
  public registerEventComponent(eventComponent: Component<any>): EcsEngine
  {
    this._eventComponents.push(eventComponent);
    
    return this;
  }
  
  public addEntity(entity: Entity): EcsEngine
  {
    this._entities.push(entity);
    
    return this;
  }
  
  public removeEntity(entity: Entity): EcsEngine
  {
    let index = this._entities.indexOf(entity);
    if (index >= 0)
      this._entities.splice(index, 1);
    
    return this;
  }
  
  public entities(selector: (x: Entity) => boolean): Entity[]
  {
    let entities: Entity[] = [];
    this._entities.forEach(x =>
    {
      if (selector(x))
        entities.push(x);
    });
    
    return entities;
  }
  
  public setData<T>(data: Data<T>, value: T): EcsEngine
  {
    this._data[data] = value;
    
    return this;
  }
  
  public getData<T>(data: Data<T>): T
  {
    const value = this._data[data];
    if (!value)
      throw new TypeError("Data not found");
    
    return value;
  }
  
  public getService<T>(service: Service<T>): T
  {
    const value = this._services[service];
    if (!value)
      throw new TypeError("Data not found");
    
    return value;
  }
  
  public setService<T>(service: Service<T>, value: T): EcsEngine
  {
    this._services[service] = value;
    
    return this;
  }
}
