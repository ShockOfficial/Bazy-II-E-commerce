import React from 'react';
import { Button, Container, Flex, Table, Text } from '@mantine/core';
import { useStyles } from './styles';
import { IconShoppingCart } from '@tabler/icons-react';
import { Cartitem } from '../../components/CartItem/Cartitem';

const data = [
	{
		product: {
			_id: '23456789',
			name: 'Koszulka z nadrukiem',
			description: 'Wygodna bawełniana koszulka z modnym nadrukiem.',
			price: 49.99,
			category: 'Odzież',
			brand: 'Nike',
			imageUrls: [
				'https://assets.ajio.com/medias/sys_master/root/20221109/xg7d/636b8e9af997ddfdbd663e62/-473Wx593H-461119105-blue-MODEL2.jpg',
				'https://assets.ajio.com/medias/sys_master/root/20221109/xg7d/636b8e9af997ddfdbd663e62/-473Wx593H-461119105-blue-MODEL2.jpg'
			],
			rating: 4.5,
			reviewsNumber: 10,
			unitsInStock: 50
		},
		quantity: 5
	},
	{
		product: {
			_id: '13456789',
			name: 'Koszulka z nadrukiem',
			description: 'Wygodna bawełniana koszulka z modnym nadrukiem.',
			price: 49.99,
			category: 'Odzież',
			brand: 'Nike',
			imageUrls: [
				'https://assets.ajio.com/medias/sys_master/root/20221109/xg7d/636b8e9af997ddfdbd663e62/-473Wx593H-461119105-blue-MODEL2.jpg',
				'https://assets.ajio.com/medias/sys_master/root/20221109/xg7d/636b8e9af997ddfdbd663e62/-473Wx593H-461119105-blue-MODEL2.jpg'
			],
			rating: 4.5,
			reviewsNumber: 10,
			unitsInStock: 50
		},
		quantity: 1
	}
];

export function Shoppingcart() {
	const { classes, cx } = useStyles();

	const rows = data.map((row) => {
		return (
			<React.Fragment key={row.product._id}>
				<Cartitem item={row} />
			</React.Fragment>
		);
	});

	return (
		<Container size={'xl'}>
			<Table miw={700}>
				<thead className={classes.tableHead}>
					<tr>
						<th
							style={{
								textAlign: 'center'
							}}
						>
							Description
						</th>
						<th
							style={{
								textAlign: 'center'
							}}
						>
							Quantity
						</th>
						<th
							style={{
								textAlign: 'center'
							}}
						>
							Remove
						</th>
						<th
							style={{
								textAlign: 'center'
							}}
						>
							Price
						</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
			<Flex className={classes.spacer} justify="flex-end">
				<div className={cx(classes.box, classes.priceBox)}>
					<Text>Total</Text>
					<Text>2137$</Text>
				</div>
			</Flex>
			<Flex justify="flex-end">
				<div className={cx(classes.box, classes.checkoutBox)}>
					<Button className={classes.checkoutButton}>Checkout</Button>
					<IconShoppingCart className={classes.checkoutIcon} />
				</div>
			</Flex>
		</Container>
	);
}
