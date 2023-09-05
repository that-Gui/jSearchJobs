import * as React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { SIZES, icons } from '../../../constants';

const jobTypes = ['Full-time', 'Part-time', 'Contractor'];

export default function Welcome({ searchTerm, setSearchTerm, handleClick }) {
	const router = useRouter();
	const [activeJobType, setActiveJobType] = React.useState('Full-time');

	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.userName}>Yo, Gui</Text>
				<Text style={styles.welcomeMessage}>Find a Job</Text>
			</View>
			{/*  */}
			<View style={styles.searchContainer}>
				<View style={styles.searchWrapper}>
					<TextInput
						style={styles.searchInput}
						value={searchTerm}
						onChangeText={(text) => {
							setSearchTerm(text);
						}}
						placeholder='Which job are you looking for?'
					/>
				</View>

				<TouchableOpacity
					style={styles.searchBtn}
					onPress={() => handleClick()}
				>
					<Image
						source={icons.search}
						resizeMode='contain'
						style={styles.searchBtnImage}
					/>
				</TouchableOpacity>
			</View>
			{/*  */}
			<View style={styles.tabsContainer}>
				<FlatList
					data={jobTypes}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.tab(activeJobType, item)}
							onPress={() => {
								setActiveJobType(item);
								router.push(`/search/${item}`);
							}}
						>
							<Text style={styles.tabText(activeJobType, item)}>{item}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item}
					contentContainerStyle={{ columnGap: SIZES.small }}
					horizontal
				/>
			</View>
			{/*  */}
		</View>
	);
}
