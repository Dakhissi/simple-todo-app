import http from "./http-common";

class CategoryService {
    getAll() {
        return http.get("/api/categories/");
    }

    get(id) {
        return http.get(`/api/categories/${id}/`);
    }

    create(data) {
        return http.post("/api/categories/", data);
    }

    update(id, data) {
        return http.put(`/api/categories/${id}/`, data);
    }

    delete(id) {
        return http.delete(`/api/categories/${id}/`);
    }
}

const categoryService = new CategoryService();
export default categoryService;