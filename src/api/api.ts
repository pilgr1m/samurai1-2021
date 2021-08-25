import axios, { AxiosResponse } from "axios";
import { UserType } from "../redux/types";

export const instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.0/",
	withCredentials: true,
	headers: {
		"API-KEY": "cbbe8417-8782-43a7-8314-2afccb45bcb2"
	}
})

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}
export enum ResultCodesForCaptcha {
	CaptchaIsRequired = 10
}

export type GetItemsType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum | ResultCodesForCaptcha> = {
	data: D
	message: Array<string>
	resultCode: RC
}
