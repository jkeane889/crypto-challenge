// fetchPrices.js

import { fetchPricesPending, fetchPricesSuccess, fetchPricesError }  from './actions';

function fetchPrices() {
    return dispatch => {
        dispatch(fetchPricesPending());
        fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05')
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                throw(res.error)
            }
            dispatch(fetchPricesSuccess(res.prices));
            return res.prices;
        })
        .catch(error => {
            dispatch(fetchPricesError(error));
        })
    }
}

export default fetchPrices;