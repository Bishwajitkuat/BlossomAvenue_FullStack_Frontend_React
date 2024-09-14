import { LoginResponseDto } from "../../utils/types/authentication";

export const useGetAuthFromLocalStorage = () => {
  const getUserAuth = () => {
    const userAuthDatFromLocalStorage = localStorage.getItem(
      "blossom_avenue_user_auth"
    );
    if (userAuthDatFromLocalStorage !== null) {
      const obj: LoginResponseDto = JSON.parse(userAuthDatFromLocalStorage);
      return obj;
    }
  };
  const userAuth: LoginResponseDto | undefined = getUserAuth();

  return { userAuth };
};
