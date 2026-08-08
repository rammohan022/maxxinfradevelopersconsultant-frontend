export const getErrorMessage = (error: any): string => {
  if (!error) return "An unexpected error occurred.";

  // RTK Query errors usually have error.data.message
  if (error.data && error.data.message) {
    if (Array.isArray(error.data.message)) {
      return error.data.message.join(", ");
    }
    return error.data.message;
  }

  if (error.message) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred.";
};
