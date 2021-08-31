import { InitialStateType, actions, usersReducer } from './usersReducer';

let state: InitialStateType

beforeEach(() => {
	state = {
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
				id: 2, name: "Van 2", followed: true,
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

test('follow success', () => {

	const newState = usersReducer(state, actions.followSuccess(1))

	expect(newState.users[0].followed).toBeFalsy()
	expect(newState.users[1].followed).toBeTruthy()
	expect(newState.users[2].followed).toBeTruthy()

})

test('unfollow success', () => {

	const newState = usersReducer(state, actions.unfollowSuccess(1))

	expect(newState.users[0].followed).toBeFalsy()
	expect(newState.users[1].followed).toBeFalsy()
	expect(newState.users[2].followed).toBeTruthy()

})
