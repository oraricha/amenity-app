import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
window.Highcharts = Highcharts;
// import fetch from 'whatwg-fetch'

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
        this.state = {};
        this.Stocks = {
            'goog': 'Google',
            'amzn': 'Amazon',
            'ibm': 'IBM',
        };
    }

    getData(stockName) {
        return fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${stockName}/data.json`)
            .then((response) => {
                return response.json().then(function(data) {
                    return data;
                });
            });
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

    normalizeStockData(data) {
        let rawData;
        rawData = data.dataset_data.data;
        rawData = rawData
            .map((item) =>
                [ new Date (`${item[0]}`).getTime(), item[4]])
            .reverse();
        return rawData;
    }

    componentWillMount() {
        let self = this;
        if (this.props.match.params.stockName) {

            this.getData(this.props.match.params.stockName).then((data) => {
                console.log(data);
                this.normalizeStockData(data);
                self.setState({chartConfig: this.getConfig(this.normalizeStockData(data))});
            });
        }
    }

    render() {
        const chartConfig = this.state.chartConfig;
        let chart;

        if (chartConfig) {
            chart = <ReactHighstock config = {chartConfig} />;
        }

        return (
            <div className="stock-screen">
                <div className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                </div>
                <h2>{this.props.match.params.stockName}</h2>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {chart}
            </div>
        );
    }
}

// Stock.propTypes = {
//     stockName: React.PropTypes.string
// };

export default Stock;