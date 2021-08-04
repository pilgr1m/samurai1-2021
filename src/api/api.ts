import { ProfileType } from './../redux/types';
import axios, { AxiosResponse } from "axios";


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
	follow(id: number) {
		return instance.post(`follow/${id}`)
	},
	unfollow(id: number) {
		return instance.delete(`follow/${id}`)
	},
}

export const profileAPI = {
	getProfile(userId: number) {
		return instance.get(`profile/${userId}`)
	},
	getStatus(userId: number) {
		return instance.get(`profile/status/${userId}`)
	},
	updateStatus(status: string) {
		return instance.put(`profile/status`, { status: status })
	},
	savePhoto(photoFile: any) {
		const formData = new FormData()
		formData.append("image", photoFile)

		return instance.put(`profile/photo`, formData, {
			headers: { "Content-Type": "multipart/form-data" }
		})
	},
	saveProfile(profile: ProfileType) {
		return instance.put(`profile`, profile)
	},
}

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}

export enum ResultCodesForCaptcha {
	CaptchaIsRequired = 10
}

type MeResponseType = {
	data: {
		id: number
		email: string
		login: string
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

type LoginResponseType = {
	data: {
		userId: number
	}
	resultCode: ResultCodesEnum | ResultCodesForCaptcha
	messages: Array<string>
}


export const authAPI = {
	me() {
		return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
	},
	login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then((res) => res.data)
	},
	logout() {
		return instance.delete(`auth/login`)
	},
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`)
	},

}
