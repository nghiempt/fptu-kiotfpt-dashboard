import React from 'react';
import { Route, Routes } from "react-router-dom";
import AdminContainer from '../modules/Admin/Admin.Container';
import { ROUTE } from './constant';
import SellerContainer from '../modules/Seller/Seller.Container';

const RootRoutes: React.FC = () => {
    return (
        <Routes>
            {/* seller */}
            <Route path={ROUTE.SELLER} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_CATEGORY} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_ORDER} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_PRODUCT} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_PROFILE} element={<SellerContainer />} />
            <Route path={ROUTE.SELLER_VOUCHER} element={<SellerContainer />} />
            {/* admin */}
            <Route path={ROUTE.ADMIN} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_ORGAN} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_CATEGORY} element={<AdminContainer />} />
            <Route path={ROUTE.ADMIN_SHOP} element={<AdminContainer />} />
        </Routes>
    );
};

export default RootRoutes;
