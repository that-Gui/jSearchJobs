import * as React from 'react';
import axios from 'axios';
import { RAPID_API_KEY } from '@env';

const rapidApiKey = RAPID_API_KEY;

export default function useFetch(endPoint, query) {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const axios = require('axios');

	const options = {
		method: 'GET',
		url: `https://jsearch.p.rapidapi.com/${endPoint}`,
		params: { ...query },
		headers: {
			'X-RapidAPI-Key': rapidApiKey,
			'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
		},
	};

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const response = await axios.request(options);

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
}
