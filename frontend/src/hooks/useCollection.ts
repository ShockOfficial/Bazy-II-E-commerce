import { useEffect, useState } from 'react';
import { ProductType } from '../common/types';
import { useAuthContext } from './useAuthContext';

interface useCollectionReturn {
	documents: Array<ProductType> | ProductType | null;
	error: string | null;
	isLoading: boolean;
}

export const useCollection = (url: string): useCollectionReturn => {
	const [documents, setDocuments] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { user } = useAuthContext();

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(url, {
					headers: {
						Authorization: `Bearer ${user?.token}`
					},
					signal: signal
				});
				const json = await response.json();

				if (!response.ok) {
					setError(json.error);
				} else {
					setDocuments(json);
					setError(null);
				}
			} catch (err: any) {
				if (err.name === 'AbortError') {
					console.log('Request aborted');
				} else {
					console.log('Error occured', err);
					setError(err.message);
				}
			}

			setIsLoading(false);
		};

		fetchData();

		return () => controller.abort();
	}, [url, user]);

	return { documents, isLoading, error };
};
