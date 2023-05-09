import React from 'react';
import { Button, Flex, Image, Stack, Text, Center } from '@mantine/core';
import { useStyles } from './styles';
import { CartItem } from '../../common/types';
import { useCartContext } from '../../hooks/useCartContext';

interface CartItemProps {
	item: CartItem;
}

export function Cartitem(row: CartItemProps) {
	const { classes } = useStyles();
	const { dispatch } = useCartContext();

	const handleIncreaseQuantity = () => {
		if (!dispatch) return;

		dispatch({ type: 'ADD_TO_CART', payload: row.item.product });
	};

	const handleDecreaseQuantity = () => {
		if (!dispatch) return;

		dispatch({ type: 'DECREASE_QUANTITY', payload: row.item.product });
	};

	const handleRemove = () => {
		if (!dispatch) return;

		dispatch({ type: 'REMOVE_FROM_CART', payload: row.item.product });
	};

	return (
		<tr>
			<td>
				<Flex align="center" justify="center">
					<Image maw={200} src={row.item.product.imageUrls[0]} />
					<Stack ml={40}>
						<Text fz={'xl'}>{row.item.product.name}</Text>
						<Text fz={'md'}>{row.item.product.brand}</Text>
					</Stack>
				</Flex>
			</td>
			<td>
				<Flex justify="center">
					<Button
						onClick={handleIncreaseQuantity}
						disabled={row.item.quantity > row.item.product.unitsInStock}
						className={classes.quantityBox}
					>
						+
					</Button>
					<Text className={classes.quantityBox}>{row.item.quantity}</Text>
					<Button
						onClick={handleDecreaseQuantity}
						disabled={row.item.quantity === 1 ? true : false}
						className={classes.quantityBox}
					>
						-
					</Button>
				</Flex>
			</td>
			<td>
				<Center>
					<Button
						onClick={handleRemove}
						fz="sm"
						className={classes.quantityBox}
					>
						X
					</Button>
				</Center>
			</td>
			<td>
				<Center>
					<Text className={classes.price}>
						{(row.item.product.price * row.item.quantity).toFixed(2)}$
					</Text>
				</Center>
			</td>
		</tr>
	);
}
