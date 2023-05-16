/**
 * Handling error using a class based approach.
 * @class ApplicationError - The base class for all errors.
 */
class ApplicationError extends Error {
  public message: string;

  constructor(message: string, options = {}) {
    super(message);
    this.message = message;
    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }

  get name(): string {
    return this.constructor.name;
  }
}

export class DatabaseError extends ApplicationError {
  readonly statusCode = 500;
}

export class ServerError extends ApplicationError {
  readonly statusCode = 500;
}

export class UserFacingError extends ApplicationError {
}
