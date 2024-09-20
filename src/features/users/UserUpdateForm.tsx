import { useEffect, useState } from "react";
import { ReadUserDto } from "../../utils/types/user";
import useUpdateUserByAdmin from "../../hooks/User/useUpdateUserByAdmin";
import useDeleteUserByAdmin from "../../hooks/User/useDeleteUserByAdmin";

function UserUpdateForm({ user }: { user: ReadUserDto }) {
  const { isUserUpdatePending, updateUser } = useUpdateUserByAdmin();
  const { isUserDeletePending, deleteUser } = useDeleteUserByAdmin();
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    setRole(user.userRole);
    setStatus(user?.isUserActive !== null ? "Active" : "Inactive");
  }, [user]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = {
      userRole: role,
      isUserActive: status === "Active" ? true : false,
    };
    const updatedUserWithId = {
      updatedUser,
      userId: user.userId,
    };
    updateUser(updatedUserWithId);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col h-full gap-8 py-4">
        <div className="flex flex-col gap-2 justify-around">
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            name="role"
            id="role"
            className="py-2 px-4 w-[50%] rounded-md outline-none shadow-md"
          >
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
            <option value="Customer">Customer</option>
          </select>
          <select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            name="status"
            id="status"
            className="py-2 px-4 w-[50%] rounded-md outline-none shadow-md"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            disabled={isUserUpdatePending || isUserDeletePending}
            type="submit"
            className="border-2 border-lime-300/50 bg-lime-200/30 rounded-md px-4 py-2 shadow-md hover:bg-lime-100"
          >
            {isUserUpdatePending ? "Updating..." : "Update"}
          </button>
          <button
            onClick={() => deleteUser(user.userId)}
            disabled={isUserUpdatePending || isUserDeletePending}
            type="button"
            className="border-2 border-red-400/30 bg-orange-200 rounded-md px-4 py-2 shadow-md hover:bg-red-400"
          >
            {isUserDeletePending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserUpdateForm;
