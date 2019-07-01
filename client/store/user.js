import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_USER = 'GET_USER'
const GET_USER_INFO = 'GET_USER_INFO'
const REMOVE_USER = 'REMOVE_USER'

// INITIAL STATE
const defaultUser = {}

// ACTION CREATORS
const getUser = user => ({type: GET_USER, user})
const getUserInfo = userInfo => ({type: GET_USER_INFO, userInfo})
const removeUser = () => ({type: REMOVE_USER})

// THUNK CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const userInfo = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/home')
    dispatch(getUserInfo(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (userInfo, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {userInfo})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_USER_INFO:
      return action.userInfo
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
