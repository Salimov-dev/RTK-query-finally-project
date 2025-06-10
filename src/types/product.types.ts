export interface IProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
  description: string;
}

export type ProductInput = Omit<IProduct, "id">;

export interface IProductUpdate {
  id: number;
  product: Partial<IProduct>;
}

export interface IProductResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IErrorResponse {
  status: number;
  data: {
    message: string;
  };
}
