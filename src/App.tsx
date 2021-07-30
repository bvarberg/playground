import { MapLocator, ServiceLocatorProvider } from "./packages/service-locator";
import { LOGGER } from "./servicesMap";

interface Dependencies {}

export function App(deps: Dependencies) {
  const locator = new MapLocator();
  locator.register({ key: LOGGER, service: console });
  const [logger] = locator.resolve({ services: [LOGGER] });

  return (
    <ServiceLocatorProvider value={locator}>
      <div>Empty</div>
    </ServiceLocatorProvider>
  );
}
