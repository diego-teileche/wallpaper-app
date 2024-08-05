import { StyleSheet, Text, View } from "react-native"
import React, { useMemo } from "react"
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import CustomBackdrop from "./CustomBackdrop"

const FiltersModal = ({ modalRef }: any) => {
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
