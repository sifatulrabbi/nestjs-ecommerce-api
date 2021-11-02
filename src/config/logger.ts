export class Logger {
  log = (
    method: string,
    route: string,
    status: number,
    message: string,
    error?: string,
  ) => console.log(`[${method}] [${route}] [${status}]`, `[${message}]`, error);

  middleWareLogger(method: string, route: string, status: number) {
    console.log(`[${method}] [${status}] [${route}]`);
  }

  info(method: string, route: string, status: number, message: string) {
    this.log(method, route, status, message);
  }

  error(
    method: string,
    route: string,
    status: number,
    message: string,
    error?: string,
  ) {
    this.log(method, route, status, message, error);
  }
}
