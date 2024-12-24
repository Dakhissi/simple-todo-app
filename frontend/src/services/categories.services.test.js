import http from './http-common';
import categoryService from './categories.services';
jest.mock('./http-common');

describe('CategoryService', () => {
    it('should fetch all categories', async () => {
        http.get.mockResolvedValue({ data: 'categories' });
        const response = await categoryService.getAll();
        expect(response.data).toBe('categories');
        expect(http.get).toHaveBeenCalledWith('/api/categories/');
    });

    it('should fetch a category by id', async () => {
        const id = 1;
        http.get.mockResolvedValue({ data: 'category' });
        const response = await categoryService.get(id);
        expect(response.data).toBe('category');
        expect(http.get).toHaveBeenCalledWith(`/api/categories/${id}/`);
    });

    it('should create a new category', async () => {
        const data = { name: 'new category' };
        http.post.mockResolvedValue({ data: 'created category' });
        const response = await categoryService.create(data);
        expect(response.data).toBe('created category');
        expect(http.post).toHaveBeenCalledWith('/api/categories/', data);
    });

    it('should update a category by id', async () => {
        const id = 1;
        const data = { name: 'updated category' };
        http.put.mockResolvedValue({ data: 'updated category' });
        const response = await categoryService.update(id, data);
        expect(response.data).toBe('updated category');
        expect(http.put).toHaveBeenCalledWith(`/api/categories/${id}/`, data);
    });

    it('should delete a category by id', async () => {
        const id = 1;
        http.delete.mockResolvedValue({ data: 'deleted category' });
        const response = await categoryService.delete(id);
        expect(response.data).toBe('deleted category');
        expect(http.delete).toHaveBeenCalledWith(`/api/categories/${id}/`);
    });
});
