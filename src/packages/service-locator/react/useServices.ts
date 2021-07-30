import { useLocator } from "./useLocator";

export const useServices = (services: string[]) => {
  const locator = useLocator();

  const resolvedServices = locator.resolve({ services });

  return resolvedServices;
};
