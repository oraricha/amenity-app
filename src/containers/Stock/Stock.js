import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    loadStocks,
    loadStocksSuccess,
    loadCompareStock,
    loadCompareStockSuccess,
    unloadCompareStock
} from '../../modules/chart';
import { getStockByCode, getStocksMap } from '../../helpers/utils'
import './Stock.css';
window.Highcharts = Highcharts;


class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCompare: 'none'
        };
    }

    getData(stockName) {
        this.props.loadStocks(stockName);
    }

    getConfig(stockData, compareStockData) {
        const stockName = this.props.match.params.stockName.toUpperCase();
        let config =  {
            rangeSelector: {
                selected: 1
            },
            title: {
                text: `${stockName} Stock Price`
            },
            series: [{
                name: stockName,
                data: stockData,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        };

        if (compareStockData) {
            config.series.push({
                name: this.refs.compareStockSelect.value || '',
                data: compareStockData,
                tooltip: {
                    valueDecimals: 2
                }
            })
        }

        return config;
    }

    componentDidMount() {
        if (this.props.match.params.stockName) {
            this.getData(this.props.match.params.stockName);
        }
    }

    componentWillUnmount() {
        this.props.unloadCompareStock();
    }

    handleChange(event) {
        const stockCode = event.target.value;
        this.setState({ selectedCompare: stockCode });
        if (stockCode === 'none') {
            this.props.unloadCompareStock();
        } else {
            this.props.loadCompareStock(stockCode);
        }

    }

    getStockBlocks(stocks) {
        return stocks.map((stock) => {
            return (
                <option key={stock.code} value={stock.code}>{stock.name}</option>
            );
        });
    }

    render() {
        const stocks = getStocksMap();
        const stockOptions = this.getStockBlocks(stocks);
        const stock = getStockByCode(this.props.match.params.stockName);

        let chart;
        let chartConfig = this.props.chartConfig;

        if (this.props.stockData) {
            chartConfig = this.getConfig(this.props.stockData, this.props.compareStockData);
        }

        if (chartConfig) {
            chart = <ReactHighstock config = {chartConfig} />;
        }

        return (
            <div className="stock-screen">
                <h2>{stock.name}</h2>
                <select value={this.state.selectedCompare} onChange={(event) => this.handleChange(event)} ref="compareStockSelect">
                    <option value="none">Compare to</option>
                    {stockOptions}
                </select>
                {chart}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.chart.loading,
    stockData: state.chart.stockData,
    compareStockData: state.chart.compareStockData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadStocks,
    loadStocksSuccess,
    loadCompareStock,
    loadCompareStockSuccess,
    unloadCompareStock
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stock)

Stock.defaultProps = {
    chartConfig: false
};