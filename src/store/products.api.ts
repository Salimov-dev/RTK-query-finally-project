import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  IErrorResponse,
  IProduct,
  IProductResponse,
  IProductUpdate,
  ProductInput
} from "../types/product.types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query<IProduct[], void>({
      query: () => "products",
      transformResponse: (response: IProductResponse) => response.products,
      transformErrorResponse: (response: IErrorResponse) => ({
        status: response.status,
        message:
          response.data.message || "Произошла ошибка при загрузке продуктов"
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 600
    }),

    addProduct: build.mutation<IProduct, ProductInput>({
      query: (newProduct) => ({
        url: `products/add`,
        method: "POST",
        body: newProduct
      }),
      invalidatesTags: ["Products"],
      transformErrorResponse: (response: IErrorResponse) => ({
        status: response.status,
        message:
          response.data.message || "Произошла ошибка при создании продукта"
      })
    }),

    updateProduct: build.mutation<IProduct, IProductUpdate>({
      query: ({ id, product }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: product
      }),
      invalidatesTags: ["Products"],
      transformErrorResponse: (response: IErrorResponse) => ({
        status: response.status,
        message:
          response.data.message || "Произошла ошибка при обновлении продукта"
      })
    }),

    deleteProduct: build.mutation<void, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Products"],
      transformErrorResponse: (response: IErrorResponse) => ({
        status: response.status,
        message:
          response.data.message || "Произошла ошибка при удалении продукта"
      })
    })
  })
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productsApi;
