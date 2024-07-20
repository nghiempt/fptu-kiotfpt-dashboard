import { API } from "../utils/api";
import Cookie from "js-cookie";

const getAllBrands = async () => {
    try {
        const response = await fetch(API.GET_ALL_BRANDS, {
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

const createBrand = async (payload: any) => {
    try {
        const response = await fetch(API.CREATE_BRAND, {
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

const updateBrand = async (id: string, payload: any) => {
    try {
        const response = await fetch(`${API.UPDATE_BRAND}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(Cookie.get("auth") || "{}")?.token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        return false;
    }
}

const updateStatusBrand = async (id: string, status: any) => {
    try {
        const response = await fetch(`${API.UPDATE_STATUS_BRAND}/${id}?status=${status}`, {
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
        console.log(err);
        return false;
    }
}

export const BrandService = {
    getAllBrands,
    createBrand,
    updateBrand,
    updateStatusBrand
}