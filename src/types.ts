export interface IInfo {
  namespace: string;
  status: number;
  message: string;
  object?: any;
}

export interface ILogger {
  info(info: IInfo): void;
  error(info: IInfo): void;
}
