const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		brand: {
			type: String,
			required: true
		},
		imageUrls: [
			{
				type: String,
				required: true
			}
		],
		rating: {
			type: Number,
			default: 0
		},
		reviewsNumber: {
			type: Number,
			default: 0
		},
		unitsInStock: {
			type: Number,
			required: true
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		userProductId: {
			type: Schema.Types.ObjectId,
			ref: 'User.products'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
