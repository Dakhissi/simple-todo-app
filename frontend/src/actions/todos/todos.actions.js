import todoDataService from '../../services/todos.services';
import {
TODOS_REQUEST,
TODOS_SUCCESS,
TODOS_FAIL,
TODO_CREATE_REQUEST,
TODO_CREATE_SUCCESS,
TODO_CREATE_FAIL,
TODO_UPDATE_REQUEST,
TODO_UPDATE_SUCCESS,
TODO_UPDATE_FAIL,
TODO_DELETE_REQUEST,
TODO_DELETE_SUCCESS,
TODO_DELETE_FAIL
} from './todos.types';


export const fetchTodos = () => async (dispatch) => {
dispatch({ type: TODOS_REQUEST });
try {
    const { data } = await todoDataService.getAll();
    dispatch({ type: TODOS_SUCCESS, payload: data });
} catch (error) {
    dispatch({ type: TODOS_FAIL, payload: error.message });
    return Promise.reject(error);
}
};

export const createTodo = (todo) => async (dispatch) => {
dispatch({ type: TODO_CREATE_REQUEST });
try {
    const { data } = await todoDataService.create(todo);
    dispatch({ type: TODO_CREATE_SUCCESS, payload: data });
    return Promise.resolve(data);
} catch (error) {
    dispatch({ type: TODO_CREATE_FAIL, payload: error.message });
    return Promise.reject(error);
}
};

export const updateTodo = (id, todo) => async (dispatch) => {
dispatch({ type: TODO_UPDATE_REQUEST });
try {
    const { data } = await todoDataService.update(id, todo);
    dispatch({ type: TODO_UPDATE_SUCCESS, payload: data });
    return Promise.resolve(data);
} catch (error) {
    dispatch({ type: TODO_UPDATE_FAIL, payload: error.message });
    return Promise.reject(error);
}
};

export const deleteTodo = (id) => async (dispatch) => {
dispatch({ type: TODO_DELETE_REQUEST });
try {
    await todoDataService.delete(id);
    dispatch({ type: TODO_DELETE_SUCCESS, payload: id });
    return Promise.resolve(id);
} catch (error) {
    dispatch({ type: TODO_DELETE_FAIL, payload: error.message });
    return Promise.reject(error);
}
};