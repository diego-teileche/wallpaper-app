import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { theme } from "@/constants/theme"

const ColorFilter = ({ data, filterName, filters, setFilters }: any) => {
	const onSelect = (item: any) => {
		setFilters({ ...filters, [filterName]: item })
	}

	return (
		<View style={styles.flexRowWrap}>
			{data &&
				data.map((item: any) => {
					if (item) {
						let isActive = filters && filters[filterName] === item
						let borderColor = isActive ? theme.colors.neutral(0.4) : "white"

						return (
							<Pressable key={item} onPress={() => onSelect(item)}>
								<View style={[styles.colorWrapper, { borderColor }]}>
									<View style={[styles.color, { backgroundColor: item }]} />
								</View>
							</Pressable>
						)
					} else {
						return (
							<View key={item}>
								<Text>Diego</Text>
							</View>
						)
					}
				})}
		</View>
	)
}

const styles = StyleSheet.create({
	flexRowWrap: {
		flexWrap: "wrap",
		flexDirection: "row",
		gap: 10,
	},
	colorWrapper: {
		padding: 3,
		borderRadius: theme.radius.sm,
		borderWidth: 2,
		borderCurve: "continuous",
	},
	color: {
		height: 30,
		width: 40,
		borderRadius: theme.radius.sm - 3,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: theme.colors.neutral(0.5),
	},
})

export default ColorFilter
