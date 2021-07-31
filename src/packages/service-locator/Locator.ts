import { Key, Service, ServiceLocator, Services } from "./types";

export class Locator implements ServiceLocator {
  private _serviceMap: Map<Key, Service<Key>>;

  constructor() {
    this._serviceMap = new Map();
  }

  register<K extends Key, S extends Service<K>>(key: K, service: S) {
    if (this._serviceMap.has(key)) {
      throw new Error(`A service has already been registered for key "${key}"`);
    }

    this._serviceMap.set(key, service);
  }

  resolve<K extends Key>(key: K): Service<K> {
    const service = this._serviceMap.get(key);

    return service;
  }

  resolveAll<Keys extends Key[]>(...keys: [...Keys]): Services<Keys> {
    const services = keys.map(this._serviceMap.get) as Services<Keys>;

    /*
     * TODO (bvarberg): Figure out why this type assertion is necessary...
     * I guess because #map doesn't return a tuple.
     */
    return services;
  }
}
