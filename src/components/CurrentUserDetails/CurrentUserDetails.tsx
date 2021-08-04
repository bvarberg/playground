import { useSession } from "../../lib/authentication";
import { useServices } from "../../packages/service-locator";
import { Service } from "../../services";

export const CurrentUserDetails = () => {
  const { currentUser, signOut } = useSession();
  const services = useServices([Service.ANALYTICS]);
  const [analytics] = services;

  if (!currentUser) {
    // TODO: This feels a bit clumsy. I think I wanted to use a NullObject
    // pattern so currentUser could be be used without checking... or otherwise
    // guarantee there is a user before this point.
    return null;
  }

  const handleSignOut = async () => {
    analytics.track({
      eventName: "currentUser:signOut",
      payload: {
        id: currentUser.id,
      },
    });
    signOut();
  };

  return (
    <div>
      <div>Welcome {currentUser?.name}</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};
