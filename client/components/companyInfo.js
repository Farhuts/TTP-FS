import React from 'react'
const ErrorMessage =
  'You do not have enough money on your account to make this investment.'

const CompanyInfo = ({
  userBalance,
  comapanyDetails,
  showComponent,
  buyShares,
  handleChange,
  value,
  hideModal
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
  for (let i = 1; i <= 50; i++) {
    quantityDropDown.push(i)
  }
  const dropDown = quantityDropDown.map(elem => {
    return (
      <option key={elem} value={elem}>
        {elem}
      </option>
    )
  })
  if (value * price > userBalance) message = ErrorMessage
  else message = ''
  return (
    <div className={showHideClassName}>
      <section className="modal-companyInfo">
        <h3 className={percentColor}>
          {(comapanyDetails.changePercent * 100).toFixed(3)}%
        </h3>
        <h2 className="companyInfo name">
          Company: {comapanyDetails.companyName}
        </h2>
        <hr />
        <h2 className="errorMessage">{message}</h2>
        <h2 className="companyInfo">Symbol: "{comapanyDetails.symbol}"</h2>
        <h3 className="companyInfo">Price: {price} USD</h3>
        <div className="dropdown">
          <div className="select-companyInfo">
            <select value={value} onChange={handleChange}>
              {dropDown}
            </select>
            <button
              className="companyInfoBtn"
              type="submit"
              onClick={buyShares}
            >
              BUY
            </button>
            <button
              className="companyInfo-NotNowBtn"
              type="submit"
              onClick={hideModal}
            >
              NOT NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CompanyInfo
