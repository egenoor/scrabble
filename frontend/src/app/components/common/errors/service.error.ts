export class ServiceError extends Error {
  error: {
    message: string
  } = {
    message: ""
  }
  constructor(message: string) {
    super(message)
    this.error.message = message
  }
}