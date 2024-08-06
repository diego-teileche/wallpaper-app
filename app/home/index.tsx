import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons"
import { theme } from "@/constants/theme"
import { StatusBar } from "expo-status-bar"
import { hp, wp } from "@/helpers/common"
import Categories from "@/components/Categories"
import { apiCall } from "@/api"
import ImageGrid from "@/components/ImageGrid"
import { debounce } from "lodash"
import FiltersModal from "@/components/FiltersModal"

interface fetchImagesParamsProps {
	page: number
	q?: string
	category?: string
}

var page = 1

const HomeScreen = () => {
	const { top } = useSafeAreaInsets()
	const paddingTop = top > 0 ? top + 10 : 30

	const [search, setSearch] = useState("")
	const [activeCategory, setActiveCategory] = useState(null)
	const [images, setImages] = useState<any>([])
	const [filters, setFilters] = useState(null)
	const searchInputRef = useRef<TextInput>(null)
	const modalRef = useRef<any>(null)

	useEffect(() => {
		fetchImages()
	}, [])

	const fetchImages = async (
		params: fetchImagesParamsProps = { page: 1 },
		append = false
	) => {
		let res = await apiCall(params)

		if (res?.success && res?.data?.hits) {
			if (append) {
				setImages([...images, ...res.data.hits])
			} else {
				setImages([...res.data.hits])
			}
		}
	}

	const handleChangeCategory = (cat: any) => {
		setActiveCategory(cat)
		clearSearch()
		setImages([])
		page = 1
		let params: fetchImagesParamsProps = {
			page,
			// @ts-ignore
			...filters,
		}

		if (cat) params.category = cat

		fetchImages(params, false)
	}

	const handleSearch = (text: string) => {
		setSearch(text)

		if (text.length > 2) {
			page = 1
			setImages([])
			setActiveCategory(null)
			fetchImages(
				{
					page,
					q: text,
					// @ts-ignore
					...filters,
				},
				false
			)
		}

		if (text === "") {
			page = 1
			searchInputRef?.current?.clear()
			setImages([])
			setActiveCategory(null)
			fetchImages(
				{
					page,
					// @ts-ignore
					...filters,
				},
				false
			)
		}
	}

	const clearSearch = () => {
		setSearch("")
		searchInputRef?.current?.clear()
	}

	const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

	const openFilterModal = () => modalRef?.current?.present()

	const closeFilterModal = () => modalRef?.current?.close()

	const applyFilters = () => {
		if (filters) {
			page = 1
			setImages([])
			let params = {
				page,
				// @ts-ignore
				...filters,
			}

			if (activeCategory) params.category = activeCategory
			if (search) params.q = search

			fetchImages(params, false)
		}

		closeFilterModal()
	}

	const resetFilters = () => {
		if (filters) {
			page = 1
			setFilters(null)
			setImages([])
			let params = {
				page,
			}

			// @ts-ignore
			if (activeCategory) params.category = activeCategory
			// @ts-ignore
			if (search) params.q = search

			fetchImages(params, false)
		}

		closeFilterModal()
	}

	const clearThisFilter = (filterName: any) => {
		// @ts-ignore
		let filterz: any = { ...filters }
		delete filterz[filterName]
		setFilters({ ...filterz })
		page = 1
		setImages([])
		let params = {
			page,
			...filterz,
		}

		if (activeCategory) params.category = activeCategory
		if (search) params.q = search

		fetchImages(params, false)
	}

	return (
		<View style={[styles.container, { paddingTop }]}>
			<StatusBar style="dark" />

			<View style={styles.header}>
				<Pressable>
					<Text style={styles.title}>Pixels</Text>
				</Pressable>

				<Pressable onPress={openFilterModal}>
					<FontAwesome6
						name="bars-staggered"
						size={22}
						color={theme.colors.neutral(0.7)}
					/>
				</Pressable>
			</View>

			<ScrollView contentContainerStyle={{ gap: 15 }}>
				<View style={styles.searchBar}>
					<View style={styles.searchIcon}>
						<Feather
							name="search"
							size={24}
							color={theme.colors.neutral(0.4)}
						/>
					</View>

					<TextInput
						placeholder="Search for photos..."
						// value={search}
						ref={searchInputRef}
						onChangeText={handleTextDebounce}
						style={styles.searchInput}
					/>

					{search && (
						<Pressable
							onPress={() => handleSearch("")}
							style={styles.closeIcon}
						>
							<Ionicons
								name="close"
								size={24}
								color={theme.colors.neutral(0.6)}
							/>
						</Pressable>
					)}
				</View>

				<View>
					<Categories
						activeCategory={activeCategory}
						handleChangeCategory={handleChangeCategory}
					/>
				</View>

				{filters && (
					<View>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.filters}
						>
							{Object.keys(filters).map((key, index) => {
								return (
									<View key={key} style={styles.filterItem}>
										{key === "colors" ? (
											<View
												style={{
													height: 20,
													width: 30,
													borderRadius: 7,
													backgroundColor: filters[key],
												}}
											/>
										) : (
											<Text style={styles.filterItemText}>{filters[key]}</Text>
										)}

										<Pressable
											style={styles.filterCloseIcon}
											onPress={() => clearThisFilter(key)}
										>
											<Ionicons
												name="close"
												size={14}
												color={theme.colors.neutral(0.9)}
											/>
										</Pressable>
									</View>
								)
							})}
						</ScrollView>
					</View>
				)}

				<View>{images.length > 0 && <ImageGrid images={images} />}</View>

				<View
					style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}
				>
					<ActivityIndicator size="large" />
				</View>
			</ScrollView>

			<FiltersModal
				modalRef={modalRef}
				filters={filters}
				setFilters={setFilters}
				onClose={closeFilterModal}
				onApply={applyFilters}
				onReset={resetFilters}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 15,
	},
	header: {
		marginHorizontal: wp(4),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: hp(4),
		fontWeight: theme.fontWeights.semibold,
		color: theme.colors.neutral(0.9),
	},
	searchBar: {
		marginHorizontal: wp(4),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 1,
		borderColor: theme.colors.grayBG,
		backgroundColor: theme.colors.neutral(0.1),
		padding: 6,
		paddingLeft: 10,
		borderRadius: theme.radius.lg,
	},
	searchIcon: {
		padding: 8,
	},
	searchInput: {
		flex: 1,
		borderRadius: theme.radius.sm,
		paddingVertical: 10,
		fontSize: hp(1.8),
	},
	closeIcon: {
		backgroundColor: theme.colors.neutral(0.2),
		padding: 8,
		borderRadius: theme.radius.sm,
	},
	filters: {
		paddingHorizontal: wp(4),
		gap: 10,
	},
	filterItem: {
		backgroundColor: theme.colors.grayBG,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: theme.radius.xs,
		padding: 8,
		gap: 10,
		paddingHorizontal: 10,
	},
	filterItemText: {
		fontSize: hp(1.9),
	},
	filterCloseIcon: {
		backgroundColor: theme.colors.neutral(0.2),
		padding: 4,
		borderRadius: 7,
	},
})

export default HomeScreen
