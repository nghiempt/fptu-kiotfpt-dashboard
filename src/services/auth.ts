import { API } from "../utils/api";
import Cookie from "js-cookie";

const getToken = () => {
    return JSON.parse(Cookie.get("auth") || "{}")?.token;
}

const getRole = () => {
    return JSON.parse(Cookie.get("auth") || "{}")?.role;
}

const getShopID = () => {
    return JSON.parse(Cookie.get("auth") || "{}")?.shop_id;
}

const getAccountID = () => {
    return JSON.parse(Cookie.get("auth") || "{}")?.account_id;
}

const signIn = async (payload: any) => {
    try {
        const response = await fetch(API.SIGN_IN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data?.result) {
            Cookie.set("auth", JSON.stringify(data?.data));
            return data?.data
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

const signUp = async (payload: any) => {
    try {
        const response = await fetch(API.SIGN_UP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data?.result) {
            return data?.data
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

export const AuthService = {
    signIn,
    signUp,
    getToken,
    getRole,
    getShopID,
    getAccountID
}