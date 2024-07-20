import { API } from "../utils/api";
import Cookie from "js-cookie";

const getAllVouchers = async (id: any) => {
    try {
        const response = await fetch(API.GET_VOUCHER_BY_SHOP + `?shopID=${id}`, {
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

const createVoucher = async (payload: any) => {
    try {
        const response = await fetch(API.CREATE_VOUCHER, {
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

const updateVoucher = async (id: string, payload: any) => {
    try {
        const response = await fetch(`${API.UPDATE_VOUCHER}/${id}`, {
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

const updateStatusVoucher = async (id: string, status: any) => {
    try {
        const response = await fetch(`${API.UPDATE_STATUS_VOUCHER}/${id}?status=${status}`, {
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

export const VoucherService = {
    getAllVouchers,
    createVoucher,
    updateStatusVoucher,
    updateVoucher
}