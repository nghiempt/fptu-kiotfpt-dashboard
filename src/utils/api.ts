export const HOST = `https://api.kiotfpt.store/v1`;
export const CLOUDINARY = `https://api.cloudinary.com/v1_1/kiotfpt/image/upload`;

export const API = {
    // auth
    SIGN_IN: `${HOST}/auth/sign-in`,
    SIGN_UP: `${HOST}/auth/sign-up`,
    // category
    GET_ALL_CATEGORIES: `${HOST}/category/get-all`,
    CREATE_CATEGORY: `${HOST}/category/create`,
    CREATE_SHOP_CATEGORY: `${HOST}/shopcate/add`,
    UPDATE_CATEGORY: `${HOST}/category/update`,
    UPDATE_STATUS_CATEGORY: `${HOST}/category/update-status`,
    // brand
    GET_ALL_BRANDS: `${HOST}/brand/get-all`,
    CREATE_BRAND: `${HOST}/brand/create`,
    UPDATE_BRAND: `${HOST}/brand/update`,
    UPDATE_STATUS_BRAND: `${HOST}/brand/update-status`,
    // shop
    CREATE_SHOP: `${HOST}/shop/create`,
    GET_BY_ID: `${HOST}/shop`,
    GET_ALL_SHOPS: `${HOST}/shop/get-all`,
    UPDATE_STATUS_SHOP: `${HOST}/shop/ban`,
    UPDATE_SHOP: `${HOST}/shop/profile/update`,
    // order
    GET_ORDER_BY_SHOP: `${HOST}/order/get-by-shop`,
    UPDATE_STATUS_ORDER: `${HOST}/order/update`,
    // product
    GET_PRODUCT_BY_SHOP: `${HOST}/product/get-by-shop`,
    CREATE_PRODUCT: `${HOST}/product/create`,
    UPDATE_PRODUCT: `${HOST}/product/update`,
    UPDATE_STATUS_PRODUCT: `${HOST}/product/update-status`,
    // voucher
    GET_VOUCHER_BY_SHOP: `${HOST}/voucher/get-by-shop`,
    CREATE_VOUCHER: `${HOST}/voucher/create`,
    UPDATE_VOUCHER: `${HOST}/voucher/update`,
    UPDATE_STATUS_VOUCHER: `${HOST}/voucher/update-status`,
    // statis
    SELLER_STATIS_FEEDBACK: `${HOST}/statis/feedback`,
    SELLER_STATIS_PRODUCT: `${HOST}/statis/product`,
    GET_STATIS_ORDER: `${HOST}/statis/order`,
    GET_STATIS_REVENUE: `${HOST}/statis/revenue`,
    GET_STATIS_CUSTOMER: `${HOST}/statis/customer`,
    // address
    GET_ALL_PROVINCES: `${HOST}/address/province/get-all`,
    GET_DISTRICT_BY_PROVINCE: `${HOST}/address/district/get-all-by-province`,
    // shop category
    GET_SHOP_CATEGORY: `${HOST}/shopcate/get-by-shop`,
    DELETE_SHOP_CATEGORY: `${HOST}/shopcate/remove`,
};
