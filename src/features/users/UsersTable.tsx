import { ReadUserDto } from "../../utils/types/user";
import UserUpdateForm from "./UserUpdateForm";

function UsersTable({ users }: { users: ReadUserDto[] }) {
  return (
    <div>
      <ul className="w-full p-12 flex flex-col gap-4">
        <li className="w-full grid grid-cols-4 p-4 text-[1.5rem] tracking-widest font-semibold">
          <h2>Basic information</h2>
          <h2>Contact numbers</h2>
          <h2>Address</h2>
          <h2>Action</h2>
        </li>
        {users.map((user, index) => (
          <li
            key={user.userId}
            className="w-full grid grid-cols-4 p-8 border-2 border-gray-700/30 shadow-md rounded-md text-[1.2rem]"
          >
            <div>
              <p>First name: {user.firstName}</p>
              <p>Last name: {user.lastName}</p>
              <p>Email address: {user.email}</p>
              <p>Username: {user.userName}</p>
              <p>Registered at: {user.createdAt}</p>
            </div>
            <div>
              {user?.userContactNumbers &&
                Array.isArray(user.userContactNumbers) &&
                user.userContactNumbers.map((cn) => (
                  <p key={cn.contactNumberId}>{cn.contactNumber}</p>
                ))}
            </div>
            <div>
              {user?.userAddresses &&
                Array.isArray(user.userAddresses) &&
                user.userAddresses.map((ua) => (
                  <div key={ua.userAddressId}>
                    <p>{ua?.address?.fullName}</p>
                    <p>{ua?.address?.addressLine1}</p>
                    {ua?.address?.addressLine2 && (
                      <p>{ua?.address.addressLine2}</p>
                    )}
                    <p>
                      {ua?.address?.postCode}, {ua?.address?.city}
                    </p>
                    <p>{ua?.address?.country}</p>
                  </div>
                ))}
            </div>
            <UserUpdateForm user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersTable;
