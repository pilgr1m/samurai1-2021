import { addPostAC, deletePost, profileReducer } from "./profileReducer"
// it("test name", () => {
//     //test body:
//          1.data - данные
//          2. action - действие (логика)
//          3.expectation - (ожидания на выходе)
// })
const state = {
    posts: [
        { id: 1, post: "Hello, friend", likes: 5 },
        { id: 2, post: "Hi, dude!", likes: 7 },
    ]
}
// let action = addPostAC("Don't stop")

it("length posts shoul be incremented", () => {
    //1. test data
    let action = addPostAC("Don't stop")
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.posts.length).toBe(3)
})

it("text of new post should be correct", () => {
    //1. test data
    let action = addPostAC("Don't stop")
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.posts[2].post).toBe("Don't stop")
})

it("after deleting length-posts should be devrement", () => {
    //1. test data
    let action = deletePost(1)
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.posts.length).toBe(1)
})

it("after deleting length shouldn't be changed if ID incorrect", () => {
    //1. test data
    let action = deletePost(10000)
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.posts.length).toBe(2)
})




