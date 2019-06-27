import React from 'react'

const CompanyInfo = props => {
  const {comapanyDetails, showComponent} = props
  let showHideClassName = showComponent
    ? 'component display-block'
    : 'component display-none'
  return (
    <div className={showHideClassName}>
      <h2>
        Name: {comapanyDetails.companyName}, Symbol: {comapanyDetails.symbol}
      </h2>
      <h3>price: {comapanyDetails.iexRealtimePrice}USD</h3>
      <h3>data {comapanyDetails.latestTime}</h3>
    </div>
  )
}

export default CompanyInfo
