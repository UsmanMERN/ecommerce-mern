// Helper function to handle errors
const handleError = (res, statusCode, errorMessage) => {
  console.error(errorMessage);
  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default handleError;
