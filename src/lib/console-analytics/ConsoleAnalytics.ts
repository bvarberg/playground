import { Analytics } from "../../services/analytics";

export class ConsoleAnalytics implements Analytics {
  async track(params: { eventName: string; payload?: unknown }): Promise<void> {
    console.log(`[ANALYTICS] ${params.eventName}`, { payload: params.payload });
  }
}
