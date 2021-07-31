import { useEffect, useState } from "react";
import { useServices } from "./packages/service-locator";
import { Services } from "./services";

export const Consumer = () => {
  const services = useServices([Services.ANALYTICS]);
  const [analytics] = services;
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

  return <div>{user ? user.name : "No user available"}</div>;
};
