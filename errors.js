export class ValidationError extends Error {
  constructor(errors) {
    super("Validation error");
    this.statusCode = 422;
    this.errors = errors;
  }
}

export class AuthenticationError extends Error {
  constructor() {
    super("Atuhentication error");
    this.statusCode = 401;
  }
}

export class NotFoundError extends Error {
  constructor(id) {
    super(`Object not found: ${id}`);
    this.statusCode = 404;
  }
}
