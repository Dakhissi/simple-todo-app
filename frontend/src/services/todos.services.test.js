import http from './http-common';
import todoDataService from './todos.services';


jest.mock('./http-common');

describe('TodoDataService', () => {
    it('should fetch all todos', async () => {
        const todos = [{ id: 1, title: 'Test Todo' }];
        http.get.mockResolvedValue({ data: todos });

        const result = await todoDataService.getAll();
        expect(result.data).toEqual(todos);
    });

    it('should fetch a todo by id', async () => {
        const todo = { id: 1, title: 'Test Todo' };
        http.get.mockResolvedValue({ data: todo });

        const result = await todoDataService.get(1);
        expect(result.data).toEqual(todo);
    });

    it('should create a new todo', async () => {
        const newTodo = { title: 'New Todo' };
        const createdTodo = { id: 1, ...newTodo };
        http.post.mockResolvedValue({ data: createdTodo });

        const result = await todoDataService.create(newTodo);
        expect(result.data).toEqual(createdTodo);
    });

    it('should update a todo by id', async () => {
        const updatedTodo = { id: 1, title: 'Updated Todo' };
        http.put.mockResolvedValue({ data: updatedTodo });

        const result = await todoDataService.update(1, updatedTodo);
        expect(result.data).toEqual(updatedTodo);
    });

    it('should delete a todo by id', async () => {
        http.delete.mockResolvedValue({ data: {} });

        const result = await todoDataService.delete(1);
        expect(result.data).toEqual({});
    });

    it('should delete all todos', async () => {
        http.delete.mockResolvedValue({ data: {} });

        const result = await todoDataService.deleteAll();
        expect(result.data).toEqual({});
    });

});
