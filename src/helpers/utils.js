export function getStocksMap () {
    return [{
        name: 'Google',
        code: 'goog'
    },{
        name: 'Amazon',
        code: 'amzn'
    },{
        name: 'Facebook',
        code: 'fb'
    },{
        name: 'Apple',
        code: 'appl'
    },{
        name: 'IBM',
        code: 'ibm'
    },{
        name: 'Dell',
        code: 'dell'
    },{
        name: 'HP',
        code: 'hp'
    },{
        name: 'Nvidia',
        code: 'NVDA'
    }];
}

export function getStockByCode(code) {
    const stocks =
        {
            'goog':{
                name: 'Google',
                code: 'goog'
            },
            'amzn':{
                name: 'Amazon',
                code: 'amzn'
            },
            'fb':{
                name: 'Facebook',
                code: 'fb'
            },
            'appl':{
                name: 'Apple',
                code: 'AAPL'
            },
            'ibm':{
                name: 'IBM',
                code: 'ibm'
            },
            'dell':{
                name: 'Dell',
                code: 'dell'
            },
            'hp':{
                name: 'HP',
                code: 'HPQ'
            },
            'NVDA':{
                name: 'Nvidia',
                code: 'NVDA'
            }
        };

    return stocks[code];
}

export function normalizeStockData(data) {
    let rawData;
    rawData = data.dataset_data.data;
    rawData = rawData
        .map((item) =>
            [ new Date (`${item[0]}`).getTime(), item[4]])
        .reverse();
    return rawData;
}