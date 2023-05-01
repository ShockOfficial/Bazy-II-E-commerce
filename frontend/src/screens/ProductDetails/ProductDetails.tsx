import React from 'react';
import {
	Text,
	Group,
	Button,
	Flex,
	Container,
	Loader,
	Title,
	Rating
} from '@mantine/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useStyles } from './styles';
import { ProductType } from '../../common/types';
import { useParams } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';

export function ProductDetails() {
	const { classes } = useStyles();
	const { _id } = useParams();

	const { documents: product } = useCollection(`/products/${_id}`) as {
		documents: ProductType;
	};

	if (!product) {
		return (
			<Flex justify="center">
				<Loader color="indigo" mt={30} />
			</Flex>
		);
	}

	// TO DO
	const handleAddToCart = () => {
		console.log('Add to cart');
	};

	return (
		<Container size="lg">
			<Flex className={classes.space}>
				<Container className={classes.carousel} fluid>
					<Carousel
						dynamicHeight
						showArrows
						showIndicators
						showThumbs={false}
					>
						{product.imageUrls.map((image) => (
							<div key={image}>
								<img src={image} alt='product' height={600} />
							</div>
						))}
					</Carousel>
				</Container>
				<div className={classes.informations}>
					<Title fw={600} className={classes.title} order={3} size="h1">{product.brand}</Title>
					<Text className={classes.name}>{product.name}</Text>
					<Group>
						<Text className={classes.price}>{product.price} zł</Text>
						<Text className={classes.span}>w tym VAT</Text>
					</Group>
					<Group className={classes.rating} position="center">
						<Rating size='32px' value={product.rating / product.reviewsNumber} fractions={2} readOnly />
						<Text className={classes.reviewsNumber}>{product.reviewsNumber}</Text>
					</Group>
					<Button onClick={handleAddToCart} mih={48} fullWidth>Dodaj do koszyka</Button>
				</div>
			</Flex>
		</Container>
	);
}
