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
        // this.state = {
        //     chartConfigReady: false
        // };

        // this.prop.chartConfig = false;
        // this.Stocks = {
        //     'goog': 'Google',
        //     'amzn': 'Amazon',
        //     'ibm': 'IBM',
        // };
    }

    getData(stockName) {
        // this.props.dispatch(loadStocks);
        this.props.loadStocks(stockName);
        // return fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${stockName}/data.json`)
        //     .then((response) => {
        //         return response.json().then(function(data) {
        //             return data;
        //         });
        //     });
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
    //
    // normalizeStockData(data) {
    //     let rawData;
    //     rawData = data.dataset_data.data;
    //     rawData = rawData
    //         .map((item) =>
    //             [ new Date (`${item[0]}`).getTime(), item[4]])
    //         .reverse();
    //     return rawData;
    // }

    componentDidMount() {
        // console.log('Will MOUNT111111');
        // let self = this;
        if (this.props.match.params.stockName) {
            this.getData(this.props.match.params.stockName)
                // .then((data) => {
                //     console.log(data);
                //     this.normalizeStockData(data);
                //     self.setState({chartConfig: this.getConfig(this.normalizeStockData(data))});
                // });
        }
    }

    // componentWillUpdate() {
    //     console.log('componentWillUpdate WILLL =====1111===');
    //     console.log('loading:', this.props.loading);
    //     console.log('stockData:', this.props.stockData);
    //     // const data = this.props.stockData;
    //     // if (data) {
    //     //     console.log(data);
    //     //     this.normalizeStockData(data);
    //     //     // this.setState({chartConfig: this.getConfig(this.normalizeStockData(data))});
    //     //     this.props.chartConfig = this.getConfig(this.normalizeStockData(data));
    //     // }
    // }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate DIDDD =====00===');
    //     console.log('loading:', this.props.loading);
    //     console.log('stockData:', this.props.stockData);
    //     const data = this.props.stockData;
    //     // if (data && !this.state.chartConfigReady) {
    //     //     console.log(data);
    //     //     // this.normalizeStockData(data);
    //     //     // this.setState({chartConfig: this.getConfig(this.normalizeStockData(data))});
    //     //     // this.props.chartConfig = this.getConfig(this.normalizeStockData(data));
    //     //     this.setState({ chartConfigReady: true })
    //     //     // this.render();
    //     // }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     debugger;
    //     console.log(nextProps);
    //     console.log(nextState);
    //     return true;
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps');
    //     console.log(nextProps);
    // }

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
            // chartConfig = this.getConfig(this.normalizeStockData(data));
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
// Stock.propTypes = {
//     stockName: React.PropTypes.string
// };

// export default Stock;