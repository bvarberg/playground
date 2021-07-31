/**
 * Use Module Augmentation to patch this interface with a map of your services.
 * @see [Module Augmentation in TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
 * @example
 * delcare module 'service-locator' {
 *   interface ServiceMap {
 *     api: APIClient;
 *     logger: Logger;
 *   }
 * }
 */
export interface ServiceMap {
  [key: string]: unknown;
}

export type ServiceKey = keyof ServiceMap;
export type ServiceKeys = Array<ServiceKey>;

export type ServiceValue<K extends ServiceKey> = ServiceMap[K];
export type ServiceValues<A extends Array<ServiceKey>> = {
  [K in keyof A]: A[K] extends ServiceKey ? ServiceValue<A[K]> : unknown;
};

interface Register {
  <Key extends ServiceKey, Service extends ServiceValue<Key>>(
    key: Key,
    service: Service
  ): void;
}

interface Resolve {
  <Key extends ServiceKey>(key: Key): ServiceValue<Key>;
}

interface ResolveAll {
  <Keys extends ServiceKeys>(...keys: [...Keys]): ServiceValues<Keys>;
}

export interface ServiceLocator {
  register: Register;
  resolve: Resolve;
  resolveAll: ResolveAll;
}
