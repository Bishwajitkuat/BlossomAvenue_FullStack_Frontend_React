export interface PaginatedResponse<T> {
  itemPerPage: number;
  currentPage: number;
  totalPageCount: number;
  totalItemCount: number;
  items: T[];
}

export interface GetAllProductReadDto {
  productId: string;
  title: string;
  description: string;
  imageUrl: string;
  minPrice: number;
  inventory: number;
  avgStar: number;
}

export interface ReadProductReviewDto {
  reviewId: string;
  review: string | null;
  star: number | null;
  userName: string;
}

export interface ReadProductCategoryDto {
  productCategoryId: string;
  categoryId: string;
  productId: string;
  categoryName: string;
}
export interface Image {
  imageId: string;
  imageUrl: string;
  productId: string;
}

export interface Variation {
  variationId: string;
  variationName: string;
  price: number;
  inventory: number;
  productId: string;
}

export interface GetProductByIdReadDto {
  productId: string;
  title: string;
  description: string;
  images: Image[];
  variations: Variation[];
  productCategories: ReadProductCategoryDto[];
  productReviews: ReadProductReviewDto[];
  avgStar: number;
}

export interface ProductReviewCreateDto {
  userId: string | null;
  productId: string | null;
  review: string;
  star: string;
}
