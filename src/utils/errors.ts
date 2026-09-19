export class AppError extends Error {
  public statusCode: number;
  public textMessage: string;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.textMessage = message;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  public details?: unknown;

  constructor(message: string = "Validation error", details?: unknown) {
    super(message, 400);
    this.details = details;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
