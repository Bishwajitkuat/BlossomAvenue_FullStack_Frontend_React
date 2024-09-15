import { LoginResponseDto } from "../../utils/types/authentication";
import { axiosPublic } from "./axios";

export const getAuth = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponseDto> => {
  const response = await axiosPublic.post(
    "/Auth/login",
    JSON.stringify(credentials),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return response.data;
};

export const getRefreshToken = async (
  accessToken: string
): Promise<LoginResponseDto> => {
  const response = await axiosPublic.get("/Auth/refreshToken", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response.data;
};
