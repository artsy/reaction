export class HTTPError extends Error {
  public statusCode: number
  public body?: string

  constructor(message: string, statusCode: number, body?: string) {
    super(message)
    this.statusCode = statusCode
    this.body = body
    Error.captureStackTrace(this, this.constructor)
  }

  // This alias exists because Force already looks for that property on errors.
  get status() {
    return this.statusCode
  }
}
