import fetch from 'isomorphic-fetch'

export function fetchCustomList() {
    return (dispatch, getState) => { //这个dispatch来自于thunk,返回一个函数
        //dispatch一个action告诉UI发出post了，等待结果
        console.log('dispatch一个,发出post了，等待结果')
        return fetch(`http://120.25.161.0:8080/webbase5/api/user/appUserSetting/list?userId=1&type=1`)
            .then(response => response.json())
            .then(json => {
                dispatch(receiveThreads(json))
                console.log('mock dispatch:收到post')
                console.log(json)
            })
    }
}

export const addArticle = (content) => {
    return {
        type: 'ADD_ARTICLE',
        item_id: Date.parse(new Date()).toString(),
        content
    }
}
export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

export const REQUEST_POSTS = 'REQUEST_POSTS'

function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit = '') {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function(dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        // dispatch(requestPosts(subreddit))

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`http://localhost:3001/api/download_thread`) //http://www.reddit.com/r/${subreddit}.json
            .then(response => response.json())
            // .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        // dispatch(receivePosts(subreddit, json))
        // )

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}
export const getList = () => {
    return {
        type: 'GET_LIST',
    }
}

export const getItem = (item_id) => {
    return {
        type: 'GET_ITEM',
        item_id
    }
}
