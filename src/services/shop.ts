import { API } from "../utils/api";

const getAllShops = async () => {
  try {
    const response = await fetch(API.GET_ALL_SHOP);
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const banShop = async (id: any, payload: any) => {
  try {
    const response = await fetch(API.BAN_SHOP + `/${id}`, {
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

export const ShopService = {
  getAllShops,
  banShop
};
