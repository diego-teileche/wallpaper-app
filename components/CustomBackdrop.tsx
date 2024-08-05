import { StyleSheet } from "react-native"
import React from "react"
import { BlurView } from "expo-blur"
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated"

const CustomBackdrop = ({ animatedIndex, style }: any) => {
	const containerAnimatedStyle = useAnimatedStyle(() => {
		let opacity = interpolate(
			animatedIndex.value,
			[-1, 0],
			[0, 1],
			Extrapolation.CLAMP
		)

		return { opacity }
	})

	const containerStyle = [
		StyleSheet.absoluteFill,
		style,
		styles.overlay,
		containerAnimatedStyle,
	]

	return (
		<Animated.View style={containerStyle}>
			<BlurView
				style={StyleSheet.absoluteFill}
				// experimentalBlurMethod="blur"
				tint="dark"
				intensity={5}
			/>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
})

export default CustomBackdrop
