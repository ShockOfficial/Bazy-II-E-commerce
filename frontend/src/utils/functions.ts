import { CartItem, ProductType } from '../common/types';

export const convertToBase64 = (imgFile: File) => {
	if (!imgFile) return null;

	const blob = new Blob([imgFile], { type: 'image/png' });
	const reader = new FileReader();
	reader.readAsDataURL(blob);

	return new Promise((resolve, reject) => {
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = (error) => {
			reject(error);
		};
	});
};

export const addToCart = (
	products: Array<CartItem>,
	productToAdd: ProductType
) => {
	const productIndex = products.findIndex(
		(product) => product.product._id === productToAdd._id
	);

	if (productIndex === -1) {
		products.push({
			product: productToAdd,
			quantity: 1
		});
	} else {
		products[productIndex].quantity++;
	}

	return products;
};

export const decreaseCartQuantity = (
	products: Array<CartItem>,
	productToDecrease: ProductType
) => {
	const productIndex = products.findIndex(
		(product) => product.product._id === productToDecrease._id
	);

	if (productIndex !== -1) {
		products[productIndex].quantity--;
	}

	return products;
};

export const removeFromCart = (
	products: Array<CartItem>,
	productToRemove: ProductType
) => {
	const filteredProducts = products.filter(
		(product) => product.product._id !== productToRemove._id
	);

	return filteredProducts;
};
