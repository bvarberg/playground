// at the entry point
declare module ‘service-locator’ {
  interface ServicesMap {
    api: API;
    logger: Logger;
  }
}

locator.register(‘api’, new GraphAPIClient())
locator.register(‘logger’, new ConsoleLogger())

render(
  <ServiceLocatorProvider locator={locator}>
    <App />
  </ServiceLocatorProvider>
)

// elsewhere…
const [api, logger] = useServices([‘api’, ‘logger’])
api.fetchCollection() // typed?
logger.error(err) // typed?


// still elsewhere
const locator = useLocator()

declare module ‘service-locator’ {
  interface ServicesMap {
    otherAPI: API;
  }
}

locator.register(‘otherAPI’, new APIClient({
  authToken: ‘something that wasn’t available at entry’)
}))
