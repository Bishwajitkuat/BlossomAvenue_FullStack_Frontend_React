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
