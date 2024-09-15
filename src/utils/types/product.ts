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
