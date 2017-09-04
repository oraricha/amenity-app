import React from 'react'
import { Link } from 'react-router-dom'
import { getStocksMap } from '../../helpers/utils'
import './Home.css'

const stocks = getStocksMap();

const getStockBlocks = (stocks) => {
    return stocks.map((stock) => {
        return (
            <li key={stock.code}>
                <Link to={`/stock/${stock.code}`} className="stock-box">{stock.name}</Link>
            </li>
        );
    });
};

const Home = props => (
    <div>
        <ul className="stocks">
            {getStockBlocks(stocks)}
        </ul>
    </div>
);

export default Home;
