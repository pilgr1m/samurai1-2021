import axios from "axios";


const instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.0/",
	withCredentials: true,
	headers: {
		"API-KEY": "cbbe8417-8782-43a7-8314-2afccb45bcb2"
	}
})

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 5) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data)
	},
	follow(id) {
		return instance.post(`follow/${id}`)
	},
	unfollow(id) {
		return instance.delete(`follow/${id}`)
	},
}

export const profileAPI = {
	getProfile(userId) {
		return instance.get(`profile/${userId}`)
	},
	getStatus(userId) {
		return instance.get(`profile/status/${userId}`)
	},
	updateStatus(status) {
		return instance.put(`profile/status`, { status: status })
	},
	savePhoto(photoFile) {
		const formData = new FormData()
		formData.append("image", photoFile)

		return instance.put(`profile/photo`, formData, {
			headers: { "Content-Type": "multipart/form-data" }
		})
	},
	saveProfile(profile) {
		return instance.put(`profile`, profile)
	},
}

export const authAPI = {
	me() {
		return instance.get(`auth/me`)
	},
	login(email, password, rememberMe = false) {
		return instance.post(`auth/login`, { email, password, rememberMe })
	},
	logout(email, password, rememberMe = false) {
		return instance.delete(`auth/login`, { email, password, rememberMe })
	},
}
