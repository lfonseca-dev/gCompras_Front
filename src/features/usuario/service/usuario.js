import api from '../../../api/api.js';

const usuarioService = {
    async login(data) {
        const response = await api.post('/rbac/auth/login', data)
        return response.data
    },
    async criar(data) {
        const response = await api.post('/rbac/usuario', data)
        return response.data    
    }
}

export default usuarioService

