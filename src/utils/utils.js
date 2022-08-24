export const successResponse = (data) => {
  return {
    status: 'success',
    code: 200,
    data,
  };
};

export const errorResponse = (code, message) => {
  return {
    status: 'error',
    code,
    message,
  };
};
