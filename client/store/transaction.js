import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_STOCK_VALUE = 'GET_STOCK_VALUE'
const BUY_STOCK = 'BUY_STOCK'

// INITIAL STATE
const defaultTransactions = {}

// ACTION CREATORS
const getTransactions = userTransactions => ({
  type: GET_TRANSACTIONS,
  userTransactions
})

const getStockValue = stockInfo => ({
  type: GET_STOCK_VALUE,
  stockInfo
})
const createTransaction = user => ({type: BUY_STOCK, user})

// THUNK CREATORS
export const getTransactionsThunk = () => async dispatch => {
  try {
    let allTransactions = await axios.get('/api/transactions/all')
    dispatch(getTransactions(allTransactions.data))
  } catch (err) {
    console.error(err)
  }
}

// THUNK CREATORS
export const getStockValueThunk = () => async dispatch => {
  try {
    let allStocks = await axios.get('/api/transactions/portfolio')
    dispatch(getStockValue(allStocks.data))
  } catch (err) {
    console.error(err)
  }
}

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
    case GET_TRANSACTIONS:
      return action.userTransactions
    case GET_STOCK_VALUE:
      return action.stockInfo
    default:
      return state
  }
}
