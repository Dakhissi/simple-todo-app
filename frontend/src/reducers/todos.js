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
} from '../actions/todos/todos.types';

const initialState = {
todos: [],
loading: false,
error: null
};

const todosReducer = (state = initialState, action) => {
switch (action.type) {
    case TODOS_REQUEST:
    case TODO_CREATE_REQUEST:
    case TODO_UPDATE_REQUEST:
    case TODO_DELETE_REQUEST:
        return {
            ...state,
            loading: true
        };
    case TODOS_SUCCESS:
        return {
            ...state,
            loading: false,
            todos: action.payload
        };
    case TODO_CREATE_SUCCESS:
        return {
            ...state,
            loading: false,
            todos: [...state.todos, action.payload]
        };
    case TODO_UPDATE_SUCCESS:
        return {
            ...state,
            loading: false,
            todos: state.todos.map(todo =>
                todo.id === action.payload.id ? action.payload : todo
            )
        };
    case TODO_DELETE_SUCCESS:
        return {
            ...state,
            loading: false,
            todos: state.todos.filter(todo => todo.id !== action.payload)
        };
    case TODOS_FAIL:
    case TODO_CREATE_FAIL:
    case TODO_UPDATE_FAIL:
    case TODO_DELETE_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    default:
        return state;
}
};

export default todosReducer;