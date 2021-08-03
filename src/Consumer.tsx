import { useEffect, useState } from "react";
import { useServices } from "./packages/service-locator";
import { Service } from "./services";

export const Consumer = () => {
  const services = useServices([Service.ANALYTICS, Service.ERROR_REPORTER]);
  const [analytics, errorReporter] = services;
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    analytics.track({
      eventName: "user:requested",
      payload: {
        userID: "123",
      },
    });

    const timeout = window.setTimeout(() => {
      setUser({ name: "User 123" });
      analytics.track({
        eventName: "user:received",
      });
    }, 2000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [analytics]);

  const onTakeAction = () => {
    try {
      analytics.track({
        eventName: "user:action:clickedButton",
      });
      throw Error("just kidding it always throws");
    } catch (err) {
      errorReporter.record(err);
    }
  };

  if (!user) {
    return <div>No user available</div>;
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={() => onTakeAction()}>Action</button>
    </div>
  );
};
