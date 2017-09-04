import { normalizeStockData } from '../helpers/utils'

const LOAD = 'stocks/LOAD';
const LOAD_SUCCESS = 'stocks/LOAD_SUCCESS';
const LOAD_FAIL = 'stocks/LOAD_FAIL';
const LOAD_COMPARE = 'stocks/LOAD_COMPARE';
const LOAD_COMPARE_SUCCESS = 'stocks/LOAD_COMPARE_SUCCESS';
const LOAD_COMPARE_FAIL = 'stocks/LOAD_COMPARE_FAIL';
const UNLOAD_COMPARE = 'stocks/UNLOAD_COMPARE';

const initialState = {
    loading: false,
    loaded: false,
    stockData: false,
    loadingCompare: false,
    loadedCompare: false,
    compareStockData: false
};

const API_KEY = 'vPxx3bsAEMezcEsGfDye';

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

        case LOAD_COMPARE:
            return {
                ...state,
                loadingCompare: true,
            };
        case LOAD_COMPARE_SUCCESS:
            return {
                ...state,
                loadingCompare: false,
                loadedCompare: true,
                error: null,
                compareStockData: action.result
            };
        case LOAD_COMPARE_FAIL:
            return {
                ...state,
                loadingCompare: false,
                loadedCompare: false,
                error: action.error,
                compareStockData: false
            };
        case UNLOAD_COMPARE:
            return {
                ...state,
                loadingCompare: false,
                loadedCompare: true,
                compareStockData: false
            };
        default:
            return state;
    }
}

const loadStock = (dispatch, stockName, successCallback, failCallback) => {
    fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${stockName}/data.json?api_key=${API_KEY}`)
        .then((response) => {
            return response.json().then(function(data) {

                dispatch(successCallback(normalizeStockData(data)));
            });
        })
        .catch((error) => dispatch(failCallback()));
};

export function loadStocks(stockName) {
    return (dispatch) => {
        dispatch({
            type: LOAD
        });

        loadStock(dispatch, stockName,loadStocksSuccess,loadStocksFail);
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

export function loadCompareStock(stockName) {
    return (dispatch) => {
        dispatch({
            type: LOAD_COMPARE
        });

        loadStock(dispatch, stockName,loadCompareStockSuccess,loadCompareStockFail);
    }
}

export function loadCompareStockSuccess(data) {
    return {
        type: LOAD_COMPARE_SUCCESS,
        result: data
    };
}

export function loadCompareStockFail() {
    return {
        type: LOAD_COMPARE_FAIL,
    };
}

export function unloadCompareStock() {
    return {
        type: UNLOAD_COMPARE,
    };
}
