import { createSlice, type Dispatch } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { IProduct } from "../types/product.types";

interface IProductStore {
  entities: IProduct[];
  isLoading: boolean;
  error: string | null;
  lastFetch: string | null;
}

const initialState: IProductStore = {
  entities: [],
  isLoading: false,
  error: null,
  lastFetch: null
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    productsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = new Date().toISOString();
    },
    productsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceived, productsFailed } = actions;

export const loadProductsList =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().products;

    const isOutDated = lastFetch
      ? (new Date().getTime() - new Date(lastFetch).getTime()) / 1000 / 60 > 10
      : true;

    if (isOutDated) {
      dispatch(productsRequested());
      try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error("Не удалось загрузить продукты");
        }

        const data = await response.json();
        dispatch(productsReceived(data.products));
      } catch (error) {
        dispatch(
          productsFailed(
            error instanceof Error ? error.message : "Неизвестная ошибка"
          )
        );
      }
    }
  };

export const getProducts = (state: RootState) => state.products.entities;
export const getProductsLoading = (state: RootState) =>
  state.products.isLoading;

export default productsReducer;
