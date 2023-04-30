import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

interface UseSignupReturn {
	signup: (email: string, password: string) => Promise<void>;
	isLoading: boolean;
	error: null | string;
}

export const useSignup = (): UseSignupReturn => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { dispatch } = useAuthContext();

	if (!dispatch)
		return { signup: async () => {}, isLoading: false, error: null };

	const signup = async (email: string, password: string) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch('users/signup', {
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
		}

		if (response.ok) {
			localStorage.setItem('user', JSON.stringify(json));

			dispatch({ type: 'LOGIN', payload: json });
			setIsLoading(false);
		}
	};

	return { signup, isLoading, error };
};
