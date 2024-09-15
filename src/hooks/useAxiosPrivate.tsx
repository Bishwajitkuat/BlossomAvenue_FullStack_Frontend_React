import { useEffect } from "react";
import { axiosPrivate } from "../services/api/axios";
import useRefreshToken from "./Auth/useRefreshToken";
import { useGetAuthFromLocalStorage } from "./Auth/useGetAuthFromLocalStorage";

const useAxiosPrivate = () => {
  const { isPending, getNewAccessToken } = useRefreshToken();
  const { userAuth } = useGetAuthFromLocalStorage();
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${userAuth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          getNewAccessToken();
          prevRequest.headers["Authorization"] = `Bearer ${userAuth?.token}`;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [isPending, getNewAccessToken, userAuth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
