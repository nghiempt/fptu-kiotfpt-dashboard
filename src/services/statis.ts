import { API } from "../utils/api";
import Cookie from "js-cookie";

const sellerStatisFeedback = async () => {
    try {
        const response = await fetch(API.SELLER_STATIS_FEEDBACK, {
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

const sellerStatisProduct = async (payload: any) => {
    try {
        const response = await fetch(API.SELLER_STATIS_PRODUCT, {
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

const getStatisRevenueAll = async () => {
    try {
        const response = await fetch('https://api.kiotfpt.store/v1/statis/revenue-all', {
            method: "POST",
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

export const StatisService = {
    sellerStatisFeedback,
    sellerStatisProduct,
    getStatisRevenueAll
}