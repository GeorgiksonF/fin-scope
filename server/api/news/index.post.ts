import axios from 'axios'
import redis from '../../utils/redis'

const API_KEY = '751deb7f981f4b90a63263b3249471f3'
const BASE_URL = 'https://newsapi.org/v2'

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event)

		if (!body.page || !body.size) {
			throw createError({
				statusCode: 400,
				message: 'Both "page" and "size" are required.'
			})
		}
		
		const page = Number(body.page)
		const size = Number(body.size)

		if (isNaN(page) || isNaN(size) || page < 1 || size < 1) {
			throw createError({
				statusCode: 400,
				message: '"page" and "size" must be positive integers.'
			})
		}

		const category = body.category || 'general'
		const cacheKey = `news_${category}_page_${page}_size_${size}`

		const cachedNews = await redis.get(cacheKey)

		if (cachedNews) {
			console.log('Cache hit')
			return JSON.parse(cachedNews)
		}

		const response = await axios.get(`${BASE_URL}/top-headlines`, {
			params: {
				category,
				apiKey: API_KEY,
				page,
				pageSize: size,
				country: body.country || 'us', 
			}
		})

		const newsData = response.data

		await redis.set(cacheKey, JSON.stringify(newsData), 'EX', 3600)

		return newsData
	} catch (error: any) {
		console.error('Error fetching news:', error)
		throw createError({
			statusCode: error.response?.status || 500,
			message: error.response?.data?.message || 'An error occurred while fetching news.'
		})
	}
		
})