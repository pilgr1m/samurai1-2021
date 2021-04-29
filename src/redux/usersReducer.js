const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_TOTAL_USERS = "SET_TOTAL_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

let initialState = {
    users: [],
    totalCount: 0,
    pageSize: 5,
    currentPage: 1
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

        default: return state
    }
}

export const followAC = (userID) => ({ type: FOLLOW, userID })
export const unfollowAC = (userID) => ({ type: UNFOLLOW, userID })
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const setTotalUsersAC = (totalCount) => ({ type: SET_TOTAL_USERS, totalCount })
export const setCurrentPageAC = (pageNumber) => ({ type: SET_CURRENT_PAGE, pageNumber })
