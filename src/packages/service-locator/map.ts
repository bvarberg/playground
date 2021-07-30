interface ServiceMap {
  api: boolean;
  logger: () => void;
}

// const m = new Map<K in keyof ServiceMap, ServiceMap[K]>()

type LocatorMap<
  K extends string = keyof ServiceMap,
  V extends unknown = K extends keyof ServiceMap ? ServiceMap[K] : unknown
> = Map<K, V>;

const map: LocatorMap = new Map();
const value = map.get("logger");

/**
 * Instead of trying to type the Map...
 * why not try to type the function on the Locator?
 *
 * resolve(keys: K): MappedType[K to V[K]]
 *
 * Which should be true regardless of the implementation using Map to hold on to
 * the services.
 *
 * Defaults to K = string, V = unknown
 */
