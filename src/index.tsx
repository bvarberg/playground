import React from "react";
import ReactDOM from "react-dom";
import { ConsoleAnalytics } from "./lib/console-analytics";
import { ConsoleErrorReporter } from "./lib/console-error-reporter";
import { FakeAuthProvider } from "./lib/fake-auth-provider";
import { reportWebVitals } from "./lib/web-vitals";
import { App } from "./ui/App";

/*
 * Configure the non-React services here.
 */

function getAnalytics() {
  return new ConsoleAnalytics();
}

function getErrorReporter() {
  return new ConsoleErrorReporter();
}

function getAuthProvider() {
  return new FakeAuthProvider();
}

const analytics = getAnalytics();
const auth = getAuthProvider();
const errorReporter = getErrorReporter();

ReactDOM.render(
  <React.StrictMode>
    <App analytics={analytics} auth={auth} errorReporter={errorReporter} />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals((metric) =>
  analytics.track({
    eventName: `web-vital:${metric.name}`,
    payload: {
      metric,
    },
  })
);
