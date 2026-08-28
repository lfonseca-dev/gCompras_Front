import api from "../../../api/api.js";

const fornecedorService = {
    async getAll() {
        const response = await api.get("/cadastro/fornecedor");
        return response.data.data;
    },
};

export default fornecedorService;