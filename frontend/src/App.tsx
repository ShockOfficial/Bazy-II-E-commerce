import { MantineProvider } from '@mantine/core';
import { Header } from './components/header/Header';
import { Signup } from './screens/SignUp/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './screens/Login/Login';
import { Home } from './screens/Home/Home';
import { AppRoutes } from './Routes/routes';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { NotFound } from './screens/NotFound/NotFound';

export default function App() {
	// TODO TMP DATA
	const tabs = ['Home', 'Free Drop', 'Items'];
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{ colorScheme: 'dark' }}
		>
			<BrowserRouter>
				<Header tabs={tabs} />
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path={AppRoutes.HOME} element={<Home />} />
					</Route>
					<Route path={AppRoutes.LOGIN} element={<Login />} />
					<Route path={AppRoutes.SIGNUP} element={<Signup />} />
					<Route path={AppRoutes.WILDCARD} element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
}
