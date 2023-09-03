import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SIZES, COLORS } from '../../../constants';

import styles from './popularjobs.style';
import { FlatList } from 'react-native-gesture-handler';
import PopularJobCard from '../../../components/common/cards/popular/PopularJobCard';

const Popularjobs = () => {
	const router = useRouter();
	const isLoading = false;
	const error = false;

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
					<Text>Something Went worg</Text>
				) : (
					<FlatList
						data={[1, 2, 3, 4, 5, 6, 7, 8]}
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
