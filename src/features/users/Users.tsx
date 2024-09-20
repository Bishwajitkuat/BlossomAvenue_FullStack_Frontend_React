import Error from "../../components/ui/Error";
import Loader from "../../components/ui/Loader";
import useGetAllUsersByAdmin from "../../hooks/User/useGetAllUsersByAdmin";
import UsersTable from "./UsersTable";

function Users() {
  const { isUsersLoading, paginatedUsers, userError } = useGetAllUsersByAdmin();

  if (isUsersLoading) return <Loader />;
  if (userError) return <Error message={userError.message} />;
  return (
    <div className="h-full flex flex-col">
      <h1 className=" text-[2rem] text-center py-8 tracking-widest font-semibold">
        Users
      </h1>
      <div className="grow">
        {paginatedUsers?.items && Array.isArray(paginatedUsers?.items) && (
          <UsersTable users={paginatedUsers.items} />
        )}
      </div>
      {/* <Pagination
        currentPage={paginatedUsers?.currentPage}
        itemPerPage={paginatedUsers?.itemPerPage}
        totalItemCount={paginatedUsers?.totalItemCount}
        totalPageCount={paginatedUsers?.totalPageCount}
      /> */}
    </div>
  );
}

export default Users;
