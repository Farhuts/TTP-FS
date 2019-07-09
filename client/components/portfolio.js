import React, {Component} from 'react'
import Grid from './gridForPortfolio'
import {getStockValueThunk} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

import KEY from '../../auth-config/keys'
const API_TOKEN = KEY.iex.clientKey

const symbolArr = []

class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newStockValue: '',
      updatedStockInfo: ''
    }
  }
  componentDidMount() {
    this.props.getStockValueThunk()
    setTimeout(this.getUpdatedInfo, 100)
    setInterval(this.getUpdatedInfo, 10000)
  }
  getUpdatedInfo = async () => {
    try {
      let response = await axios.get(
        `https://sandbox.iexapis.com/v1/stock/market/batch?symbols=${symbolArr.join(
          ','
        )}&types=quote&displayPercent=true&filter=symbol,companyName,open,latestPrice,change,changePercent&token=${API_TOKEN}`
      )
      console.log('response', response.data)
      this.setState({
        newStockValue: response.data
      })
      let response2 = await axios.get(
        `https://sandbox.iexapis.com/v1/stock/market/batch?types=chart,price&symbols=${symbolArr.join(
          ','
        )}&range=10y&token=${API_TOKEN}`
      )
      this.setState({
        updatedStockInfo: response2.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const newStockInfo = this.state.newStockValue
    const updatedStockInfo = this.state.updatedStockInfo
    const transactionHistory = this.props.stockInfo.transaction
    const portfolioInfo = transactionHistory.portfolioStocks

    const headersArr = ['SYMBOL', 'SHARES', 'VALUE', 'OPEN PRICE', 'CUR PRICE']
    let newValue, openPrice, curPrice, stockInfo

    stockInfo =
      portfolioInfo && portfolioInfo.length ? (
        portfolioInfo.map(stock => {
          symbolArr.push(stock.symbol)
          if (newStockInfo[stock.symbol] && updatedStockInfo[stock.symbol]) {
            newValue = (
              newStockInfo[stock.symbol].quote.latestPrice * stock.shares
            ).toFixed(2)
            openPrice = newStockInfo[stock.symbol].quote.open
            curPrice = updatedStockInfo[stock.symbol].price
          } else {
            newValue = 0
            openPrice = 0
            curPrice = 0
          }

          return (
            <div key={stock.symbol}>
              <Grid
                symbol={stock.symbol}
                shares={stock.shares}
                newValue={newValue}
                openPrice={openPrice}
                curPrice={curPrice}
              />
            </div>
          )
        })
      ) : (
        <div>
          <div id="table">
            <div id="grid-item">{0}</div>
            <div id="grid-item">{0}</div>
            <div id="grid-item">{0}</div>
            <div id="grid-item">{0}</div>
            <div id="grid-item">{0}</div>
          </div>
          <div className="stockBtnEmpty-flex">
            <Link to="/stocks">
              <button className="stockBtnEmpty">BUY STOCKS</button>
            </Link>
          </div>
        </div>
      )

    return (
      <div id="margin-top" className="flex-portfolio">
        <h1>PORTFOLIO</h1>
        <div className="header-portfolio">
          {headersArr.map(elem => {
            return <div key={elem}>{elem}</div>
          })}
        </div>
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

export default connect(mapState, mapDispatch)(Portfolio)
