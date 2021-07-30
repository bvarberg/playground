# Service Locator

Exploring the service locator pattern. Re-implementing a version of
[react-decoupler](https://github.com/testdouble/react-decoupler) but with fewer
features, and in TypeScript.

## Feature tests

```ts
// role_performs_some_action.spec.ts
// a new file for every feature

// feature: the job story as code
// reflects the filename + feature focus
context("Role performs some action", () => {
  // scenario: one potential outcome for the feature
  specify("they see the some view", () => {});
  specify("using the textbox to enter their value", () => {});
});
```
