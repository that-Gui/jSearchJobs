import * as React from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './popularjobcard.style';
/* import { checkImageURL } from '../../../../utils'; */

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
	console.log(item);
	return (
		<TouchableOpacity
			style={styles.container(selectedJob, item)}
			onPress={() => handleCardPress(item)}
		>
			<Text>{item.employer_name}</Text>
		</TouchableOpacity>
	);
};

export default PopularJobCard;
