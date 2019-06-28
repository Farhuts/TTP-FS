import axios from 'axios'
import history from '../history'

// ACTION TYPES
const BUY_STOCK = 'BUY_STOCK'

// INITIAL STATE
const defaultTransactions = {}

// ACTION CREATORS
const createTransaction = user => ({type: BUY_STOCK, user})

// THUNK CREATORS
export const newTransactionThunk = info => async dispatch => {
  try {
    let updated = await axios.post('/api/transactions/stocks', info)
    dispatch(createTransaction(updated))
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case BUY_STOCK:
      return {...state, action: action.user}
    default:
      return state
  }
}
