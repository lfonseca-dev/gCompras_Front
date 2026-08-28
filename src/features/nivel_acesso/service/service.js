import api from "../../../api/api.js";

const nivelService = {
    async post(dados) {
        const response = await api.post('/rbac/nivelacesso', dados);
        return response.data;
    },

    async getAll(data) {
        const response = await api.get('/rbac/nivelacesso');
        return response.data.data;
    },

    async getById(id) {
        const response = await api.get(`/rbac/nivelacesso/${id}`);
        return response.data;
    },

    async put(id, dados) {
        const response = await api.put(`/rbac/nivelacesso/${id}`, dados);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/rbac/nivelacesso/${id}`);
        return response.data;
    }
};

export default nivelService;