import MapPinIcon from "../../components/ui/icons/MapPinIcon";
import { ShippingAddressPropsType } from "../../utils/types/order";

function ShippingAddress({
  fullName,
  setFullName,
  addressLine1,
  setAddressLine1,
  postCode,
  setPostCode,
  city,
  setCity,
  country,
  setCountry,
}: ShippingAddressPropsType) {
  return (
    <div className="flex justify-center">
      <div className="m-2 rounded-md bg-pink-900/10 p-2 shadow-md shadow-zinc-900/30 md:m-8 md:w-full md:p-8">
        <form className="grid w-full gap-4">
          <div className="grid gap-4">
            <div className="flex items-center py-8 text-2xl">
              <div className="flex h-full items-center justify-center  px-2">
                <MapPinIcon />
              </div>
              <p>Address</p>
            </div>
            <div className="flex items-center rounded-full bg-pink-100">
              <label className="min-w-[7rem] border-e border-pink-400 py-4 px-4">
                Name
              </label>
              <input
                className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                type="text"
                name="customer"
                placeholder="eg: John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center rounded-full bg-pink-100">
              <label
                htmlFor="address"
                className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
              >
                Address
              </label>
              <input
                className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                type="text"
                name="address"
                placeholder="eg: Talonpojantie 7 as 101"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center rounded-full bg-pink-100">
                <label
                  htmlFor="postCode"
                  className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
                >
                  Post Code
                </label>
                <input
                  className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                  type="text"
                  name="postCode"
                  placeholder="eg: 00790"
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center rounded-full bg-pink-100">
                <label
                  htmlFor="city"
                  className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
                >
                  City
                </label>
                <input
                  className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                  type="text"
                  name="city"
                  placeholder="eg: Helsinki"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center rounded-full bg-pink-100">
                <label
                  htmlFor="country"
                  className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
                >
                  Country
                </label>
                <input
                  className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                  type="text"
                  name="Country"
                  placeholder="eg: Finland"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShippingAddress;
