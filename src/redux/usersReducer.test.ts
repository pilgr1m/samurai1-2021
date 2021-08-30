import { InitialStateType } from './usersReducer';

// let initialState = {
// 	users: [] as UserType[],
// 	totalCount: 0,
// 	pageSize: 5,
// 	currentPage: 1,
// 	isFetching: true,
// 	followingInProgress: [] as Array<number>,//arr user's ids
// }


test('', () => {

	const state: InitialStateType = {
		users: [
			{
				id: 0, name: "Van 0", followed: false,
				photos: { small: null, large: null }, status: "status 0"
			},
			{
				id: 1, name: "Van 1", followed: false,
				photos: { small: null, large: null }, status: "status 1"
			},
			{
				id: 2, name: "Van 2", followed: false,
				photos: { small: null, large: null }, status: "status 2"
			},
			{
				id: 3, name: "Van 3", followed: false,
				photos: { small: null, large: null }, status: "status 3"
			},
		],
		totalCount: 0,
		pageSize: 5,
		currentPage: 1,
		isFetching: false,
		followingInProgress: [],
	}

})
