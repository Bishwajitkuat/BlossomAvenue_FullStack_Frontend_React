export interface ReadUserContactNumberDto {
  contactNumberId: string;
  contactNumber: string;
}

export interface ReadUserAddressDto {
  userAddressId: string;
  defaultAddress: boolean | null;
  address: ReadAddressDetailDto;
}

export interface ReadAddressDetailDto {
  addressDetailId: string;
  fullName: string;
  addressLine1: string;
  postCode: string;
  addressLine2: string | null;
  city: string;
  country: string;
}

export interface ReadUserProfileDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  userContactNumbers: ReadUserContactNumberDto[];
  userAddresses: ReadUserAddressDto[];
}

export interface ReadUserDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  userRole: string;
  isUserActive: boolean | null;
  createdAt: string | null;
  userContactNumbers: ReadUserContactNumberDto[];
  userAddresses: ReadUserAddressDto[];
}

export interface CreateUserProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  contactNumbers: string[];
  addressLine1: string;
  addressLine2: string | null;
  postCode: string;
  city: string;
  country: string;
  password: string;
  userName: string;
}

// user profile update

export interface UpdateUserProfileDto {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  userContactNumbers: UpdateUserContactNumber[] | null;
  userAddresses: UpdateUserAddress[] | null;
}

export interface UpdateUserContactNumber {
  contactNumberId: string | null;
  contactNumber: string;
}

export interface UpdateUserAddress {
  userAddressId: string | null;
  defaultAddress: boolean | null;
  address: UpdateAddressDetail;
}

export interface UpdateAddressDetail {
  addressDetailId: string | null;
  fullName: string;
  addressLine1: string;
  addressLine2: string | null;
  postCode: string;
  city: string;
  country: string;
}
