interface colorsProps {
	white: string
	black: string
	grayBG: string
	neutral: (opacity: number) => string
}

interface fontWeightsProps {
	medium: any
	semibold: any
	bold: any
}

interface radiusProps {
	xs: number
	sm: number
	md: number
	lg: number
	xl: number
}

interface themeProps {
	colors: colorsProps
	fontWeights: fontWeightsProps
	radius: radiusProps
}

export const theme: themeProps = {
	colors: {
		white: "#f0f0f0",
		black: "#0f0f0f",
		grayBG: "#e5e5e5",
		neutral: (opacity: number) => `rgba(10, 10, 10, ${opacity})`,
	},
	fontWeights: {
		medium: "500",
		semibold: "600",
		bold: "700",
	},
	radius: {
		xs: 10,
		sm: 12,
		md: 14,
		lg: 16,
		xl: 18,
	},
}
