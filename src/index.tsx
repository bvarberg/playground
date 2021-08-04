import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { ConsoleAnalytics } from "./lib/console-analytics";
import { ConsoleErrorReporter } from "./lib/console-error-reporter";
import { FakeAuthProvider } from "./lib/fake-auth-provider";
import { reportWebVitals } from "./reportWebVitals";
import "./reset.css";

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

ReactDOM.render(
  <React.StrictMode>
    <App
      analytics={getAnalytics()}
      auth={getAuthProvider()}
      errorReporter={getErrorReporter()}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
