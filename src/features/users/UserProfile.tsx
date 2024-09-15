import React from "react";
import useGetUserProfile from "../../hooks/User/useGetUserProfile";
import Loader from "../../components/ui/Loader";

function UserProfile() {
  const { isLoading, userProfile, isError, error } = useGetUserProfile();
  if (isLoading) return <Loader />;
  if (isError) return <h1>{error?.message}</h1>;
  console.log(userProfile);
  return (
    <div>
      <ul>
        <li>First name: {userProfile?.firstName}</li>
        <li>Last name: {userProfile?.lastName}</li>
        <li>Email: {userProfile?.email}</li>
        <li>
          Contact numbers:{" "}
          <ul>
            {userProfile?.userContactNumbers.map((cn) => (
              <li key={cn.contactNumberId}>{cn.contactNumber}</li>
            ))}
          </ul>
        </li>
        <li>
          Addresses
          <ul>
            {userProfile?.userAddresses.map((ad) => (
              <li key={ad.userAddressId}>
                <ul>
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
