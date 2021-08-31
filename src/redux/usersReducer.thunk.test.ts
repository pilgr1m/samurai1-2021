import { APIResponseType, ResultCodesEnum } from './../api/api';
import { usersAPI } from "../api/usersAPI"
import { follow } from "./usersReducer"

jest.mock('../api/usersAPI')
const userAPIMock = usersAPI
const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    message: [],
    data: {}
}

// @ts-ignore
userAPIMock.follow.mockReturnValue(result)

test('thunk ', async () => {
    const thunk = follow(1)

    const dispatchMock = jest.fn()

    // @ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)

})
