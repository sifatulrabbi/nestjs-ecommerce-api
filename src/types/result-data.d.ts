declare type IResData<T> = Promise<{
  statusCode: number;
  message: string;
  error?: string;
  data?: T;
}>;
