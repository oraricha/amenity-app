const LOAD = 'stocks/LOAD';
const LOAD_SUCCESS = 'stocks/LOAD_SUCCESS';
const LOAD_FAIL = 'stocks/LOAD_FAIL';
// const TOGGLE_SEARCH = 'search/TOGGLE_SEARCH';
// const CLOSE_SEARCH = 'search/CLOSE_SEARCH';

const initialState = {
    loading: false,
    loaded: false,
    stockData: false,
};

const API_KEY = 'vPxx3bsAEMezcEsGfDye';

const normalizeStockData = (data) => {
    let rawData;
    rawData = data.dataset_data.data;
    rawData = rawData
        .map((item) =>
            [ new Date (`${item[0]}`).getTime(), item[4]])
        .reverse();
    return rawData;
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true,
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: null,
                stockData: action.result
            };
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
            };
        default:
            return state;
    }
}

export function loadStocks(stockName) {
    return (dispatch) => {
        dispatch({
            type: LOAD
        });

        fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${stockName}/data.json?api_key=${API_KEY}`)
            .then((response) => {
                return response.json().then(function(data) {

                    dispatch(loadStocksSuccess(normalizeStockData(data)));
                });
            })
            .catch((error) => dispatch(loadStocksFail()));
    }
}

export function loadStocksSuccess(data) {
    return {
        type: LOAD_SUCCESS,
        result: data
    };
}

export function loadStocksFail() {
    return {
        type: LOAD_FAIL,
    };
}

// export function toggleSearch() {
//     return {
//         type: TOGGLE_SEARCH,
//     };
// }
//
// export function closeSearch() {
//     return {
//         type: CLOSE_SEARCH,
//     };
// }

// export function load(term) {
//     return {
//         types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//         promise: (client) => client.get(`/feeds/consumer?channels=10&search=${term}&limit=22`)
//     };
// }