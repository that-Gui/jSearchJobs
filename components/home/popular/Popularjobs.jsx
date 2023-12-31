import * as React from 'react';
import { useRouter } from 'expo-router';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from 'react-native';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants/theme';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../lib/useFetch';

export default function Popularjobs() {
	const router = useRouter();
	const { data, isLoading, error } = useFetch('search', {
		query: 'React native developer, Portugal',
		page: '1',
		num_pages: '1',
	});

	const [selectedJob, setSelectedJob] = React.useState();

	const handleCardPress = (item) => {
		router.push(`/job-details/${item.job_id}`);
		setSelectedJob(item.job_id);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Popular jobs</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>Show all</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size='large' color={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<PopularJobCard
								item={item}
								selectedJob={selectedJob}
								handleCardPress={handleCardPress}
							/>
						)}
						keyExtractor={(item) => item.job_id}
						contentContainerStyle={{ columnGap: SIZES.medium }}
						horizontal
					/>
				)}
			</View>
		</View>
	);
}
