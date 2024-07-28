import { API } from "../utils/api";
import Cookie from "js-cookie";

const getAllShopCategories = async () => {
    try {
        const response = await fetch(API.GET_SHOP_CATEGORY, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

const removeShopCategories = async (id: any) => {
    try {
        const response = await fetch(API.DELETE_SHOP_CATEGORY + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

export const ShopCategoryService = {
    getAllShopCategories,
    removeShopCategories
}