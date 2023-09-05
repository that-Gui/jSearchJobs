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

const tabs = ['About', 'Qualifications', 'Responsibilities'];

export default function JobDetails() {
	const params = useLocalSearchParams();
	const router = useRouter();

	const { data, error, isLoading, reFetch } = useFetch('job-details', {
		job_id: params.id,
		extended_publisher_details: 'false',
	});

	const [activeTab, setActiveTab] = React.useState(tabs[0]);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		refetch();
		setRefreshing(false);
	}, []);

	const displayTabContent = () => {
		switch (activeTab) {
			case 'Qualifications':
				return (
					<Specifics
						title='Qualifications'
						points={data[0].job_highlights?.Qualifications ?? ['N/A']}
					/>
				);

			case 'About':
				return (
					<JobAbout info={data[0].job_description ?? 'No data provided'} />
				);

			case 'Responsibilities':
				return (
					<Specifics
						title='Responsibilities'
						points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
					/>
				);

			default:
				return null;
		}
	};

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
							handlePress={() => router.back()}
						/>
					),
					headerTitle: `${data[0]?.job_title}`,
				}}
			/>

			<React.Fragment>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					{isLoading ? (
						<ActivityIndicator size='large' color={COLORS.primary} />
					) : error ? (
						<Text>Something went wrong</Text>
					) : data.length === 0 ? (
						<Text>No data available</Text>
					) : (
						<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
							<Company
								companyLogo={data[0].employer_logo}
								jobTitle={data[0].job_title}
								companyName={data[0].employer_name}
								location={data[0].job_country}
							/>

							<JobTabs
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>

							{displayTabContent()}
						</View>
					)}
				</ScrollView>
				<JobFooter
					url={
						data[0]?.job_google_link ??
						'https://careers.google.com/jobs/results/'
					}
				/>
			</React.Fragment>
		</SafeAreaView>
	);
}
