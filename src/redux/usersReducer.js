const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_TOTAL_USERS = "SET_TOTAL_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

let initialState = {
    users: [],
    totalCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return { ...user, followed: true }
                    }
                    return user
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return { ...user, followed: false }
                    }
                    return user
                })
            }

        case SET_USERS:
            return { ...state, users: action.users }

        case SET_TOTAL_USERS:
            return { ...state, totalCount: action.totalCount }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.pageNumber }

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }

        default: return state
    }
}

export const follow = (userID) => ({ type: FOLLOW, userID })
export const unfollow = (userID) => ({ type: UNFOLLOW, userID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setTotalUsers = (totalCount) => ({ type: SET_TOTAL_USERS, totalCount })
export const setCurrentPage = (pageNumber) => ({ type: SET_CURRENT_PAGE, pageNumber })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
