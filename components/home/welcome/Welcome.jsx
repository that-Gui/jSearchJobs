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

const Welcome = () => {
	const router = useRouter();

	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.userName}>Yo, Gui</Text>
				<Text style={styles.welcomeMessage}>Find a Job</Text>
			</View>

			<View style={styles.searchContainer}>
				<View style={styles.searchWrapper}>
					<TextInput
						style={styles.searchInput}
						value=''
						onChange={() => {}}
						placeholder='Which job are you looking for?'
					/>
				</View>
				<TouchableOpacity style={styles.searchBtn}>
					<Image
						source={icons.search}
						resizeMode='contain'
						style={styles.searchBtnImage}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Welcome;
