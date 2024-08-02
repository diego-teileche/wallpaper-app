import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Stack } from "expo-router"

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	)
}

const styles = StyleSheet.create({})

export default Layout
