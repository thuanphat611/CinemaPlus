import { toast } from "react-toastify";

export function ApiErrorHandler(error) {
  if (error.response) {
    toast.error(
      error.response.data.message ?? "Some error occurred, please try again."
    );
  } else if (error.request) {
    toast.error("Network Error");
  } else {
    toast.error(error.message ?? "Some error occurred, please try again.");
  }
}
