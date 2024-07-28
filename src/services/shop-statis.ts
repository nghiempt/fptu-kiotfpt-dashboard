import { API } from "../utils/api";
import Cookie from "js-cookie";

const getStatisOrder = async (payload: any) => {
    try {
        const response = await fetch(API.GET_STATIS_ORDER, {
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

const getStatisRevenue = async (payload: any) => {
    try {
        const response = await fetch(API.GET_STATIS_REVENUE, {
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

const getStatisCustomer = async () => {
    try {
        const response = await fetch(API.GET_STATIS_CUSTOMER, {
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

export const ShopStatisService = {
    getStatisOrder,
    getStatisRevenue,
    getStatisCustomer
}