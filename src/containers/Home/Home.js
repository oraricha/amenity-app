import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
        {/*<h1>Home</h1>*/}
        {/*<p>Welcome home!</p>*/}
        {/*<button onClick={() => props.changePage()}>Go to about page via redux</button>*/}
        <ul className="stocks">
            {getStockBlocks(stocks)}
            {/*<li>*/}
                {/*<div className="btn-stock"></div>*/}
                {/*<Link to="/stock/goog" className="stock-box">Google</Link>*/}
            {/*</li>*/}
        </ul>
    </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/stock/')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Home)