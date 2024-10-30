import { ToastSeverity } from "@/store/features/toast/module";

export const statusToString = (status: number): ToastSeverity => {
  const string: { [key: number]: ToastSeverity } = {
    200: "success",
    400: "error",
    401: "error",
    404: "error",
    500: "error",
  };

  return string[status] ?? "info";
};
