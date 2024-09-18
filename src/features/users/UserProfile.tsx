import React from "react";
import useGetUserProfile from "../../hooks/User/useGetUserProfile";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";

function UserProfile() {
  const { isLoading, userProfile, isError, error } = useGetUserProfile();
  if (isLoading) return <Loader />;
  if (isError && error) return <Error message={error?.message} />;
  return (
    <div className="w-full h-full py-8 px-8 ">
      <h1 className="text-center text-2xl tracking-widest font-semibold pb-8">
        Profile
      </h1>
      <h2 className=" text-xl tracking-widest font-semibold pb-8">
        Basic information
      </h2>
      <ul className="grid gap-4 text-xl tracking-wide">
        <li>First name: {userProfile?.firstName}</li>
        <li>Last name: {userProfile?.lastName}</li>
        <li>Email: {userProfile?.email}</li>
        <li>
          <h2 className=" text-xl tracking-widest font-semibold py-4 ">
            Contact numbers
          </h2>
          <ul>
            {userProfile?.userContactNumbers.map((cn) => (
              <li key={cn.contactNumberId}>{cn.contactNumber}</li>
            ))}
          </ul>
        </li>
        <li>
          <h2 className=" text-xl tracking-widest font-semibold py-4">
            Addresses
          </h2>
          <ul>
            {userProfile?.userAddresses.map((ad) => (
              <li key={ad.userAddressId}>
                <ul className="grid gap-4">
                  {ad?.defaultAddress ? <li>Default address</li> : ""}

                  <li>Address line: 1: {ad?.address?.addressLine1}</li>
                  <li>Address line: 2 {ad?.address?.addressLine2}</li>
                  <li>Post Code: {ad?.address?.postCode}</li>
                  <li>City: {ad?.address?.city}</li>
                  <li>Country: {ad?.address?.country}</li>
                </ul>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;
