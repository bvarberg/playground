export interface ErrorReporter {
  record(error: Error): Promise<void>;
}
