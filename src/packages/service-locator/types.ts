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

export type Key = keyof ServiceMap;

export type Service<K extends Key> = ServiceMap[K];
export type Services<Keys extends Key[]> = {
  [K in keyof Keys]: Keys[K] extends Key ? Service<Keys[K]> : unknown;
};

interface Register {
  <K extends Key, S extends Service<K>>(key: K, service: S): void;
}

interface Resolve {
  <K extends Key>(key: K): Service<K>;
}

interface ResolveAll {
  <Keys extends Key[]>(...keys: [...Keys]): Services<Keys>;
}

export interface ServiceLocator {
  register: Register;
  resolve: Resolve;
  resolveAll: ResolveAll;
}
