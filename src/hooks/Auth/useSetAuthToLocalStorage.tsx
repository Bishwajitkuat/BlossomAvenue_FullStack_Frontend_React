import { useEffect } from "react";
import { LoginResponseDto } from "../../utils/types/authentication";

const useSetAuthToLocalStorage = () => {
  const setToLocalStorage = (data: LoginResponseDto) => {
    localStorage.setItem("blossom_avenue_user_auth", JSON.stringify(data));
  };

  return { setToLocalStorage };
};

export default useSetAuthToLocalStorage;
