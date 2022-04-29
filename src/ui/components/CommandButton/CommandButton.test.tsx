import { RenderOptions, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import td from "testdouble";
import {
  Locator,
  ServiceLocatorProvider,
} from "../../../packages/service-locator";
import { ANALYTICS, ERROR_REPORTER } from "../../../services";
import { Analytics } from "../../../services/analytics";
import { ErrorReporter } from "../../../services/errorReporter";
import { CommandButton } from "./CommandButton";

/**
 * 👆 Maybe this is a sign to export Service enum + interfaces as a single
 * module.
 *
 * Or to not group the ServiceKeys as an enum -- just import them from the
 * service that they are related to.
 */

describe("CommandButton", () => {
  it("tracks clicks with the analytics service", () => {
    const mockAnalytics = td.object<Analytics>();
    const mockErrorReporter = td.object<ErrorReporter>();
    const locator = new Locator();
    locator.register(ANALYTICS, mockAnalytics);
    locator.register(ERROR_REPORTER, mockErrorReporter);
    const wrapper: RenderOptions["wrapper"] = ({ children }) => (
      <ServiceLocatorProvider value={locator}>
        {children}
      </ServiceLocatorProvider>
    );

    render(<CommandButton />, { wrapper });
    userEvent.click(screen.getByRole("button"));

    td.verify(
      mockAnalytics.track({
        eventName: "action:click",
      })
    );
  });

  describe("after clicking more than 2 times", () => {
    it("reports an error to the errorReporter", () => {
      const mockAnalytics = td.object<Analytics>();
      const mockErrorReporter = td.object<ErrorReporter>();
      const locator = new Locator();
      locator.register(ANALYTICS, mockAnalytics);
      locator.register(ERROR_REPORTER, mockErrorReporter);

      render(<CommandButton />, {
        wrapper: ({ children }) => (
          <ServiceLocatorProvider value={locator}>
            {children}
          </ServiceLocatorProvider>
        ),
      });
      userEvent.click(screen.getByRole("button"));
      userEvent.click(screen.getByRole("button"));
      userEvent.click(screen.getByRole("button"));

      td.verify(mockErrorReporter.record(td.matchers.isA(Error)), { times: 1 });
    });
  });
});
