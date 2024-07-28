import { API } from "../utils/api";
import Cookie from "js-cookie";

const getProductByShop = async (page: any, amout: any) => {
    try {
        const response = await fetch(API.GET_PRODUCT_BY_SHOP + `?page=${page}&amount=${amout}`, {
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

const createProduct = async (payload: any) => {
    console.log(payload);
    try {
        const response = await fetch(API.CREATE_PRODUCT, {
            method: "POST",
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
};

const updateProduct = async (id: string, payload: any) => {
    try {
        const response = await fetch(`${API.UPDATE_PRODUCT}/${id}`, {
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

const updateStatusProduct = async (id: string, status: any) => {
    try {
        const response = await fetch(`${API.UPDATE_STATUS_PRODUCT}/${id}?status=${status}`, {
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

export const ProductService = {
    getProductByShop,
    createProduct,
    updateProduct,
    updateStatusProduct
}