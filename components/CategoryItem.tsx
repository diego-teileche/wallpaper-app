import { Pressable, StyleSheet, Text } from "react-native"
import React from "react"
import { theme } from "@/constants/theme"
import { hp } from "@/helpers/common"
import Animated, { FadeInRight } from "react-native-reanimated"

interface CategoryItemProps {
	title: string
	index: any
	isActive: any
	handleChangeCategory: any
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	title,
	index,
	isActive,
	handleChangeCategory,
}) => {
	let color = isActive ? theme.colors.white : theme.colors.neutral(0.8)
	let backgroundColor = isActive
		? theme.colors.neutral(0.8)
		: theme.colors.white

	return (
		<Animated.View
			entering={FadeInRight.delay(index * 200)
				.duration(1000)
				.springify()
				.damping(14)}
		>
			<Pressable
				onPress={() => handleChangeCategory(isActive ? null : title)}
				style={[styles.category, { backgroundColor }]}
			>
				<Text style={[styles.title, { color }]}>{title}</Text>
			</Pressable>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	category: {
		padding: 12,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: theme.colors.grayBG,
		// backgroundColor: theme.colors.neutral(0.1),
		borderRadius: theme.radius.lg,
		borderCurve: "continuous",
	},
	title: {
		fontSize: hp(1.8),
		fontWeight: theme.fontWeights.medium,
	},
})

export default CategoryItem
