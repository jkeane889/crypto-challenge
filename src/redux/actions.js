// actions.js

export const FETCH_PRICES_PENDING = 'FETCH_PRICES_PENDING';
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS';
export const FETCH_PRICES_ERROR = 'FETCH_PRICES_ERROR';

function fetchPricesPending() {
  return {
    type: FETCH_PRICES_PENDING
  }
}

function fetchPricesSuccess(prices) {
  return {
    type: FETCH_PRICES_SUCCESS,
    prices: prices
  }
}

function fetchPricesError(error) {
  return {
    type: FETCH_PRICES_ERROR,
    error: error
  }
}


