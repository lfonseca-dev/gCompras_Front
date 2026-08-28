import api from "../../../api/api.js";

const compraService = {
    async post(dados) {
        const response = await api.post('/compra/compras', dados);
        return response.data;
    },

    async getAll(data) {
        const response = await api.get('/compra/compras');
        return response.data.data;
    },

    async getById(id) {
        const response = await api.get(`/compra/compras/${id}`);
        return response.data;
    },

    async put(id, dados) {
        const response = await api.put(`/compra/compras/${id}`, dados);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/compra/compras/${id}`);
        return response.data;
    }
};

export default compraService;