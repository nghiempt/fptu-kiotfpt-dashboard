export const HOST = `https://api.kiotfpt.store/v1`;

export const API = {
  // auth
  SIGN_IN: `${HOST}/auth/sign-in`,
  SIGN_UP: `${HOST}/auth/sign-up`,
  // account
  GET_AMOUNT_CART_BY_ACCOUNT_ID: `${HOST}/cart/amount`,
  GET_ALL_CATEGORIES: `${HOST}/category/get-all`,
  CREATE_CATEGORY: `${HOST}/category/create`,
  UPDATE_CATEGORY: `${HOST}/category/update`,
  GET_POPULAR_CATEGORIES: `${HOST}/category/popular`,
  GET_PRODUCTS_TOPDEAL: `${HOST}/product/top-deal`,
  GET_POPULAR_SHOP: `${HOST}/shop/popular`,
  GET_CART_BY_ACCOUNT_ID: `${HOST}/cart`,
  // product
  SEARCH_PRODUCT: `${HOST}/product/search`,
  GET_PRODUCT_BY_ID: `${HOST}/product`,
  // shop
  GET_ALL_SHOP: `${HOST}/shop/get-all`,
  BAN_SHOP: `${HOST}/shop/ban`,
  GET_SHOP_BY_ID: `${HOST}/shop/profile`,
  GET_PRODUCT_BY_SHOP_ID: `${HOST}/product/get-by-shop`,
  CREATE_PRODUCT: `${HOST}/product/create`,
  DELETE_PRODUCT: `${HOST}/product/delete`,
  // voucher
  GET_VOUCHER_BY_SHOP_ID: `${HOST}/voucher/get-by-shop`,
  DELETE_VOUCHER: `${HOST}/voucher/delete`,
  CREATE_VOUCHER: `${HOST}/voucher/create`,
  UPDATE_VOUCHER: `${HOST}/voucher/update`,
  // order
  GET_ORDER_BY_SHOP_ID: `${HOST}/order/get-by-shop`,
  UPDATE_ORDER_STATUS: `${HOST}/order/update`,
  // brand
  GET_BRAND_BY_CATEGORY: `${HOST}/brand/get-by-category`,
  GET_ALL_BRAND: `${HOST}/brand/get-all`,
  CREATE_BRAND: `${HOST}/brand/create`,
  UPDATE_BRAND: `${HOST}/brand/update`,
  DELETE_BRAND: `${HOST}/brand/delete`,
  // category
  UPDATE_CATEGORY_STATUS: `${HOST}/category/update-status`,
};
