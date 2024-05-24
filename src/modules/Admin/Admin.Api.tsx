import axiosClient from "../../utils/axiosClient";

// ===== Get all user =====
export const getAllUser = async () => {
  return []
  try {
    const response = await axiosClient.get('');
    if (response.data.result) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// ===== Get all category =====
export const getAllShopCategory = async () => {
  return []
  try {
    const response = await axiosClient.get('');
    if (response.data.result) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// ===== Get all shop =====
export const getAllShopInformation = async () => {
  return []
  try {
    const response = await axiosClient.get('');
    if (response.data.result) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// ===== Get all transaction =====
export const getAllTransaction = async () => {
  return []
  try {
    const response = await axiosClient.get('');
    if (response.data.result) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
