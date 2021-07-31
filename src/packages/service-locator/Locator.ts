import {
  ServiceKey,
  ServiceKeys,
  ServiceLocator,
  ServiceValue,
  ServiceValues,
} from "./types";

export class Locator implements ServiceLocator {
  private _serviceMap: Map<ServiceKey, ServiceValue<ServiceKey>>;

  constructor() {
    this._serviceMap = new Map();
  }

  register<K extends ServiceKey, S extends ServiceValue<K>>(
    key: K,
    service: S
  ) {
    if (this._serviceMap.has(key)) {
      throw new Error(`A service has already been registered for key "${key}"`);
    }

    this._serviceMap.set(key, service);
  }

  resolve<K extends ServiceKey>(key: K): ServiceValue<K> {
    const service = this._serviceMap.get(key);

    return service;
  }

  resolveAll<Keys extends ServiceKeys>(
    ...keys: [...Keys]
  ): ServiceValues<Keys> {
    const services = keys.map(this._serviceMap.get) as ServiceValues<Keys>;

    /*
     * TODO (bvarberg): Figure out why this type assertion is necessary...
     * I guess because #map doesn't return a tuple.
     */
    return services;
  }
}
