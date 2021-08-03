import { ReactNode } from "react";
import {
  ErrorBoundary,
  ErrorBoundaryProps,
  FallbackProps,
} from "react-error-boundary";
import { useServices } from "./packages/service-locator";
import { Service } from "./services";

interface GlobalErrorBoundaryProps {
  children?: ReactNode | undefined;
}

export const GlobalErrorBoundary = ({ children }: GlobalErrorBoundaryProps) => {
  const services = useServices([Service.ERROR_REPORTER]);
  const [errorReporter] = services;

  const onError: ErrorBoundaryProps["onError"] = (error) => {
    errorReporter.record(error);
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
};

const Fallback = (_props: FallbackProps) => {
  return (
    <div>
      <h1>😬 Oof.</h1>
      <p>Things could have gone better...</p>
    </div>
  );
};
