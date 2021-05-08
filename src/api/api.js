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
	getProfile(userId) {
		return instance.get(`profile/${userId}`)
	}
}

export const authAPI = {
	me() {
		return instance.get(`auth/me`)
	}
}
