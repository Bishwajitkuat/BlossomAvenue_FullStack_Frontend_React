import { ReadAddressDetailDto } from "./user";

export interface ShippingAddressPropsType {
  fullName: string;
  setFullName: (value: string) => void;
  addressLine1: string;
  setAddressLine1: (value: string) => void;
  postCode: string;
  setPostCode: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
}

export interface CreateShippingAddressDto {
  fullName: string;
  addressLine1: string;
  addressLine2: string | null;
  postCode: string;
  city: string;
  country: string;
}

export interface CreateOrderDto {
  addressDetailId: string | null;
  shippingAddress: CreateShippingAddressDto;
}

export interface ReadOrderDto {
  orderId: string;
  createdAt: string | null;
  totalAmount: number;
  orderStatus: string;
  shippingAddress: ReadAddressDetailDto;
  orderItems: ReadOrderItemDto[];
}

export interface ReadOrderItemDto {
  orderItemsId: string;
  quantity: number;
  price: number;
  variationId: string;
  variationName: string;
  productId: string;
  title: string;
  imageUrl: string;
}
