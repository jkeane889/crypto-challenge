// reducers.js

import { FETCH_PRICES_PENDING, FETCH_PRICES_SUCCESS, FETCH_PRICES_ERROR} from './actions';

const initialState = {
  pending: false,
  prices: [],
  error: null
}

export function pricesReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PRICES_PENDING:
      return {
        ...state, 
        pending: true
      }
    case FETCH_PRICES_SUCCESS:
      return {
        ...state,
        pending: false,
        prices: action.payload
      }
    case FETCH_PRICES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state;
  }
}

// selector functions - used to get defined parts of the state
export const getPrices = state => state.prices;
export const getPricesPending = state => state.pending;
export const getPricesError = state => state.error;