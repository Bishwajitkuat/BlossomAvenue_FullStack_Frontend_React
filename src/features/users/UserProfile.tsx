import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import useGetUserProfile from "../../hooks/User/useGetUserProfile";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";
import { UpdateUserProfileDto } from "../../utils/types/user";
import useUpdateProfile from "../../hooks/User/useUpdateProfile";

function UserProfile() {
  const { isLoading, userProfile, isError, error } = useGetUserProfile();
  const { isUserUpdatePending, updateUser } = useUpdateProfile();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Finland");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName);
      setLastName(userProfile.lastName);
      setEmail(userProfile.email);
      setContactNumber(userProfile.userContactNumbers[0].contactNumber);
      setAddressLine1(userProfile.userAddresses[0].address.addressLine1);
      if (userProfile?.userAddresses[0].address?.addressLine2) {
        setAddressLine2(userProfile.userAddresses[0].address.addressLine2);
      }
      setPostCode(userProfile.userAddresses[0].address.postCode);
      setCity(userProfile.userAddresses[0].address.city);
      setCountry(userProfile.userAddresses[0].address.country);
    }
  }, [userProfile]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: UpdateUserProfileDto = {
      userId: userProfile?.userId as string,
      firstName,
      lastName,
      userContactNumbers: [
        {
          contactNumberId: userProfile?.userContactNumbers[0]
            .contactNumberId as string,
          contactNumber: contactNumber,
        },
      ],
      userAddresses: [
        {
          userAddressId: userProfile?.userAddresses[0].userAddressId as string,
          defaultAddress: true,
          address: {
            addressDetailId: userProfile?.userAddresses[0].address
              .addressDetailId as string,
            fullName: `${firstName} ${lastName}`,
            addressLine1,
            addressLine2: addressLine2 ? addressLine2 : null,
            postCode,
            city,
            country,
          },
        },
      ],
    };

    updateUser(user);
    setIsEditing(false);
  };
  if (isLoading) return <Loader />;
  if (isError && error) return <Error message={error?.message} />;
  return (
    <div className="min-h-full mt-[5rem] w-full flex-col flex items-center justify-center">
      <h2 className="text-[2rem] font-bold mb-6 text-center">Profile </h2>

      <div className="bg-slate-200/10 min-w-[50%] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-end pb-8">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-[1.2rem] text-blue-400 flex gap-2 items-center rounded-full px-4 py-1 font-semibold uppercase tracking-widest shadow-sm shadow-zinc-500 outline-none duration-200 ease-in hover:bg-lime-50/30"
          >
            <CiEdit /> Edit
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex gap-4">
            {/* First Name */}
            <div className="mb-4 w-full">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                required
                value={firstName}
                disabled={!isEditing}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4 w-full">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                value={lastName}
                disabled={!isEditing}
                required
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* Email */}
            <div className="mb-4 w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                required
                value={email}
                disabled={true}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="user@example.com"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4 w-full">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                required
                value={contactNumber}
                disabled={!isEditing}
                onChange={(e) => setContactNumber(e.target.value)}
                type="tel"
                id="contactNumber"
                name="contactNumber"
                placeholder="Contact Number"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Address Line 1 */}
          <div className="mb-4">
            <label
              htmlFor="addressLine1"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line 1
            </label>
            <input
              required
              value={addressLine1}
              disabled={!isEditing}
              onChange={(e) => setAddressLine1(e.target.value)}
              type="text"
              id="addressLine1"
              name="addressLine1"
              placeholder="Address Line 1"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Address Line 2 */}
          <div className="mb-4">
            <label
              htmlFor="addressLine2"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line 2
            </label>
            <input
              value={addressLine2}
              disabled={!isEditing}
              onChange={(e) => setAddressLine2(e.target.value)}
              type="text"
              id="addressLine2"
              name="addressLine2"
              placeholder="Address Line 2"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex gap-4">
            {/* Post Code */}
            <div className="mb-4 w-full">
              <label
                htmlFor="postCode"
                className="block text-sm font-medium text-gray-700"
              >
                Post Code
              </label>
              <input
                required
                value={postCode}
                disabled={!isEditing}
                onChange={(e) => setPostCode(e.target.value)}
                type="text"
                id="postCode"
                name="postCode"
                placeholder="Post Code"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* City */}
            <div className="mb-4 w-full">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                required
                value={city}
                disabled={!isEditing}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Country */}
            <div className="mb-4 w-full">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                required
                value={country}
                disabled={!isEditing}
                onChange={(e) => setCountry(e.target.value)}
                name="country"
                id="country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
              >
                <option value="Finland">Finland</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              disabled={!isEditing || isUserUpdatePending}
              type="submit"
              className={
                isEditing
                  ? "w-[40%] m-12 rounded-full bg-pink-300 px-12 py-3 font-semibold uppercase tracking-widest shadow-sm shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-400"
                  : "w-[40%] m-12 rounded-full bg-gray-300 px-12 py-3 font-semibold uppercase tracking-widest shadow-sm shadow-zinc-500 outline-none"
              }
            >
              {isUserUpdatePending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
