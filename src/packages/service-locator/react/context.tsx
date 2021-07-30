import { createContext } from "react";
import { ServiceLocator } from "../types";

export const ServiceLocatorContext = createContext<ServiceLocator | undefined>(
  undefined
);
ServiceLocatorContext.displayName = "ServiceLocatorContext";

export const ServiceLocatorProvider = ServiceLocatorContext.Provider;
