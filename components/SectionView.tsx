import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { hp } from "@/helpers/common"
import { theme } from "@/constants/theme"

interface SectionViewProps {
	title: string
	content: any
}

const SectionView: React.FC<SectionViewProps> = ({ title, content }) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.sectionTitle}>{title}</Text>

			<View style={styles.sectionContent}>{content}</View>
		</View>
	)
}

const styles = StyleSheet.create({
	sectionContainer: {
		gap: 8,
	},
	sectionTitle: {
		fontSize: hp(2.4),
		fontWeight: theme.fontWeights.medium,
		color: theme.colors.neutral(0.8),
	},
	sectionContent: {},
})

export default SectionView
