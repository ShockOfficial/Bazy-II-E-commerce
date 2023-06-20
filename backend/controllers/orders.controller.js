const Order = require('../models/orders.model');
const mongoose = require('mongoose');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getOrder = async (req, res) => {
    const { _id } = req.params;
    const {
		user: { _id: userId, role }
    } = req;

    try {
        if (!(_id.toString() === userId.toString() || role === 'admin')) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const orders = await Order.find({ user: userId }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addOrder = async (req, res) => {
    const { user } = req;
    const { items } = req.body;

    try {
        // Sprawdzenie, czy użytkownik posiada uzupelnione dane
        const { street, city, postalCode, country } = user.orderInfo.shippingAddress;
        const { contactNumber } = user.orderInfo;
        if (!street || !city || !postalCode || !country || !contactNumber) {
            return res.status(400).json({ error: 'User shipping information is incomplete' });
        }

        // Sprawdzenie, czy wszystkie przedmioty są dostępne w user.products
        const orderedProductIds = items.map((item) => item.productId.toString());
        for (let id of orderedProductIds) {
            const orderedItem = items.find((item) => item.productId.toString() === id);
            const userProduct = user.products.find((product) => product.productId.toString() === id);

            if (!userProduct) {
                return res.status(400).json({ error: 'Some ordered products are not owned by the user' });
            }

            if (orderedItem.quantity > userProduct.quantity) {
                return res.status(400).json({ error: 'Some ordered products are not available in the requested quantity' });
            }
        }

        // Aktualizacja ilości zamówionych przedmiotów w user.products
        for (let orderedItem of items) {
            const productId = orderedItem.productId.toString();
            const quantity = orderedItem.quantity;

            const userProduct = user.products.find((product) => product.productId.toString() === productId);
            if (quantity === userProduct.quantity) {
                user.products = user.products.filter((product) => product.productId.toString() !== productId);
            }
            else {
                userProduct.quantity -= quantity;
            }
            
        }

        await user.save();

        const orderedItems = items.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            };
        });

        const order = new Order({
            user: user._id,
            items: orderedItems,
            shippingAddress: {
                street: street,
                city: city,
                postalCode: postalCode,
                country: country
            },
            contactNumber: contactNumber
        });

        await order.save();

        res.status(200).json({ message: 'Order added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addOrder,
    getOrders,
    getOrder
};