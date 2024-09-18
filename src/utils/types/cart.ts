export interface CreateCartItemsDto {
  productId: string;
  variationId: string;
  quantity: number;
}

export interface ReadCartItemDto {
  cartItemsId: string;
  productId: string;
  variationId: string;
  variationName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  title: string;
}

export interface ReadCartDto {
  cartId: string;
  cartItems: ReadCartItemDto[];
}
