export const getErrorMessage = (error: any): string => {
  if (!error) return "An unexpected error occurred.";

  // RTK Query errors with structured data message
  if (error.data) {
    if (error.data.message) {
      if (Array.isArray(error.data.message)) {
        return error.data.message.join(", ");
      }
      return String(error.data.message);
    }
    if (error.data.error) {
      return typeof error.data.error === "string"
        ? error.data.error
        : JSON.stringify(error.data.error);
    }
    if (typeof error.data === "string") {
      // Check if it's HTML like 413 Payload Too Large from Nginx/Server
      if (error.data.includes("413 Request Entity Too Large") || error.data.includes("Payload Too Large")) {
        return "Upload failed: File or content size is too large (413 Payload Too Large).";
      }
      if (error.data.includes("504 Gateway Time-out")) {
        return "Server timeout: The request took too long to process (504 Gateway Timeout).";
      }
      if (error.data.includes("502 Bad Gateway")) {
        return "Server error: Bad Gateway (502). Please check if backend is running.";
      }
      return error.data.length > 200 ? error.data.slice(0, 200) + "..." : error.data;
    }
  }

  if (error.status === 413 || error.originalStatus === 413) {
    return "Upload failed: File or content size is too large (413 Payload Too Large).";
  }

  if (error.status === "FETCH_ERROR") {
    return "Network error: Unable to connect to server. Please check your network or API status.";
  }

  if (error.error && typeof error.error === "string") {
    return error.error;
  }

  if (error.message) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred.";
};
