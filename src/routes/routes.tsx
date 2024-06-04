import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ROUTE } from './constant';
import SellerContainer from '../modules/Seller/Seller.Container';
import SignInPage from '../modules/Auth/SignIn';
import SignUpPage from '../modules/Auth/SignUp';
import AdminContainer from '../modules/Admin/Admin.Container';

const RootRoutes: React.FC = () => {
    return (
        <Routes>
            {/* begin shop */}
            <Route path={ROUTE.SIGN_IN} element={<SignInPage/>} />    
            <Route path={ROUTE.SIGN_UP} element={<SignUpPage/>} />    
            {/* seller */}
            <Route path={ROUTE.SELLER} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_STATISTICAL} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_CATEGORY} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_ORDER} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_PRODUCT} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_PROFILE} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_VOUCHER} element={<SellerContainer />} />
            {/* admin */}
            <Route path={ROUTE.ADMIN} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_STATISTICAL} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_BRAND} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_CATEGORY} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_SHOP} element={<AdminContainer />} />
        </Routes>
    );
};

export default RootRoutes;
