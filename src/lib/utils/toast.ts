import { toast } from "react-hot-toast";

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (error: any, defaultMessage = "Something went wrong") => {
  if (typeof error === "string") {
    toast.error(error);
    return;
  }
  
  const apiMessage = error?.data?.message || error?.message;
  if (apiMessage) {
    if (Array.isArray(apiMessage)) {
      toast.error(apiMessage.join(", "));
    } else {
      toast.error(apiMessage);
    }
  } else {
    toast.error(defaultMessage);
  }
};

export const showLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId?: string) => {
  toast.dismiss(toastId);
};
