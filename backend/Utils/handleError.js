class HandleError extends Error {
  constructor(message, statusCode) {
    super(JSON.stringify(message));
    this.statusCode = statusCode;
    this.success = false;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default HandleError;
