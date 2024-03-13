exports.getSuccess = (payload = null, message = 'OK') => ({
  status: 200,
  errorCode: null,
  message,
  payload
});

exports.getCreated = (payload = null, message = 'Created') => ({
  status: 201,
  errorCode: null,
  message,
  payload
});

exports.getBadRequest = (error = [null, 'Bad Request']) => ({
  status: 400,
  errorCode: error[0],
  errorMessage: error[1],
  payload: null
});

exports.getException = (error = [null, 'Internal Server Error']) => ({
  status: 500,
  errorCode: error[0],
  errorMessage: error[1],
  payload: null
});


exports.getNotFound = (error = [null, 'Resource Not Found']) => ({
  status: 404,
  errorCode: error[0],
  errorMessage: error[1],
  payload: null
});

exports.getUnauthorized = (error = [null, 'Unauthorized']) => ({
  status: 401,
  errorCode: error[0],
  errorMessage: error[1],
  payload: null
});


exports.getAccessDenied = (error = [null, 'Forbidden']) => ({
  status: 403,
  errorCode: error[0],
  errorMessage: error[1],
  payload: null
});
