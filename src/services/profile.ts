import { API } from "../utils/api";

const getProfileByID = async (id: string) => {
    try {
        const response = await fetch(API.GET_SHOP_BY_ID + `/${id}`);
        const data = await response.json();
        return data
    } catch (err) {
        return false;
    }
};

export const ProfileService = {
    getProfileByID
}