import { hp, wp } from "@/helpers/common"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { Image, StyleSheet, Text, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

const WelcomeScreen = () => {
	return (
		<View style={styles.container}>
			<StatusBar style="light" />

			<Image
				source={require("../assets/images/welcome.jpg")}
				style={styles.bgImage}
				resizeMode="cover"
			/>

			<Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
				<LinearGradient
					colors={[
						"rgba(255, 255, 255, 0)",
						"rgba(255, 255, 255, 0.5)",
						"white",
						"white",
					]}
					style={styles.gradient}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 0.8 }}
				/>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgImage: {
		width: wp(100),
		height: hp(100),
		position: "absolute",
	},
	gradient: {
		position: "absolute",
		width: wp(100),
		height: hp(35),
		bottom: 0,
	},
})

export default WelcomeScreen
