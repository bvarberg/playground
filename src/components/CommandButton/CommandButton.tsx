import { useServices } from "../../packages/service-locator";
import { Service } from "../../services";

export function CommandButton() {
  const services = useServices([Service.ANALYTICS, Service.ERROR_REPORTER]);
  const [analytics, errorReporter] = services;

  const handleClick = () => {
    try {
      analytics.track({
        eventName: "action:click",
      });
      throw Error("Just kidding it always throws");
    } catch (err) {
      errorReporter.record(err);
    }
  };

  return <button onClick={handleClick}>Send Command</button>;
}
