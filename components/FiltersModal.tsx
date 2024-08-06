import { StyleSheet, Text, View } from "react-native"
import React, { useMemo } from "react"
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import CustomBackdrop from "./CustomBackdrop"
import { capitalize, hp } from "@/helpers/common"
import { theme } from "@/constants/theme"
import SectionView from "./SectionView"
import CommonFilterRow from "./CommonFilterRow"
import { data, filtersProps } from "@/constants/data"

type FilterKeys = keyof filtersProps

const FiltersModal = ({
	modalRef,
	onClose,
	onApply,
	onReset,
	filters,
	setFilters,
}: any) => {
	const snapPoints = useMemo(() => ["50%", "75%"], [])

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

					{Object.keys(sections).map((sectionName) => {
						const sectionKeys = sectionName as FilterKeys
						let sectionView = sections[sectionName]
						let sectionData = data.filters[sectionKeys]
						let title = capitalize(sectionName)

						return (
							<View key={sectionName}>
								<SectionView
									title={title}
									content={sectionView({
										data: sectionData,
										filters,
										setFilters,
										filterName: sectionName,
									})}
								/>
							</View>
						)
					})}
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	)
}

const sections: { [key: string]: (props: any) => React.ReactNode } = {
	order: (props: any) => <CommonFilterRow {...props} />,
	orientation: (props: any) => <CommonFilterRow {...props} />,
	type: (props: any) => <CommonFilterRow {...props} />,
	colors: (props: any) => <CommonFilterRow {...props} />,
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
	content: {
		width: "100%",
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
})

export default FiltersModal
