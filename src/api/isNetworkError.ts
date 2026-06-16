import axios from "axios";

export const isNetworkError = (error: any) => {
  return (
    axios.isAxiosError(error) &&
    (
      error.code === "ECONNABORTED" ||
      error.message === "Network Error" ||
      !error.response
    )
  );
};