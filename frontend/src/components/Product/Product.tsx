import { Grid, Card, Image, Text, Container } from '@mantine/core';
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
	product: {
		_id: string;
		imageUrls: string[];
		brand: string;
		name: string;
		price: number;
	};
}

export const Product = ({ product }: ProductProps) => {
	const { classes } = useStyles();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/${product._id}`);
	};

	return (
		<Grid.Col className={classes.card} key={product._id} md={4} sm={6} xs={8}>
			<Card
				onClick={handleClick}
				shadow='sm'
				padding='lg'
				radius='md'
				withBorder
			>
				<Card.Section>
					<Image
						src={product.imageUrls[0]}
						height={320}
						alt='Norway'
						fit='cover'
					/>
					<Container mt={10} mb={10} px={10}>
						<Text size='lg' weight={700}>
							{product.brand}
						</Text>
						<Text>{product.name}</Text>
						<Text size='sm' weight={700}>
							{product.price} zł
						</Text>
					</Container>
				</Card.Section>
			</Card>
		</Grid.Col>
	);
};
