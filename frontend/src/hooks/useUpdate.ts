import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export interface UpdateData {
	name: string;
	avatar: string;
}

interface UseUpdate {
	update: (email: string, data: UpdateData) => Promise<void>;
	isLoading: boolean;
	error: null | string;
}

export const useUpdate = (): UseUpdate => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { user, dispatch } = useAuthContext();

	if (!dispatch)
		return {
			update: async () => {},
			isLoading: false,
			error: null
		};

	const update = async (email: string, data: UpdateData) => {
		setIsLoading(true);
		setError(null);
		const res = await fetch('users/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user?.token}`
			},
			body: JSON.stringify({ email, data })
		});

		const json = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(json.error);
		} else {
			dispatch({ type: 'UPDATE', payload: json });
			setIsLoading(false);
		}
	};

	return { update, isLoading, error };
};
