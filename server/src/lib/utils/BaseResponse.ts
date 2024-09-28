export class BaseResponse<T> {
  status!: number;
  message!: string;
  result!: T

  constructor(status: number, message: string, result: T) {
    this.status = status;
    this.message = message;
    this.result = result
  }
}