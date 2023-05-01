import { useEffect, useState } from 'react';

interface useCollectionReturn {
	documents: Array<any>;
	error: string | null;
	isLoading: boolean;
}

export const useCollection = (url: string): useCollectionReturn => {
	const [documents, setDocuments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(url, { signal });
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
	}, [url]);

	return { documents, isLoading, error };
};
