import { Pressable, StyleSheet, Text, View } from "react-native"
import React, { useMemo } from "react"
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import CustomBackdrop from "./CustomBackdrop"
import { capitalize, hp } from "@/helpers/common"
import { theme } from "@/constants/theme"
import SectionView from "./SectionView"
import CommonFilterRow from "./CommonFilterRow"
import { data, filtersProps } from "@/constants/data"
import ColorFilter from "./ColorFilter"
import Animated, { FadeInDown } from "react-native-reanimated"

type FilterKeys = keyof filtersProps

const FiltersModal = ({
	modalRef,
	onClose,
	onApply,
	onReset,
	filters,
	setFilters,
}: any) => {
	const snapPoints = useMemo(() => ["75%", "95%"], [])

	return (
		<BottomSheetModal
			ref={modalRef}
			index={0}
			snapPoints={snapPoints}
			enablePanDownToClose={true}
			backdropComponent={CustomBackdrop}
			// onChange={handleSheetChanges}
		>
			<BottomSheetView style={styles.contentContainer}>
				<View style={styles.content}>
					<Text style={styles.filterText}>Filters</Text>

					{Object.keys(sections).map((sectionName, index) => {
						const sectionKeys = sectionName as FilterKeys
						let sectionView = sections[sectionName]
						let sectionData = data.filters[sectionKeys]
						let title = capitalize(sectionName)

						return (
							<Animated.View
								key={sectionName}
								entering={FadeInDown.delay(index * 100 + 100)
									.springify()
									.damping(11)}
							>
								<SectionView
									title={title}
									content={sectionView({
										data: sectionData,
										filters,
										setFilters,
										filterName: sectionName,
									})}
								/>
							</Animated.View>
						)
					})}

					<Animated.View
						entering={FadeInDown.delay(500).springify().damping(11)}
						style={styles.buttons}
					>
						<Pressable style={styles.resetButton} onPress={onReset}>
							<Text
								style={[
									styles.buttonText,
									{ color: theme.colors.neutral(0.9) },
								]}
							>
								Reset
							</Text>
						</Pressable>

						<Pressable style={styles.applyButton} onPress={onApply}>
							<Text style={[styles.buttonText, { color: theme.colors.white }]}>
								Apply
							</Text>
						</Pressable>
					</Animated.View>
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	)
}

const sections: { [key: string]: (props: any) => React.ReactNode } = {
	order: (props: any) => <CommonFilterRow {...props} />,
	orientation: (props: any) => <CommonFilterRow {...props} />,
	type: (props: any) => <CommonFilterRow {...props} />,
	colors: (props: any) => <ColorFilter {...props} />,
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
	content: {
		gap: 15,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	filterText: {
		fontSize: hp(4),
		fontWeight: theme.fontWeights.semibold,
		color: theme.colors.neutral(0.8),
		marginBottom: 5,
	},
	buttons: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	resetButton: {
		flex: 1,
		backgroundColor: theme.colors.neutral(0.03),
		padding: 12,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: theme.radius.md,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: theme.colors.grayBG,
	},
	buttonText: {
		fontSize: hp(2.2),
	},
	applyButton: {
		flex: 1,
		backgroundColor: theme.colors.neutral(0.8),
		padding: 12,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: theme.radius.md,
		borderCurve: "continuous",
	},
})

export default FiltersModal
