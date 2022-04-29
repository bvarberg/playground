import { ReactNode } from "react";
import {
  ErrorBoundary,
  ErrorBoundaryProps,
  FallbackProps,
} from "react-error-boundary";
import { useServices } from "../packages/service-locator";
import { ERROR_REPORTER } from "../services";

interface ApplicationErrorBoundaryProps {
  children?: ReactNode | undefined;
}

export const ApplicationErrorBoundary = ({
  children,
}: ApplicationErrorBoundaryProps) => {
  const services = useServices([ERROR_REPORTER]);
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
