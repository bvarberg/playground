import { any, isNil } from "ramda";
import {
  RegisterParams,
  ResolveParams,
  ServiceLocator,
  ServiceMap,
} from "./types";

export class MapLocator implements ServiceLocator {
  private _serviceMap: Map<keyof ServiceMap, ServiceMap[keyof ServiceMap]>;

  constructor() {
    this._serviceMap = new Map();
  }

  register<S>({ key, service }: RegisterParams<S>): void {
    if (this._serviceMap.has(key)) {
      throw new Error(`a service for key "${key}" already exists`);
    }
  }

  resolve({ services }: ResolveParams) {
    const resolvedServices = services.map(this._serviceMap.get);

    const b = this._serviceMap.get("api");
    const l = this._serviceMap.get("logger");

    if (any(isNil)(resolvedServices)) {
      throw new Error("at least one service for the given keys does not exist");
    }

    return resolvedServices;
  }
}
