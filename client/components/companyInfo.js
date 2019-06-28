import React from 'react'

const CompanyInfo = ({
  comapanyDetails,
  showComponent,
  buyShares,
  handleChange,
  value
}) => {
  let percentColor
  let showHideClassName = showComponent
    ? 'component display-block'
    : 'component display-none'

  if (comapanyDetails.changePercent) {
    let result = comapanyDetails.changePercent.toString().split('')
    if (result[0] === '-') percentColor = 'red'
    else percentColor = 'green'
  }
  let quantityDropDown = []
  for (let i = 0; i < 1000; i++) {
    quantityDropDown.push(i)
  }
  const dropDown = quantityDropDown.map(elem => {
    return (
      <option key={elem} value={elem}>
        {elem}
      </option>
    )
  })
  return (
    <div className={showHideClassName}>
      <h5 className={percentColor}>{comapanyDetails.changePercent}</h5>
      <h2>
        Name: {comapanyDetails.companyName}, Symbol: {comapanyDetails.symbol}
      </h2>
      <h3>price: {comapanyDetails.iexRealtimePrice}USD</h3>
      <h3>data {comapanyDetails.latestTime}</h3>
      <div className="dropdown">
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
