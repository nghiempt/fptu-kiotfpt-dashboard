import { API } from "../utils/api";

const getOrderByShopID = async (shopID: string, page: string, amount: string) => {
  try {
    const response = await fetch(API.GET_ORDER_BY_SHOP_ID + `?shop_id=${shopID}&page=${page}&amount=${amount}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const updateOrder = async (id: any, payload: any) => {
  try {
    const response = await fetch(API.UPDATE_ORDER_STATUS + `/${id}`, {
      method: "PUT",
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

export const OrderService = {
  getOrderByShopID,
  updateOrder
};
