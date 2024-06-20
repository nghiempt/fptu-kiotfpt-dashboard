import { API } from "../utils/api";

const getAllCategories = async () => {
  try {
    const response = await fetch(API.GET_ALL_CATEGORIES);
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

const createCategory = async (payload: any) => {
  try {
    const response = await fetch(API.CREATE_CATEGORY, {
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

const updateCategory = async (id: any, payload: any) => {
  try {
    const response = await fetch(API.UPDATE_CATEGORY + `/${id}`, {
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

const updateCategoryStatus = async (id: any, payload: any) => {
  try {
    const response = await fetch(API.UPDATE_CATEGORY_STATUS + `/${id}`, {
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

export const CategoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  updateCategoryStatus
};
