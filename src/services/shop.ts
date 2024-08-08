import { API } from "../utils/api";
import Cookie from "js-cookie";

const createShop = async (payload: any) => {
    console.log(payload);
    
    try {
        const response = await fetch(API.CREATE_SHOP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (err) {
        return false;
    }
};

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

const updateStatusShop = async (id: string, status: any, note: string) => {
    console.log(id, status, note);
    
    try {
        const response = await fetch(`${API.UPDATE_STATUS_SHOP}/${id}?status=${status}&note=${note}`, {
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
}

const updateShop = async (id: string, payload: any) => {
    console.log(payload);

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
    createShop,
    getShopByID,
    getAllShops,
    updateStatusShop,
    updateShop
}