const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const packageSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                probability: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);