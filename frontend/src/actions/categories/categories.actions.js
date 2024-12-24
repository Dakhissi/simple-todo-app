import categoryService from '../../services/categories.services';
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
} from './categories.types';

export const fetchCategories = () => async (dispatch) => {
dispatch({ type: CATEGORY_REQUEST });
try {
    const response = await categoryService.getAll();
    dispatch({ type: CATEGORY_SUCCESS, payload: response.data });
} catch (error) {
    dispatch({ type: CATEGORY_FAIL, payload: error.message });
}
};

export const fetchCategory = (id) => async (dispatch) => {
dispatch({ type: CATEGORY_REQUEST });
try {
    const response = await categoryService.get(id);
    dispatch({ type: CATEGORY_SUCCESS, payload: response.data });
} catch (error) {
    dispatch({ type: CATEGORY_FAIL, payload: error.message });
}
};

export const createCategory = (data) => async (dispatch) => {
dispatch({ type: CATEGORY_CREATE_REQUEST });
try {
    const response = await categoryService.create(data);
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: response.data });
} catch (error) {
    dispatch({ type: CATEGORY_CREATE_FAIL, payload: error.message });
}
};

export const updateCategory = (id, data) => async (dispatch) => {
dispatch({ type: CATEGORY_UPDATE_REQUEST });
try {
    const response = await categoryService.update(id, data);
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: response.data });
} catch (error) {
    dispatch({ type: CATEGORY_UPDATE_FAIL, payload: error.message });
}
};

export const deleteCategory = (id) => async (dispatch) => {
dispatch({ type: CATEGORY_DELETE_REQUEST });
try {
    await categoryService.delete(id);
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: id });
} catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
}
};