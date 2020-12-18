import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  renderStock = () => {
    let stockList
    if (this.props.type === 'All'){
      stockList = this.props.stocks
    } else {
      stockList = this.props.stocks.filter(stock => stock.type === this.props.type)
    }
    
    return stockList.map(stock => 
      <Stock 
        key={stock.id}
        stock={stock} 
        purchaseStock={this.props.purchaseStock}
      />)
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.renderStock()}
      </div>
    );
  }

}

export default StockContainer;
