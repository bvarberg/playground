import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { ConsoleAnalytics } from "./lib/console-analytics";
import { ConsoleErrorReporter } from "./lib/console-error-reporter";
import { reportWebVitals } from "./reportWebVitals";
import "./reset.css";

function getAnalytics() {
  return new ConsoleAnalytics();
}

function getErrorReporter() {
  return new ConsoleErrorReporter();
}

ReactDOM.render(
  <React.StrictMode>
    <App analytics={getAnalytics()} errorReporter={getErrorReporter()} />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
