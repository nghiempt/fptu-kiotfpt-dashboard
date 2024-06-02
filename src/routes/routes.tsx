import React from 'react';
import { Route, Routes } from "react-router-dom";
import AdminContainer from '../modules/Admin/Admin.Container';
import { ROUTE } from './constant';
import SellerContainer from '../modules/Seller/Seller.Container';
import SignIn from '../modules/Seller/components/SignIn';
import SignUp from '../modules/Seller/components/SignUp';
import CreateShopInfo from '../modules/Seller/components/CreateShopInfo';
import AddProduct from '../modules/Seller/components/AddProduct';
import EditProduct from '../modules/Seller/components/EditProduct';
import BeginShop from '../modules/Seller/components/BeginShop';

const RootRoutes: React.FC = () => {
    return (
        <Routes>
            {/* begin shop */}
            <Route path={ROUTE.BEGIN_SHOP} element={<BeginShop/>} />    
            {/* seller */}
            <Route path={ROUTE.SELLER} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_CATEGORY} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_ORDER} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_PRODUCT} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_PROFILE} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_VOUCHER} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_CREATE_PRODUCT} element={<AddProduct />} />
            <Route path={ROUTE.SELLER_SIGN_IN} element={<SignIn />} />
            <Route path={ROUTE.SELLER_SIGN_UP} element={<SignUp />} />
            <Route path={ROUTE.SELLER_CREATE_SHOP_INFO} element={<CreateShopInfo />} />
            <Route path={ROUTE.SELLER_EDIT_PRODUCT} element={<EditProduct />} />
            {/* admin */}
            <Route path={ROUTE.ADMIN} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_ORGAN} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_CATEGORY} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_SHOP} element={<AdminContainer />} />
        </Routes>
    );
};

export default RootRoutes;
