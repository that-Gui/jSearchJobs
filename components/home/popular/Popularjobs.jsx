import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SIZES, COLORS } from '../../../constants';

import styles from './popularjobs.style';
import { FlatList } from 'react-native-gesture-handler';
import PopularJobCard from '../../../components/common/cards/popular/PopularJobCard';
import useFetch from '../../../lib/useFetch';

const Popularjobs = () => {
	const router = useRouter();
	const { data, isLoading, error } = useFetch('search', {
		query: 'JavaScript Developer',
		page: 1,
		num_pages: 1,
	});
	console.log(data);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Popular Jobs</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>View All</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size='large' color={COLORS.primary} />
				) : error ? (
					<Text>{error}</Text>
				) : (
					<FlatList
						data={data}
						renderItem={({ item }) => <PopularJobCard item={item} />}
						keyExtractor={(item) => item?.job_id}
						contentContainerStyle={{ columnGap: SIZES.medium }}
						horizontal
					/>
				)}
			</View>
			{/*  */}
		</View>
	);
};

export default Popularjobs;
