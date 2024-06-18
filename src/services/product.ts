import { API } from "../utils/api";

const searchProduct = async (key: string, page: string, amount: string) => {
  try {
    const response = await fetch(
      API.SEARCH_PRODUCT + `?key=${key}&page=${page}&amount=${amount}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const getProductByID = async (id: string) => {
  try {
    const response = await fetch(API.GET_PRODUCT_BY_ID + `/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const createProduct = async (payload: any) => {
  try {
    const response = await fetch(API.CREATE_PRODUCT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error creating product:", err);
    return false;
  }
};

const deleteProduct = async (id: any, payload: any) => {
  try {
    const response = await fetch(API.DELETE_PRODUCT + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error deleting product:", err);
    return false;
  }
}

export const ProductService = {
  searchProduct,
  getProductByID,
  createProduct,
  deleteProduct,
};
