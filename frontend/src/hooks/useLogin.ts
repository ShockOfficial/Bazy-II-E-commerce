import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

interface UseLoginReturn {
	login: (email: string, password: string) => Promise<void>;
	isLoading: boolean;
	error: null | string;
}

export const useLogin = (): UseLoginReturn => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { dispatch } = useAuthContext();

	if (!dispatch)
		return {
			login: async () => {},
			isLoading: false,
			error: null
		};

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch('users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		const json = await response.json();
		if (!response.ok) {
			setIsLoading(false);
			setError(json.error);
		} else {
			localStorage.setItem('user', JSON.stringify(json));
			dispatch({ type: 'LOGIN', payload: json });
			setIsLoading(false);
		}
	};

	return { login, isLoading, error };
};
