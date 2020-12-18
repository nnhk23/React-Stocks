import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state={
    stocks: [],
    ownedStocks: [],
    type: "All",
    order: ""
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(data => this.setState({stocks: data}))
  }

  purchaseStock = (stock) => {
    this.setState((prevState) => {
      return{
        ownedStocks: [stock, ...prevState.ownedStocks]
      }
    })
  }

  sortStocks = (e) => {
    let newStocks
    e.target.value === "Alphabetically" ? 
    newStocks = this.state.stocks.sort((a,b) => a.ticker > b.ticker ? 1 : -1)
      :
    newStocks = this.state.stocks.sort((a,b) => a.price - b.price)

    this.setState({
      stocks: newStocks,
      order: e.target.value
    })
  }


  stocksByType = (e) => {
    this.setState({
      type: e.target.value
    })
  }


  sellStock = (stock) => {
    this.setState((prevState)=> {
      return{
        ownedStocks: prevState.ownedStocks.filter(s => s !== stock)
      }
    })
  }

  render() {
    return (
      <div>
        <SearchBar 
          sortStocks={this.sortStocks} 
          stocksByType={this.stocksByType}
          order={this.state.order}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} purchaseStock={this.purchaseStock} type={this.state.type}/>

            </div>
            <div className="col-4">

              <PortfolioContainer ownedStocks={this.state.ownedStocks} sellStock={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
