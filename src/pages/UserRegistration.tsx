import { useEffect, useState } from "react";
import { useGetAuthFromLocalStorage } from "../hooks/Auth/useGetAuthFromLocalStorage";
import { useNavigate } from "react-router-dom";
import { CreateUserProfileDto } from "../utils/types/user";
import useUserRegistration from "../hooks/Auth/useUserRegistration";

function UserRegistration() {
  const { userAuth } = useGetAuthFromLocalStorage();
  const navigate = useNavigate();
  const { isUserSingUpPending, createUser } = useUserRegistration();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Finland");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (userAuth?.isAuthenticated) navigate("/user");
  }, [userAuth]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: CreateUserProfileDto = {
      firstName,
      lastName,
      email,
      contactNumbers: [contactNumber],
      addressLine1,
      addressLine2: addressLine2 ? addressLine2 : null,
      postCode,
      city,
      country,
      password,
      userName,
    };

    createUser(user);
  };
  return (
    <div className="min-h-full w-full flex items-center justify-center">
      <div className="bg-slate-200/10 min-w-[30%] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

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
                onChange={(e) => setCountry(e.target.value)}
                name="country"
                id="country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
              >
                <option value="Finland">Finland</option>
              </select>
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              required
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              id="userName"
              name="userName"
              placeholder="Username"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              disabled={isUserSingUpPending}
              type="submit"
              className="w-[40%] m-12 rounded-full bg-pink-300 px-12 py-3 font-semibold uppercase tracking-widest shadow-sm shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-400 "
            >
              {isUserSingUpPending ? "Signing..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration;
