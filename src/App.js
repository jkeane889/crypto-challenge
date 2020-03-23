import React, { useState } from 'react'
import axios from 'axios';
import Pagination from './components/Pagination'
import './App.css'

/*
    Components:

    1. "Get Coins" button
    2. "Select Coins" drop down
    3. "Selected Coins" table component
    4. Pagination Component
*/

/*
    Functionality:

    1. "Get Coins" Component to fetch all coins from API
        - store coin data on client side (not ideal, would prefer to store in database and request data from server)
        - on receipt of coin data, create helper function to parse different coins
        and add these as selections in the <select> dropdown
    2. "Select Coins" will automatically filter/display selected coins' data on table component
    3. Pagination Component will allow user to view certain pages of coin results and pertinent data

*/

const App = () => {
  // React Hook to store request coin data
  const [coinData, setCoinData] = useState(null);

  // React Hook to select coins
  const [coinOptions, setCoinOptions] = useState(null);

  // React Hook to determine if loading
  const [loading, setLoading] = useState(true);

  // React Hook for pagination of coins
  const [selectedPage, setPage] = useState(1);

  // React Hook for pagination of coins
  const [maxCoinsPerPage] = useState(10);

  // Paginate function to change page numbers
  const paginate = pageNum => setPage(pageNum);

  let currentCoins;
  // Helper function to show only coins on selected Page
  if (coinData) {
    const lastCoinIndex = selectedPage * maxCoinsPerPage;
    const firstCoinIndex = lastCoinIndex - maxCoinsPerPage;
    currentCoins = coinData.slice(firstCoinIndex, lastCoinIndex) 
  }

  // Function to fetch coins
  const getAllCoins = async() => {
    try {
      await axios.get('https://api.coinlore.net/api/tickers/ ')
        .then(res => {
          // Create options for the select drop down menu
          let options = [];

          for (let i = 0; i < res.data.data.length; i++) {
            let coinObj = {};
            coinObj['coinName'] = res.data.data[i].name;
            coinObj['coinID'] = res.data.data[i].id
            options.push(coinObj)
          }

          setCoinOptions(options)
          setCoinData(res.data.data)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          console.log("Error in API request")
        })
    } catch (error) {
      console.log(error)
      console.log("Error in try/catch block")
    }
  }

  // Temporary array to store filtered coins
  let tempFilterCoins = []

  // Create function to only get filtered coin data
  const getFilteredCoin = async(id) => {
    return await axios.get(`https://api.coinlore.net/api/ticker/?id=${id}`)
  }

  // Function to get all Filtered Coin data
  const getFiletedCoinData = coinArr => {
    let requests = [];

    for (let i = 0; i < coinArr.length; i++) {
      requests.push(getFilteredCoin(coinArr[i]))
    }

    try {
      axios.all(requests)
        .then(resArr => {
          console.log("This is the response array: ", resArr)
          let filtered = []
          
          for (let j = 0; j < resArr.length; j++) {
            filtered.push(resArr[j].data[0])
          }

          setCoinData(filtered)
        })
        .catch(err => {
          console.log(err)
          console.log("Error fetching requests from API")
        })
    } catch (err) {
      console.log(err)
      console.log("Error in try/catch block")
    }

  }

  // Helper function to update search for filtered coins
  const filterCoins = coin => {
    tempFilterCoins = [...tempFilterCoins, coin]
  }

  return (
    <div className="app-container">
      <div className="get-prices-element">
        <button className="get-prices-button" onClick={() => getAllCoins()}>Get Market Data</button>  
      </div>
      <div className="select-menu">
        {!loading && 
          <div>
            <div>
              <select
                disabled={loading}
                multiple
                >
                {coinOptions.map((coin, index) => (
                  <option onClick={(e) => filterCoins(e.target.value)} key={coin.coinID} value={coin.coinID}>{coin.coinName}</option>
                ))}
              </select>
            </div>
            <div className="filter-element">
              <button className="filter-button" onClick={() => getFiletedCoinData(tempFilterCoins)}>Filter</button>
            </div>
          </div>
        }
      </div>
      <div className="coins-table">
        <table>
          <thead>
            <tr>
              <td>Symbol</td>
              <td>Name</td>
              <td>Rank</td>
              <td>Price(USD)</td>
              <td>BTC Price</td>
              <td>% Change (24HR)</td>
              <td>% Change (1HR)</td>
              <td>% Change (Week)</td>
              <td>Market Cap</td>
              <td>24HR Volume</td>
            </tr>
          </thead>
          {currentCoins &&
            <tbody>
              {currentCoins.map(coin => (
                <tr key={coin.id}>
                  <td>{coin.symbol}</td>
                  <td>{coin.name}</td>
                  <td>{coin.rank}</td>
                  <td>{coin.price_usd}</td>
                  <td>{coin.price_btc}</td>
                  <td>{coin.percent_change_24h}</td>
                  <td>{coin.percent_change_1h}</td>
                  <td>{coin.percent_change_7d}</td>
                  <td>{coin.market_cap_usd}</td>
                  <td>{coin.volume24}</td>
                </tr>
              ))}
            </tbody>  
          }
        </table>
      </div>
      <div className="pagination">
        {coinData &&
          <Pagination 
            totalCoins={coinData.length}
            maxCoinsPerPage={maxCoinsPerPage}
            paginate={paginate}
          />
        }
      </div>
    </div>
  )
}

export default App;