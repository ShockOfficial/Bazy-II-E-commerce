import React from 'react';
import { Grid, Text, Container, Space, Loader, Flex } from '@mantine/core';
import { useCollection } from '../../hooks/useCollection';
import { Product } from '../../components/Product/Product';

export function Home() {
	const { documents: products, isLoading, error } = useCollection('products');

	const renderContent = () => {
		if (error) {
			return (
				<Flex justify="center">
					<Text fz="sm" c="red" mt={30}>
						{error}
					</Text>
				</Flex>
			);
		}

		if (isLoading) {
			return (
				<Flex justify="center">
					<Loader color="indigo" mt={30} />
				</Flex>
			);
		}

		return (
			<Grid
				justify="center"
				gutter={5}
				gutterXs="md"
				gutterMd="xl"
				gutterXl={50}
			>
				{products.map((product) => (
					<Product product={product} key={product._id} />
				))}
			</Grid>
		);
	};

	return (
		<Container size="md">
			<Space h="xl"></Space>
			{renderContent()}
		</Container>
	);
}
