import { Key, Services } from "../types";
import { useLocator } from "./useLocator";

export const useServices = <Keys extends Key[]>(
  keys: [...Keys]
): Services<Keys> => {
  const locator = useLocator();

  /*
   * TODO (bvarberg): Just like in the locator itself, we must provide our own
   * assertion that the values returned by this function match with the known
   * service values in order to get the tuple type we're looking for.
   */
  const resolvedServices = locator.resolveAll(...keys) as Services<Keys>;

  return resolvedServices;
};
