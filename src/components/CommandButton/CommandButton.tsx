import { useState } from "react";
import { Button } from "../../packages/design-system";
import { useServices } from "../../packages/service-locator";
import { Service } from "../../services";

export const CommandButton = () => {
  const services = useServices([Service.ANALYTICS, Service.ERROR_REPORTER]);
  const [analytics, errorReporter] = services;
  const [clickCount, setClickCount] = useState<number>(0);

  const handleClick = () => {
    try {
      analytics.track({
        eventName: "action:click",
      });

      if (clickCount >= 2) {
        throw Error("Don't click more than twice, please");
      }
    } catch (err) {
      errorReporter.record(err);
    } finally {
      setClickCount((c) => clickCount + 1);
    }
  };

  return <Button onClick={handleClick}>Send Command</Button>;
};
