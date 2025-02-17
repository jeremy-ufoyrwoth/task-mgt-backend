export class HttpException extends Error {
  status: number;
  message: string;
  stack?: string | undefined;
  name: string;
  errorCode?: string;

  constructor(
    status: number,
    message: string,
    name: string,
    errorCode?: string,
    stack?: string | undefined
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.stack = stack;
    this.name = name;
    this.errorCode = errorCode;
  }
}
