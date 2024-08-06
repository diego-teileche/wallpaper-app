import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { capitalize } from "@/helpers/common"
import { theme } from "@/constants/theme"

const CommonFilterRow = ({ data, filterName, filters, setFilters }: any) => {
	return (
		<View style={styles.flexRowWrap}>
			{data &&
				data.map((item: any) => {
					if (item) {
						let isActive = filters && filters[filterName] === item
						let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white"
						let color = isActive ? "white" : theme.colors.neutral(0.7)

						return (
							<Pressable
								key={item}
								style={[styles.outlineButton, { backgroundColor }]}
							>
								<Text style={[styles.outlineButtonText, { color }]}>
									{capitalize(item)}
								</Text>
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
	outlineButton: {
		padding: 8,
		paddingHorizontal: 14,
		borderWidth: 1,
		borderColor: theme.colors.grayBG,
		borderRadius: theme.radius.xs,
		borderCurve: "continuous",
	},
	outlineButtonText: {},
})

export default CommonFilterRow
