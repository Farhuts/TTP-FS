import React, {Component} from 'react'
import axios from 'axios'
import CompanyInfo from './companyInfo'
import Modal from './modal'
import {connect} from 'react-redux'
import {newTransactionThunk} from '../store'

import KEY from '../../auth-config/keys'
const API_TOKEN = KEY.iex.clientKey

const defaultState = {
  quantity: 1,
  symbol: '',
  companyInfo: '',
  showComponent: false,
  showModalComp: false
}

class AllStocks extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(evt) {
    await this.setState({
      symbol: evt.target.value.toUpperCase()
    })
  }

  handleChangeDropDown = evt => {
    this.setState({
      quantity: evt.target.value
    })
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    const symbol = this.state.symbol
    try {
      let response = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${API_TOKEN}`
      )
      console.log('response', response.data)
      this.setState({
        companyInfo: response.data,
        showComponent: true
      })
    } catch (err) {
      if (err) {
        this.setState({showModalComp: true})
      }
    }
  }

  buyShares = evt => {
    evt.preventDefault()
    let transactionInfo = {
      symbol: this.state.symbol,
      name: this.state.companyInfo.companyName,
      shares: this.state.quantity,
      price:
        this.state.companyInfo.iexRealtimePrice ||
        this.state.companyInfo.latestPrice,
      userId: this.props.user.id,
      date: this.state.companyInfo.latestTime
    }
    this.props.newTransactionThunkDispatch(transactionInfo)
  }
  showModal = () => {
    this.setState({showModalComp: true})
  }

  hideModal = () => {
    this.setState({
      showModalComp: false,
      showComponent: false,
      symbol: ''
    })
  }
  render() {
    const userBalance = this.props.user.balance
    return (
      <div id="margin-top" className="main">
        <div className="allStocksPadding">
          <div className="allStocksBoarder">
            <h3> SEARCH SYMBOLS</h3>
            <form id="input-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.symbol}
                placeholder="Search Company"
              />
              <button className="findStockBtn" type="submit">
                FIND
              </button>
            </form>
          </div>
        </div>
        <CompanyInfo
          userBalance={userBalance}
          comapanyDetails={this.state.companyInfo}
          handleChange={this.handleChangeDropDown}
          value={this.state.quantity}
          showComponent={this.state.showComponent}
          buyShares={this.buyShares}
          hideModal={this.hideModal}
        />
        <Modal
          hideModal={this.hideModal}
          showModalComp={this.state.showModalComp}
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
