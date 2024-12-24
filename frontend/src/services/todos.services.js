import http from "./http-common";

class TodoDataService {
    getAll() {
        return http.get("/api/todos/");
    }

    get(id) {
        return http.get(`/api/todos/${id}/`);
    }

    create(data) {
        return http.post("/api/todos/", data);
    }

    update(id, data) {
        return http.put(`/api/todos/${id}/`, data);
    }

    delete(id) {
        return http.delete(`/api/todos/${id}/`);
    }

    deleteAll() {
        return http.delete(`/api/todos/`);
    }

    findByTitle(title) {
        return http.get(`/api/todos?title=${title}`);
    }
}

const todoDataService = new TodoDataService();
export default todoDataService;