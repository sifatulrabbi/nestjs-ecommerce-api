declare interface IResultData<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
}
