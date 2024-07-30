import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ROUTE } from './constant';
import AdminContainer from '../modules/Admin';
import NotFoundContainer from '../modules/NotFoundPage';
import SignInContainer from '../modules/Auth';
import SellerContainer from '../modules/Seller';
import BeginToSellerContainer from '../modules/BeginToSeller';

const RootRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTE.SIGN_IN} element={<SignInContainer />} />
            <Route path={ROUTE.BEGIN_TO_SELLER} element={<BeginToSellerContainer />} />
            <Route path={ROUTE.ADMIN} element={<AdminContainer />} />
            <Route path={ROUTE.SELLER} element={<SellerContainer />} />
            <Route path="/*" element={<NotFoundContainer />} />
        </Routes>
    );
};

export default RootRoutes;
