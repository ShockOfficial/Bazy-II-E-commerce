import React, { useEffect, useState } from 'react';
import { Button, Container, Flex, Table, Text } from '@mantine/core';
import { useStyles } from './styles';
import { IconShoppingCart } from '@tabler/icons-react';
import { Cartitem } from '../../components/CartItem/Cartitem';
import { useCartContext } from '../../hooks/useCartContext';

export function Shoppingcart() {
	const [totalPrice, setTotalPrice] = useState(0);
	const { classes, cx } = useStyles();
	const { products } = useCartContext();

	useEffect(() => {
		const total = products.reduce(
			(acc, product) => acc + product.product.price * product.quantity,
			0
		);

		setTotalPrice(total);
	}, [products]);

	const handleCheckout = () => {
		console.log('handle');
	};

	const rows = products.map((product) => {
		return (
			<React.Fragment key={product.product._id}>
				<Cartitem item={product} />
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
					<Text>{totalPrice.toFixed(2)}$</Text>
				</div>
			</Flex>
			<Flex justify="flex-end">
				<div className={cx(classes.box, classes.checkoutBox)}>
					<Button onClick={handleCheckout} className={classes.checkoutButton}>
						Checkout
					</Button>
					<IconShoppingCart className={classes.checkoutIcon} />
				</div>
			</Flex>
		</Container>
	);
}
