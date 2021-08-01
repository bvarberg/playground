import { Analytics } from "../../services/analytics";

export class ConsoleAnalytics implements Analytics {
  async track(params: { eventName: string; payload?: unknown }): Promise<void> {
    console.groupCollapsed(`[ANALYTICS] ${params.eventName}`);
    console.log({ payload: params.payload });
    console.groupEnd();
  }
}
