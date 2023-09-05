import * as React from 'react';

import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
} from 'react-native';

import { Stack, useRouter, useLocalSearchParams } from 'expo-router';

import {
	Company,
	JobAbout,
	JobFooter,
	JobTabs,
	ScreenHeaderBtn,
} from '../../components';

import { COLORS, SIZES, icons } from '../../constants';

import useFetch from '../../lib/useFetch';

export default function JobDetails() {
	const params = useLocalSearchParams();
	const router = useRouter();

	const { data, error, isLoading, reFetch } = useFetch('job-details', {
		job_id: params.id,
		extended_publisher_details: 'false',
	});

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowStyle: false,
					headerBackVisible: false,
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={icons.left}
							dimensions='60%'
							handlePress={() => router.goBack()}
						/>
					),
					headerTitle: `${data[0].job_title}`,
				}}
			>
				<View>JobDetails</View>;
			</Stack.Screen>
		</SafeAreaView>
	);
}
