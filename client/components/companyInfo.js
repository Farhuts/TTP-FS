import React from 'react'
const ErrorMessage =
  'You do not have enough money in your account to make this investment.'

const CompanyInfo = ({
  userBalance,
  comapanyDetails,
  showComponent,
  buyShares,
  handleChange,
  value
}) => {
  let percentColor
  let message
  let price = comapanyDetails.iexRealtimePrice || comapanyDetails.latestPrice
  let showHideClassName = showComponent
    ? 'component display-block'
    : 'component display-none'

  if (comapanyDetails.changePercent) {
    let result = comapanyDetails.changePercent.toString().split('')
    if (result[0] === '-') percentColor = 'red'
    else percentColor = 'green'
  }
  let quantityDropDown = []
  for (let i = 1; i < 1000; i++) {
    quantityDropDown.push(i)
  }
  const dropDown = quantityDropDown.map(elem => {
    return (
      <option key={elem} value={elem}>
        {elem}
      </option>
    )
  })
  if (value * comapanyDetails.iexRealtimePrice > userBalance)
    message = ErrorMessage
  else message = ''
  return (
    <div className={showHideClassName}>
      <h5 className={percentColor}>{comapanyDetails.changePercent}</h5>
      <h2>
        Name: {comapanyDetails.companyName}, Symbol: {comapanyDetails.symbol}
      </h2>
      <h3>price: {price}USD</h3>
      <h3>data {comapanyDetails.latestTime}</h3>
      <div className="dropdown">
        <h2 className="errorMessage">{message}</h2>
        <select value={value} onChange={handleChange}>
          {dropDown}
        </select>
        <button type="submit" onClick={buyShares}>
          BUY
        </button>
      </div>
    </div>
  )
}

export default CompanyInfo
