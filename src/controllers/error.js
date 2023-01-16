import AppError from '../utils/appError';

const handleJWTError = () =>
  new AppError('Invalid token. Please login again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please login again.', 401);

const sendErrorDev = (err, res, req) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res, req) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};
const handleJoiError = (err, res, req) => {
  if (err.message.includes('/^[a-zA-Z]{3,30}$/')) {
    return res.status(422).json({
      status: 422,
      message: 'Please use non alphanumeric password.',
    });
  }
  res.status(422).json({
    status: 422,
    message: err.message,
  });
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res, req);
  } else if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test'
  ) {
    let error = { ...err };
    error.message = err.message;
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.isJoi) return handleJoiError(err, res, req);
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res, req);
  }
};
