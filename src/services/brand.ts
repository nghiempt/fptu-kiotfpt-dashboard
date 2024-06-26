import { API } from "../utils/api";

const getAllBrand = async () => {
  try {
    const response = await fetch(API.GET_ALL_BRAND);
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const createBrand = async (payload: any) => {
  try {
    const response = await fetch(API.CREATE_BRAND, {
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

const updateBrand = async (id: any, payload: any) => {
  try {
    const response = await fetch(API.UPDATE_BRAND + `/${id}`, {
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

const deleteBrand = async (id: any) => {
  try {
    const response = await fetch(API.DELETE_BRAND + `/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
}

export const BrandService = {
  getAllBrand,
  createBrand,
  updateBrand,
  deleteBrand
};
