export type LookupKey = string;

export interface ServiceLocator {
  register<S>(params: RegisterParams<S>): void;
  resolve(params: ResolveParams): unknown[];
}

export interface RegisterParams<S = unknown> {
  key: LookupKey;
  service: S;
}

export interface ResolveParams<K = keyof ServicesMap> {
  services: K[];
}

export interface ServicesMap {
  api: APIClient;
  logger: () => void;
}

interface APIClient {
  fetch(id: string): { name: string };
}
