import React, { Component } from 'react';
// import fetch from 'whatwg-fetch'

const getData = (stockName) => {
    fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${stockName}/data.json`)
        .then((response) => {
            console.log(response);
            return response;
        });
};

// export default () => (
//     <div>
//         <h1>About Us stock</h1>
//         <p>Hello Medium!</p>
//     </div>
// )

class Stock extends Component {
    getData() {
        debugger;
        console.log(fetch);
        return fetch('https://www.quandl.com/api/v3/datasets/WIKI/goog/data.json')
            .then((response) => {
                return response.json().then(function(data) {
                    // do something with your data
                    // console.log(data);
                    return data;
                });
                // console.log(response.json());
                // return response;
            });
    }

    componentDidMount() {
        this.getData(this.props.match.params.stockName).then((data) => {
            console.log(data);
        });
    }

    render() {
        return (
            <div className="stock-screen">
                <div className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h2>Welcome to React</h2>
                    <h2>{this.props.match.params.stockName}</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

// Stock.propTypes = {
//     stockName: React.PropTypes.string
// };

export default Stock;