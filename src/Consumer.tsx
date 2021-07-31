import { useEffect } from "react";
import { useServices } from "./packages/service-locator";

export const Consumer = () => {
  const services = useServices(["logger"]);
  const [logger] = services;

  useEffect(() => {
    logger.info("some message"); // <- This should be typed, if I can figure this out.
  }, [logger]);

  return null;
};
