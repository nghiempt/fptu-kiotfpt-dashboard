import { API } from "../utils/api";
import Cookie from "js-cookie";

const getShopByID = async (id: string) => {
    try {
        const response = await fetch(API.GET_BY_ID + `/${id}`, {
            method: "GET",
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
};

const getAllShops = async (page: any, amout: any) => {
    try {
        const response = await fetch(API.GET_ALL_SHOPS + `?page=${page}&amount=${amout}`, {
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

const updateStatusShop = async (id: string, status: any) => {
    try {
        const response = await fetch(`${API.UPDATE_STATUS_SHOP}/${id}?status=${status}`, {
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
}

const updateShop = async (id: string, payload: any) => {
    try {
        const response = await fetch(`${API.UPDATE_SHOP}/${id}`, {
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

export const ShopService = {
    getShopByID,
    getAllShops,
    updateStatusShop,
    updateShop
}