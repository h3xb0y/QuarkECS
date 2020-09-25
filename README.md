# quark-ecs
Tiny Entity Component System(ECS) for TypeScript

## Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://www.npmjs.com/package/yarn) to install this library.

```bash
yarn add @h3xb0y/quark-ecs
```
or
```
npm install @h3xb0y/quark-ecs
```

## Usage
Simple usage example :
```typescript
import {EcsEngine} from "./EcsEngine"; import {component} from "./Types"; import {IUpdateSystem} from "./RaiseValueSystem"; import {query} from "./Query"; import {IInitSystem} from "./System"; import {Entity} from "./Entity";

interface IValueComponent
{
  value: number;
}

// define ECS component
const ValueComponent = component<IValueComponent>("ValueComponent");

class RaiseValueSystem implements IUpdateSystem, IInitSystem
{
  update(engine:EcsEngine)
  {
    // loop entities in ECS container
    for ([component] in query(engine).get(ValueComponent))
      component.value += 1;
  }
    
  init(engine:EcsEngine)
  {
    let entity = new Entity();
    // add & set new component
    entity.set(ValueComponent, {value: 10});
    // adding created entity in ECS container
    engine.addEntity(entity);
  }
}

// setup ecs engine
let engine = new EcsEngine();
engine.addSystem(new RaiseValueSystem());
engine.init(); // calls only one time

engine.update(); // need call every tick or every frame

```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## API

TODO

## Examples

TODO

## License
[MIT](https://choosealicense.com/licenses/mit/)

