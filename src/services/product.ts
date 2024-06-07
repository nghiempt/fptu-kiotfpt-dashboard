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

const createProduct = async (productData: any) => {
  try {
    const response = await fetch(API.CREATE_PRODUCT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error creating product:", err);
    return false;
  }
};

const productData = {
  brand_id: 0,
  category_id: 0,
  condition_id: 0,
  description: "string",
  discount: 0,
  id: 0,
  maxPrice: 0,
  minPrice: 0,
  name: "string",
  shop_id: 0,
  thumbnails: ["string"],
  variants: [
    {
      colorId: 0,
      price: 0,
      productId: 0,
      quantity: 0,
      sizeId: 0,
    },
  ],
};

export const ProductService = {
  searchProduct,
  getProductByID,
  createProduct,
};
