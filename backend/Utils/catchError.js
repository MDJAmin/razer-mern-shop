const catchError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.success = false;
  res.status(err.statusCode).json({
    success: err.success,
    message: err.message,
  });
};

export default catchError;
