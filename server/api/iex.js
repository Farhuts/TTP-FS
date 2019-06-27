const router = require('express').Router()
module.exports = router

const API_TOKEN = 'pk_d924c19cd47546b49ebdfdd2ace6b4dc'
const REFRESH_SECONDS = 10
const BATCH_SIZE = 30
const BASE_URL = `https://cloud.iexapis.com/v1/stock/AAPL/financials/2?token=pk_d924c19cd47546b49ebdfdd2ace6b4dc`

router.get(
  'https://cloud.iexapis.com/v1/stock/AAPL/financials/2?token=pk_d924c19cd47546b49ebdfdd2ace6b4dc',
  (req, res, next) => {
    try {
      console.log(res)
      res.json(res)
    } catch (err) {
      next(err)
    }
  }
)
