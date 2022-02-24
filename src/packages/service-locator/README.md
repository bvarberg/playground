# service-locator

One take on the service locator pattern.

Re-implements a version of
[react-decoupler](https://github.com/testdouble/react-decoupler) but with fewer
features, and with TypeScript.

Helpful to avoid many layers of service object Provider components:

```tsx
function App() {
  return (
    <LoggerProvider>
      <ErrorHandlerProvider>
        <APIProvider>
          <OtherServiceProvider>{/* ... */}</OtherServiceProvider>
        </APIProvider>
      </ErrorHandlerProvider>
    </LoggerProvider>
  );
}
```
