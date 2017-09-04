import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    loadStocks,
    loadStocksSuccess,
    // loadStocksFail
} from '../../modules/chart';
import { getStockByCode } from '../../helpers/utils'
import './Stock.css';
window.Highcharts = Highcharts;

// const getData = (stockName) => {
//     fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${stockName}/data.json`)
//         .then((response) => {
//             console.log(response);
//             return response;
//         });
// };

// export default () => (
//     <div>
//         <h1>About Us stock</h1>
//         <p>Hello Medium!</p>
//     </div>
// )

class Stock extends Component {
    constructor(props) {
        super(props);
    }

    getData(stockName) {
        this.props.loadStocks(stockName);
    }

    getConfig(data) {
        const stockName = this.props.match.params.stockName.toUpperCase();
        return {
            rangeSelector: {
                selected: 1
            },
            title: {
                text: `${stockName} Stock Price`
            },
            series: [{
                name: stockName,
                data: data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        };

    }

    componentDidMount() {
        if (this.props.match.params.stockName) {
            this.getData(this.props.match.params.stockName)
        }
    }


    render() {
        const stock = getStockByCode(this.props.match.params.stockName);
        console.log('render!!');
        console.log('loading:', this.props.loading);
        // const chartConfig = this.state.chartConfig;
        let chart;
        let chartConfig = this.props.chartConfig;

        if (this.props.stockData) {
            chartConfig = this.getConfig(this.props.stockData);
        }

        if (chartConfig) {
            chart = <ReactHighstock config = {chartConfig} />;
        }

        return (
            <div className="stock-screen">
                <h2>{stock.name}</h2>
                {chart}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.chart.loading,
    stockData: state.chart.stockData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadStocks,
    loadStocksSuccess,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stock)

Stock.defaultProps = {
    chartConfig: false
};