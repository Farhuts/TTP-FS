import React from 'react'

const Grid = ({curPrice, openPrice, symbol, shares, newValue}) => {
  let newStockValueColor
  if (curPrice < openPrice) newStockValueColor = 'red'
  else if (curPrice === openPrice) newStockValueColor = 'grey'
  else newStockValueColor = 'green'
  console.log('newValue', openPrice, curPrice)

  return (
    <div>
      <div id="table">
        <div id="grid-item" className={newStockValueColor}>
          "{symbol}"
        </div>
        <div id="grid-item">{shares}</div>
        <div id="grid-item">$ {newValue}</div>
        <div id="grid-item">$ {openPrice}</div>
        <div id="grid-item" className={newStockValueColor}>
          $ {curPrice}
        </div>
      </div>
    </div>
  )
}

export default Grid
