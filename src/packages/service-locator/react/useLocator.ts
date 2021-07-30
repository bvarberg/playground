import { useContext } from "react";
import { ServiceLocatorContext } from "./context";

export const useLocator = () => {
  const locator = useContext(ServiceLocatorContext);

  if (!locator) {
    throw new Error("useLocator must be used within a ServiceLocatorProvider");
  }

  return locator;
};
