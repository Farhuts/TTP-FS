import React, {Component} from 'react'
import {getStockValueThunk} from '../store'
import {connect} from 'react-redux'
import axios from 'axios'

import KEY from '../../auth-config/keys'
const API_TOKEN = KEY.iex.clientKey

const symbolArr = []

class OwnedStocks extends Component {
  constructor(props) {
    super(props)
    this.state = {newInfo: ''}
  }
  componentDidMount() {
    this.props.getStockValueThunk()
    setTimeout(this.getUpdatedInfo, 100)
    setInterval(this.getUpdatedInfo, 10000)
  }
  getUpdatedInfo = async () => {
    try {
      let response = await axios.get(
        `https://sandbox.iexapis.com/v1/stock/market/batch?types=chart,price&symbols=${symbolArr.join(
          ','
        )}&range=10y&token=${API_TOKEN}`
      )
      this.setState({
        newInfo: response.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const newStockInfo = this.state.newInfo
    let newPrice,
      newStockValue,
      newStockResult,
      newStockValueColor,
      total = 0
    const stockInfo = this.props.stockInfo.transaction.length ? (
      this.props.stockInfo.transaction.map(stock => {
        symbolArr.push(stock.symbol)
        if (newStockInfo[stock.symbol])
          newPrice = newStockInfo[stock.symbol].price
        else newPrice = 0

        newStockValue = (
          stock.price * stock.shares -
          newPrice * stock.shares
        ).toFixed(2)
        newStockResult = newStockValue.toString().split('')
        if (newStockResult[0] === '-') newStockValueColor = 'red'
        else if (newStockValue === (stock.price * stock.shares).toFixed(2))
          newStockValueColor = 'gray'
        else newStockValueColor = 'green'

        return (
          <div key={stock.id}>
            <h3 className={newStockValueColor}>
              {' '}
              symbol: {stock.symbol}, shares: qty{stock.shares}
              value: ${newStockValue}
            </h3>
            <h3>bought: {stock.date}</h3>
          </div>
        )
      })
    ) : (
      <div>Not yet</div>
    )

    return (
      <div id="margin-top">
        <h1>PORTFOLIO</h1>
        <h2 />
        {stockInfo}
      </div>
    )
  }
}
const mapState = state => ({
  stockInfo: state
})

const mapDispatch = dispatch => ({
  getStockValueThunk: () => dispatch(getStockValueThunk())
})

export default connect(mapState, mapDispatch)(OwnedStocks)
