export type Component<T> = string & { type: T }

export function component<T>(name: string): Component<T>
{
  return name as Component<T>;
}

export type Data<T> = string & { type: T }

export function data<T>(name: string): Data<T>
{
  return name as Data<T>;
}

export type Service<T> = string & { type: T }

export function service<T>(name: string): Service<T>
{
  return name as Service<T>;
}
