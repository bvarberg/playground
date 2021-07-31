import { Locator, ServiceLocatorProvider } from "./packages/service-locator";

interface APIClient {
  fetch(id: string): { name: string };
}

interface Logger {
  error(m: string): void;
  info(m: string): void;
}

declare module "./packages/service-locator" {
  interface ServiceMap {
    api: APIClient;
    logger: Logger;
  }
}

interface Dependencies {}

export function App(deps: Dependencies) {
  const locator = new Locator();
  locator.register("logger", {} as Logger);
  locator.register("api", {} as APIClient);

  return (
    <ServiceLocatorProvider value={locator}>
      <div>Empty</div>
    </ServiceLocatorProvider>
  );
}
