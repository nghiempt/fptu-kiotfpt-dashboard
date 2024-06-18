import { API } from "../utils/api";

const getVoucherByShopID = async (id: string) => {
  try {
    const response = await fetch(API.GET_VOUCHER_BY_SHOP_ID + `?shopID=${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const deleteVoucher = async (id: string) => {
  try {
    const response = await fetch(API.DELETE_VOUCHER + `/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const addVoucher = async (payload: any) => {
  try {
    const response = await fetch(API.CREATE_VOUCHER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error adding voucher:", err);
    return false;
  }
};

const updateVoucher = async (id: any, payload: any) => {
  try {
    const response = await fetch(API.UPDATE_VOUCHER + `/${id}`, {
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

export const VoucherService = {
  getVoucherByShopID,
  deleteVoucher,
  addVoucher,
  updateVoucher,
};
