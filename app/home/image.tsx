import { Button, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import { BlurView } from "expo-blur"
import { wp } from "@/helpers/common"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Image } from "expo-image"
import { theme } from "@/constants/theme"

const ImageScreen = () => {
	const router = useRouter()
	const item = useLocalSearchParams()
	const [status, setStatus] = useState("")
	let uri = item?.webformatURL

	const getSize = () => {
		return {
			width: 200,
			height: 200,
		}
	}

	const onLoad = () => {
		setStatus("")
	}

	return (
		<BlurView style={styles.container} tint="dark" intensity={60}>
			<View style={[]}>
				<Image
					transition={100}
					style={[styles.image, getSize()]}
					source={uri}
					onLoad={onLoad}
				/>
			</View>

			<Button title="Back" onPress={() => router.back()} />
		</BlurView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: wp(4),
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	image: {
		borderRadius: theme.radius.lg,
		borderWidth: 2,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderColor: "rgba(255, 255, 255, 0.1)",
	},
})

export default ImageScreen
