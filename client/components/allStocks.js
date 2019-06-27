import React, {Component} from 'react'
import axios from 'axios'
import CompanyInfo from './companyInfo'

const API_TOKEN = 'Tpk_08b9dbd013154143b7fb30f25df98a55'
const API_SEARCH_TOKEN = 'pk_d924c19cd47546b49ebdfdd2ace6b4dc'
const REFRESH_SECONDS = 10
const BATCH_SIZE = 30
const BASE_URL = 'https://cloud.iexapis.com/stable/stock/market/batch'

const defaultState = {
  symbol: '',
  companyInfo: '',
  showComponent: false
}

class AllStocks extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleChange(evt) {
    await this.setState({
      symbol: evt.target.value.toUpperCase()
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
          showComponent={this.state.showComponent}
        />
      </div>
    )
  }
}

export default AllStocks
