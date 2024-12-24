import {

CATEGORY_REQUEST,
CATEGORY_SUCCESS,
CATEGORY_FAIL,
CATEGORY_CREATE_REQUEST,
CATEGORY_CREATE_SUCCESS,
CATEGORY_CREATE_FAIL,
CATEGORY_UPDATE_REQUEST,
CATEGORY_UPDATE_SUCCESS,
CATEGORY_UPDATE_FAIL,
CATEGORY_DELETE_REQUEST,
CATEGORY_DELETE_SUCCESS,
CATEGORY_DELETE_FAIL
} from '../actions/categories/categories.types';

const initialState = {
categories: [],
loading: false,
error: null
};

const categoriesReducer = (state = initialState, action) => {
switch (action.type) {
    case CATEGORY_REQUEST:
    case CATEGORY_CREATE_REQUEST:
    case CATEGORY_UPDATE_REQUEST:
    case CATEGORY_DELETE_REQUEST:
        return {
            ...state,
            loading: true,
            error: null
        };
    case CATEGORY_SUCCESS:
        return {
            ...state,
            loading: false,
            categories: action.payload
        };
    case CATEGORY_CREATE_SUCCESS:
        return {
            ...state,
            loading: false,
            categories: [...state.categories, action.payload]
        };
    case CATEGORY_UPDATE_SUCCESS:
        return {
            ...state,
            loading: false,
            categories: state.categories.map(category =>
                category.id === action.payload.id ? action.payload : category
            )
        };
    case CATEGORY_DELETE_SUCCESS:
        return {
            ...state,
            loading: false,
            categories: state.categories.filter(category => category.id !== action.payload)
        };
    case CATEGORY_FAIL:
    case CATEGORY_CREATE_FAIL:
    case CATEGORY_UPDATE_FAIL:
    case CATEGORY_DELETE_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    default:
        return state;
}
};

export default categoriesReducer;