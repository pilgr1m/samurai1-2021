import { actions } from './profileReducer';
import { APIResponseType, ResultCodesEnum } from './../api/api';
import { usersAPI } from "../api/usersAPI"
import { follow } from "./usersReducer"

jest.mock('../api/usersAPI')

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unfollow.mockClear()
})

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    message: [],
    data: {}
}


userAPIMock.follow.mockReturnValue(Promise.resolve(result))
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('follow success thunk', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})


    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowProgress(false, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowProgress(false, 1))

})
