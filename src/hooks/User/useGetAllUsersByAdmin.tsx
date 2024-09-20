import useAxiosPrivate from "../useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "../../utils/types/product";
import { ReadUserDto } from "../../utils/types/user";

function useGetAllUsersByAdmin() {
  const axioPrivate = useAxiosPrivate();
  const getAllUsers = async (): Promise<PaginatedResponse<ReadUserDto>> => {
    const res = await axioPrivate.get("/users");
    return res.data;
  };

  const {
    isPending: isUsersLoading,
    data: paginatedUsers,
    error: userError,
  } = useQuery({
    queryKey: ["users", "admin"],
    queryFn: getAllUsers,
  });
  return { isUsersLoading, paginatedUsers, userError };
}

export default useGetAllUsersByAdmin;
