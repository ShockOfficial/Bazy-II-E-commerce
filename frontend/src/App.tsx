import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Header } from './components/Header/Header';
import { Signup } from './screens/SignUp/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './screens/Login/Login';
import { Home } from './screens/Home/Home';
import { AppRoutes } from './Routes/routes';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { NotFound } from './screens/NotFound/NotFound';
import { ProductDetails } from './screens/ProductDetails/ProductDetails';
import Profile from './screens/Profile/Profile';

export default function App() {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{ colorScheme: 'dark' }}
		>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path={AppRoutes.HOME} element={<Home />} />
						<Route path={AppRoutes.PRODUCT} element={<ProductDetails />} />
						<Route path={AppRoutes.PROFILE} element={<Profile />} />
					</Route>
					<Route path={AppRoutes.LOGIN} element={<Login />} />
					<Route path={AppRoutes.SIGNUP} element={<Signup />} />
					<Route path={AppRoutes.WILDCARD} element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
}
