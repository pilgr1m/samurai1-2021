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
	}


}

export const followAPI = {
	unfollow(id) {
		return instance.get(`follow/${id}`)
	}


}


// export const getUsers = (currentPage = 1, pageSize = 5) => {
// 	return axios.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
// }
