const httpStatusCode = {
    BAD_REQUEST: 400,
    INTERNAL_SERVER: 500,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
  };

  const error = (err, _req, res, _next) => {
    const { code } = err;
    if (!code) return res.status(httpStatusCode.INTERNAL_SERVER).json({ message: err.message });
    return res.status(httpStatusCode[code]).json({ message: err.message });
  };
  
  module.exports = error;