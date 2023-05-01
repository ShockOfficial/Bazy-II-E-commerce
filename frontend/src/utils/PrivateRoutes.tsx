import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { checkAuthToken } from '../Routes/Guards';
import { AppRoutes } from '../Routes/routes';

export const PrivateRoutes = () => {
	const isValidToken = checkAuthToken();
	return isValidToken ? <Outlet /> : <Navigate to={AppRoutes.LOGIN} replace />;
};
