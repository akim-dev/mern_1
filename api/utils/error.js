export const errorHandle = (statusCode, message) => {
  const error = new Error();
  error.message = message;
  return error;
};
