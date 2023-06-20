const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		items: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true
				},
				quantity: {
					type: Number,
					required: true
				}
			}
		],
		shippingAddress: {
			street: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			},
			postalCode: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			}
		},
		contactNumber: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true,
			default: 'pending',
			enum: ['pending', 'completed', 'cancelled']
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
