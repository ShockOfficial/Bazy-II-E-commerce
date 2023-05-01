export interface ProductType {
	_id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	brand: string;
	imageUrls: Array<string>;
	rating: number;
	reviewsNumber: number;
	unitsInStock: number;
}
