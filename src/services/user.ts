import { API } from "../utils/api";
import Cookie from "js-cookie";

const getAllUsers = async () => {
    try {
        const response = await fetch(API.GET_ALL_USERS, {
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

export const UserService = {
    getAllUsers,
}