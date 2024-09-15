import { ReadUserProfileDto } from "../../utils/types/user";
import useAxiosPrivate from "../useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

function useGetUserProfile() {
  const axioPrivate = useAxiosPrivate();
  const getUserProfile = async (): Promise<ReadUserProfileDto> => {
    const res = await axioPrivate.get("/users/profile");
    return res.data;
  };

  const {
    isPending: isLoading,
    data: userProfile,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });
  return { isLoading, userProfile, isError, error };
}

export default useGetUserProfile;
