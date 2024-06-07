import { API } from "../utils/api";

const getBrandByCategory = async () => {
  try {
    const response = await fetch(API.GET_BRAND_BY_CATEGORY);
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

export const OrderService = {
  getBrandByCategory,
};
