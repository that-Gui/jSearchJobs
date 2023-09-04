import * as React from 'react';
import axios from 'axios';
import { RAPID_API_KEY } from '@ENV';

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
	const [data, setData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const options = {
		method: 'GET',
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		headers: {
			'X-RapidAPI-Key': rapidApiKey,
			'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
		},
		params: { ...query },
	};

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const response = await axios.request(options);
			console.log(response.data.data);
			setData(response.data.data);

			setIsLoading(false);
		} catch (error) {
			setError(error);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	const refetch = () => {
		setIsLoading(true);
		fetchData();
	};

	return { data, isLoading, error, refetch };
};

export default useFetch;
