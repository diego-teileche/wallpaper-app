import { StyleSheet, Text, View } from "react-native"
import React, { useMemo } from "react"
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"

const FiltersModal = ({ modalRef }: any) => {
	const snapPoints = useMemo(() => ["25%", "50%"], [])

	return (
		<BottomSheetModal
			ref={modalRef}
			index={0}
			snapPoints={snapPoints}
			enablePanDownToClose={true}
			// onChange={handleSheetChanges}
		>
			<BottomSheetView style={styles.contentContainer}>
				<Text>Awesome 🎉</Text>
			</BottomSheetView>
		</BottomSheetModal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
})

export default FiltersModal
