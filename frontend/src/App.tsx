import { MantineProvider } from '@mantine/core';
import { Header } from './components/header/Header';
import { Signup } from './components/signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/login/Login';
import { Home } from './components/home/Home';

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
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
}

