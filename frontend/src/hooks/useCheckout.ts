import { useState } from 'react';
import { CartItem } from '../common/types';
import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

interface useCheckoutReturn {
	checkout: (products: Array<CartItem>) => Promise<void>;
	isLoading: boolean;
	error: string | null;
}

export const useCheckout = (): useCheckoutReturn => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { user } = useAuthContext();
	const { dispatch } = useCartContext();

	if (!dispatch) {
		return {
			checkout: async () => {},
			isLoading: false,
			error: null
		};
	}

	const checkout = async (products: Array<CartItem>) => {
		setIsLoading(true);
		setError(null);

		const res = await fetch('/products/buy-products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user?.token}`
			},
			body: JSON.stringify({ products })
		});

		const json = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(json.error);
		} else {
			dispatch({ type: 'CLEAR' });
		}
	};

	return { checkout, isLoading, error };
};
