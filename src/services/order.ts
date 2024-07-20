import { API } from "../utils/api";
import { AuthService } from "./auth";
import Cookie from "js-cookie";

const getOrderByShop = async (page: any, amout: any) => {
    try {
        const response = await fetch(API.GET_ORDER_BY_SHOP + `?page=${page}&amount=${amout}`, {
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

const updateStatusOrder = async (id: string, status: any) => {
    try {
        const response = await fetch(`${API.UPDATE_STATUS_ORDER}/${id}?status=${status}`, {
            method: "PUT",
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

export const OrderService = {
    getOrderByShop,
    updateStatusOrder
}