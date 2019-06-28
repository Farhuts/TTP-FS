import React, {Component} from 'react'
import axios from 'axios'
import CompanyInfo from './companyInfo'
import {connect} from 'react-redux'
import {newTransactionThunk} from '../store'

const API_TOKEN = 'Tpk_08b9dbd013154143b7fb30f25df98a55'
const API_SEARCH_TOKEN = 'pk_d924c19cd47546b49ebdfdd2ace6b4dc'
const REFRESH_SECONDS = 10
const BATCH_SIZE = 30
const BASE_URL = 'https://cloud.iexapis.com/stable/stock/market/batch'

const defaultState = {
  quantity: 1,
  symbol: '',
  companyInfo: '',
  showComponent: false
}

class AllStocks extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.buyShares = this.buyShares.bind(this)
  }

  async handleChange(evt) {
    await this.setState({
      symbol: evt.target.value.toUpperCase()
    })
  }

  handleChangeDropDown(evt) {
    console.log('target', evt.target.value)
    this.setState({
      quantity: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const symbol = this.state.symbol
    axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${API_TOKEN}`
      )
      .then(response => {
        this.setState({
          companyInfo: response.data,
          showComponent: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  buyShares(evt) {
    evt.preventDefault()
    console.log('BUYSHARES', typeof this.state.quantity)
    let transactionInfo = {
      symbol: this.state.symbol,
      shares: this.state.quantity,
      price: this.state.companyInfo.iexRealtimePrice,
      userId: this.props.user.id
    }
    this.props.newTransactionThunkDispatch(transactionInfo)
  }
  render() {
    return (
      <div>
        <h3>Select a company</h3>
        <form id="todo-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.symbol}
            placeholder="Search Company"
          />
          <button type="submit">FIND</button>
        </form>
        <CompanyInfo
          comapanyDetails={this.state.companyInfo}
          handleChange={this.handleChangeDropDown}
          value={this.state.quantity}
          showComponent={this.state.showComponent}
          buyShares={this.buyShares}
        />
      </div>
    )
  }
}
const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  newTransactionThunkDispatch: info => dispatch(newTransactionThunk(info))
})

export default connect(mapState, mapDispatch)(AllStocks)
