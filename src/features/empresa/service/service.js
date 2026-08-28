import api from "../../../api/api.js";

const empresaService = {
    async getAll() {
        const response = await api.get("/cadastro/empresa");
        return response.data.data;
    },
};

export default empresaService;