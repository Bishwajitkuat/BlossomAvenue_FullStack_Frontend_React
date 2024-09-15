import { useGetAuthFromLocalStorage } from "./useGetAuthFromLocalStorage";
import { useMutation } from "@tanstack/react-query";
import { getRefreshToken } from "../../services/api/authentication";
import useSetAuthToLocalStorage from "./useSetAuthToLocalStorage";

function useRefreshToken() {
  const { userAuth } = useGetAuthFromLocalStorage();
  const { setToLocalStorage } = useSetAuthToLocalStorage();
  // get new access token and set to local storage
  const { isPending, mutate: getNewAccessToken } = useMutation({
    mutationFn: () => getRefreshToken(userAuth!.token),
    onSuccess: (data) => {
      setToLocalStorage(data);
    },
    onError: (error) => console.log(error.message),
  });

  return { isPending, getNewAccessToken };
}

export default useRefreshToken;
