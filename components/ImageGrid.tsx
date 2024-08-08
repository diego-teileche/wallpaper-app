import { StyleSheet, View } from "react-native"
import React from "react"
import { MasonryFlashList } from "@shopify/flash-list"
import ImageCard from "./ImageCard"
import { getColumnCount, wp } from "@/helpers/common"

const ImageGrid = ({ images, router }: any) => {
	const columns = getColumnCount()

	return (
		<View style={styles.container}>
			<MasonryFlashList
				data={images}
				numColumns={columns}
				// @ts-ignore
				initialNumToRender={1000}
				contentContainerStyle={styles.listContainerStyle}
				renderItem={({ item, index }) => (
					<ImageCard
						item={item}
						index={index}
						columns={columns}
						router={router}
					/>
				)}
				estimatedItemSize={200}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		minHeight: 3,
		width: wp(100),
	},
	listContainerStyle: {
		paddingHorizontal: wp(4),
	},
})

export default ImageGrid
