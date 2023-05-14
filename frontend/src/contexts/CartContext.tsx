import React, { Dispatch } from 'react';
import { ReactNode, Reducer, createContext, useReducer } from 'react';
import { CartItem, ProductType } from '../common/types';
import {
	addToCart,
	decreaseCartQuantity,
	removeFromCart
} from '../utils/functions';

interface CartState {
	products: Array<CartItem>;
}

interface CartContextProps {
	products: Array<CartItem>;
	dispatch?: Dispatch<CartAction>;
}

type CartContextProviderProps = {
	children: ReactNode;
};

type CartAction = {
	type: string;
	payload?: ProductType;
};

export const CartContext = createContext<CartContextProps>({
	products: [],
	dispatch: () => {}
});

const cartReducer: Reducer<CartState, CartAction> = (
	state: CartState,
	action: CartAction
) => {
	switch (action.type) {
		case 'ADD_TO_CART': {
			if (!action.payload) return state;

			const products = [...state.products];
			const updatedProducts = addToCart(products, action.payload);

			return { products: updatedProducts };
		}
		case 'DECREASE_QUANTITY': {
			if (!action.payload) return state;

			const products = [...state.products];
			const updatedProducts = decreaseCartQuantity(products, action.payload);

			return { products: updatedProducts };
		}
		case 'REMOVE_FROM_CART': {
			if (!action.payload) return state;

			const products = [...state.products];
			const updatedProducts = removeFromCart(products, action.payload);

			return { products: updatedProducts };
		}
		case 'CLEAR': {
			return { products: [] };
		}
		default:
			return state;
	}
};

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
	const [state, dispatch] = useReducer(cartReducer, { products: [] });

	return (
		<CartContext.Provider value={{ ...state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
