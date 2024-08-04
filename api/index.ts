import { EXPO_API_KEY } from "@env"
import axios from "axios"

const apiUrl = `https://pixabay.com/api/?key=${EXPO_API_KEY}`

const formatUrl = (params: any) => {
	let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true"

	if (!params) return url

	let paramKeys = Object.keys(params)
	paramKeys.map((key) => {
		let value = key === "q" ? encodeURIComponent(params[key]) : params[key]

		url += `&${key}=${value}`
	})

	console.log("Final url: ", url)
	return url
}

export const apiCall = async (params: any) => {
	try {
		const response = await axios.get(formatUrl(params))
		const { data } = response

		return { success: true, data }
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Got error in apiCall function: ", error.message)
			return { success: false, msg: error.message }
		} else {
			console.error("Unknown error: ", error)
		}
	}
}
