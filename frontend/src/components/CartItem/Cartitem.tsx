import React from 'react';
import { Button, Flex, Image, Stack, Text, Center } from '@mantine/core';
import { useStyles } from './styles';
import { CartItem } from '../../common/types';

interface CartItemProps {
	item: CartItem;
}

export function Cartitem(row: CartItemProps) {
	const { classes } = useStyles();

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
					<Button className={classes.quantityBox}>+</Button>
					<Text className={classes.quantityBox}>{row.item.quantity}</Text>
					<Button
						disabled={row.item.quantity === 1 ? true : false}
						className={classes.quantityBox}
					>
						-
					</Button>
				</Flex>
			</td>
			<td>
				<Center>
					<Button fz="sm" className={classes.quantityBox}>
						X
					</Button>
				</Center>
			</td>
			<td>
				<Center>
					<Text className={classes.price}>{row.item.product.price}$</Text>
				</Center>
			</td>
		</tr>
	);
}
