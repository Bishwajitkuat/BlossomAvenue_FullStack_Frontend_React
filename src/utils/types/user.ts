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
