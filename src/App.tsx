import { Container, MantineProvider, Text } from '@mantine/core';
import { Header } from './components/header/Header';

export default function App() {
	// TODO TMP DATA
	const user = {
		name: 'Jonny Bravo',
		image: 'https://cdn.drawception.com/drawings/YsR2oy7ctw.png',
	};

	const tabs = ['Home', 'Free Drop', 'Items'];

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{ colorScheme: 'dark' }}
		>
			<Header user={user} tabs={tabs} />
			<Container>
				<Text>Amazing shop with drop functionality 🚀</Text>
			</Container>
		</MantineProvider>
	);
}

