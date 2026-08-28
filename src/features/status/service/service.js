import api from "../../../api/api.js";

const statusCompraService = {
    async getAll() {
        const response = await api.get("/compra/status");
        return response.data.data;
    },
};

export default statusCompraService;