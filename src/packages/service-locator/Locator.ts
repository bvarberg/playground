import { Key, Service, ServiceLocator, Services } from "./types";

export class Locator implements ServiceLocator {
  private _serviceMap: Map<Key, Service<Key>>;

  constructor() {
    this._serviceMap = new Map();
  }

  public register<K extends Key, S extends Service<K>>(key: K, service: S) {
    if (this._serviceMap.has(key)) {
      throw new Error(`A service has already been registered for key "${key}"`);
    }

    this._serviceMap.set(key, service);
  }

  public resolve<K extends Key>(key: K): Service<K> {
    if (!this._isRegistered(key)) {
      throw new Error(`There is no service registered: ${key}`);
    }

    const service = this._serviceMap.get(key);

    return service;
  }

  public resolveAll<Keys extends Key[]>(...keys: [...Keys]): Services<Keys> {
    const missingServices = this._unregistered(keys);

    if (missingServices.length > 0) {
      throw new Error(
        `There are no services registered for: ${missingServices.join(", ")}`
      );
    }

    const services = keys.map((key) =>
      this._serviceMap.get(key)
    ) as Services<Keys>;

    return services;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _isRegistered(key: Key): boolean {
    return this._serviceMap.has(key);
  }

  private _unregistered(keys: Key[]): Key[] {
    return keys.reduce((unregisteredKeys, key) => {
      return this._isRegistered(key)
        ? unregisteredKeys
        : [...unregisteredKeys, key];
    }, [] as Key[]);
  }
}
