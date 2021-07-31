export type Key = string;

export interface ServiceLocator {
  register(params: RegisterParams): void;
  resolve(params: ResolveParams): [];
}

export interface RegisterParams {
  key: Key;
  service: unknown;
}

export interface ResolveParams<K = keyof ServiceMap> {
  services: K[];
}

// eslint-disable-next-line import/export
export interface ServicesMap {
  [key: string]: unknown;
}

// Application types
// eslint-disable-next-line import/export
export interface ServicesMap {
  api: APIClient;
  logger: (m: string) => void;
}

interface APIClient {
  fetch(id: string): { name: string };
}

interface ServiceMap {
  [key: string]: unknown;
}

type ServiceKey = keyof ServiceMap;
type ServiceValue<K extends ServiceKey> = ServiceMap[K];

interface Register {
  <K extends ServiceKey, S extends ServiceValue<K>>(key: K, service: S): void;
}

interface Resolve {
  <K extends ServiceKey>(key: K): ServiceValue<K>;
}

interface ResolveAll {
  <A extends Array<ServiceKey>>(...keys: [...A]): {
    [K in keyof A]: A[K] extends ServiceKey ? ServiceValue<A[K]> : unknown;
  };
}

export interface Locator {
  register: Register;
  resolve: Resolve;
  resolveAll: ResolveAll;
}

// let l: Locator;
// l.register("api", () => null);
// l.register("api", {
//   fetch(id: string) {
//     return { name: "example" };
//   },
// });
// const api1 = l.resolve("api");
// const r = l.resolveAll("logger", "api", "other");

// const loggerSolo = l.resolve("logger");
// const otherSolo = l.resolve("other");
// const r = l.resolveAll("logger", "api", "other");
// // const [logger, api, other] = services;
// logger();
// api.fetch;

// interface ResolveAll {
//   <A extends Array<keyof ServicesMap>>(...keys: [...A]): {
//     [K in keyof A]: A[K] extends keyof ServicesMap
//       ? ServicesMap[A[K]]
//       : unknown;
//   };
// }
