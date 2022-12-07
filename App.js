import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";

import Spinner from 'react-native-loading-spinner-overlay';

const DATA = [
	{
		id: "0",
		title: "0",
	},
];

const Item = ({ title, btn, setBtn, setLoading }) => (  
	<TouchableOpacity
		onPress={() => {
			console.log(title);
      setLoading(true)
      setTimeout(()=> {
        setLoading(false)
        if (btn !== title) {
          setBtn(title);
        } else {
          setBtn('');
        }
      },2000);
		}}
	>
		<View style={styles.item}>
			<Text style={styles.title}>{title}</Text>
		</View>
	</TouchableOpacity>
);

export default function App() {
  const [loading, setLoading] = useState(false);
	const [btn, setBtn] = useState("");
	useEffect(() => {
		for (let i = 1; i < 1000; i++) {
			DATA.push({
				id: i,
				title: i,
			});
		}
    console.log('useEffect ran');
	}, []);
	const renderItem = ({ item }) => <Item title={item.title} btn={btn} setBtn={setBtn} setLoading={setLoading} />;

	return (
		<SafeAreaView>
      <Spinner
          visible={loading}
          textStyle={styles.spinnerTextStyle}
        />
			<View style={styles.container}>
				<Text style={styles.numBox}>{btn}</Text>
				<FlatList
					data={DATA}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		marginTop: 20,
	},
	numBox: {
		padding: 20,
		fontSize: 50,
	},
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});
