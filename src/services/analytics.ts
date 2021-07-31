export interface Analytics {
  track(params: { eventName: string; payload?: unknown }): Promise<void>;
}
