import { API } from "../utils/api";
import { AuthService } from "./auth";
import Cookie from "js-cookie";

const getAllCategories = async () => {
    try {
        const response = await fetch(API.GET_ALL_CATEGORIES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
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
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
};

const createShopCategory = async (shopID: any, categoryID:any) => {

    
    try {
        const response = await fetch(API.CREATE_SHOP_CATEGORY + `?shopID=${shopID}&categoryID=${categoryID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
        });
        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (err) {
        return false;
    }

}

const updateCategory = async (id: string, payload: any) => {
    try {
        const response = await fetch(`${API.UPDATE_CATEGORY}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
}

const updateStatusCategory = async (id: string, payload: any) => {
    try {
        const response = await fetch(`${API.UPDATE_STATUS_CATEGORY}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
}

export const CategoryService = {
    getAllCategories,
    createCategory,
    createShopCategory,
    updateCategory,
    updateStatusCategory
}