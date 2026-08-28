import { useState, useEffect } from "react";

import compraService from "../service/service.js";

import empresaService from "../../empresa/service/service.js";
import fornecedorService from "../../fornecedor/service/service.js";
import usuarioService from "../../usuario/service/usuario.js";
import statusCompraService from "../../status/service/service.js";

export function useCompra() {
    const [compras, setCompras] = useState([]);

    const [empresas, setEmpresas] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [statusCompras, setStatusCompras] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchCompras = async () => {
        try {
            setLoading(true);

            const data = await compraService.getAll();

            setCompras(data);
        } catch (error) {
            console.error("Erro ao buscar compras:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDadosSelects = async () => {
    try {
        const fornecedoresData = await fornecedorService.getAll();
        console.log("FORNECEDORES:", fornecedoresData);
        setFornecedores(fornecedoresData);
    } catch (error) {
        console.error("ERRO FORNECEDOR:", error);
    }

    try {
        const statusData = await statusCompraService.getAll();
        console.log("STATUS:", statusData);
        setStatusCompras(statusData);
    } catch (error) {
        console.error("ERRO STATUS:", error);
    }
};

    const createCompra = async (dados) => {
        try {
            setLoading(true);

            const data = await compraService.post(dados);

            await fetchCompras();

            return data;
        } catch (error) {
            console.error("Erro ao criar compra:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateCompra = async (id, dados) => {
        try {
            setLoading(true);

            const data = await compraService.put(id, dados);

            await fetchCompras();

            return data;
        } catch (error) {
            console.error("Erro ao atualizar compra:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteCompra = async (id) => {
        try {
            setLoading(true);

            const data = await compraService.delete(id);

            await fetchCompras();

            return data;
        } catch (error) {
            console.error("Erro ao excluir compra:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompras();
        fetchDadosSelects();
    }, []);

    return {
        compras,
        empresas,
        fornecedores,
        usuarios,
        statusCompras,

        loading,

        fetchCompras,
        createCompra,
        updateCompra,
        deleteCompra,
    };
}