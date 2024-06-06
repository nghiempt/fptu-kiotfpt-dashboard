export const HOST = `http://4.230.16.126:8888/v1`;

export const API = {
  //
  SIGN_IN: `${HOST}/auth/sign-in`,
  SIGN_UP: `${HOST}/auth/sign-up`,
  //
  GET_AMOUNT_CART_BY_ACCOUNT_ID: `${HOST}/cart/amount`,
  GET_ALL_CATEGORIES: `${HOST}/category/get-all`,
  GET_POPULAR_CATEGORIES: `${HOST}/category/popular`,
  GET_PRODUCTS_TOPDEAL: `${HOST}/product/top-deal`,
  GET_POPULAR_SHOP: `${HOST}/shop/popular`,
  //
  GET_CART_BY_ACCOUNT_ID: `${HOST}/cart`,
  //
  SEARCH_PRODUCT: `${HOST}/product/search`,
  //
  GET_PRODUCT_BY_ID: `${HOST}/product`,
  //
  GET_SHOP_BY_ID: `${HOST}/shop/profile`,
  GET_PRODUCT_BY_SHOP_ID: `${HOST}/product/get-by-shop`,
  //
  GET_VOUCHER_BY_SHOP_ID: `${HOST}/voucher/get-by-shop`,
  DELETE_VOUCHER: `${HOST}/voucher/delete`,
  CREATE_VOUCHER: `${HOST}/voucher/create`,
  UPDATE_VOUCHER: `${HOST}/voucher/update`,
  //
  GET_ORDER_BY_SHOP_ID: `${HOST}/order/get-by-shop`,
  UPDATE_ORDER_STATUS: `${HOST}/order/update`,
};
