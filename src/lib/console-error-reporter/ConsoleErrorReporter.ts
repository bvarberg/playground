import { ErrorReporter } from "../../services/errorReporter";

export class ConsoleErrorReporter implements ErrorReporter {
  async record(error: Error): Promise<void> {
    console.error(`[ERROR]: ${error.name}: ${error.message}`, {
      error,
    });
  }
}
