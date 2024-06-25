import { API } from "../utils/api";

const getShopRevenueByTime = async (shopID: any, payload: any) => {
  try {
    const response = await fetch(API.GET_REVENUE_BY_SHOP + `?shopId=${shopID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const getShopTopProductByTime = async (shopID: any, payload: any) => {
  try {
    const response = await fetch(API.GET_TOP_PRODUCT_BY_SHOP + `?shopId=${shopID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const getLoyalCustomer = async () => {
  try {
    const response = await fetch(API.GET_LOYAL_CUSTOMER);
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

export const StatisService = {
  getShopRevenueByTime,
  getShopTopProductByTime,
  getLoyalCustomer
};
