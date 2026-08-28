import { useState, useEffect } from "react";

import { useAuth } from "../../../context/AuthContext.jsx";

import compraService from "../service/service.js";

import fornecedorService from "../../fornecedor/service/service.js";
import statusCompraService from "../../status/service/service.js";

export function useCompra() {
    const { user } = useAuth();

    const [compras, setCompras] = useState([]);

    const [fornecedores, setFornecedores] = useState([]);
    const [statusCompras, setStatusCompras] = useState([]);

    const [loading, setLoading] = useState(true);

    // =========================
    // BUSCAR COMPRAS
    // =========================

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

    // =========================
    // BUSCAR DADOS DOS SELECTS
    // =========================

    const fetchDadosSelects = async () => {
        try {
            const fornecedoresData = await fornecedorService.getAll();

            setFornecedores(fornecedoresData);
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
        }

        try {
            const statusData = await statusCompraService.getAll();

            setStatusCompras(statusData);
        } catch (error) {
            console.error("Erro ao buscar status das compras:", error);
        }
    };

    // =========================
    // CRIAR COMPRA
    // =========================

    const createCompra = async (dados) => {
        try {
            setLoading(true);

            const dadosCompra = {
                ...dados,

                // Usuário logado
                usuario_id: Number(user.id),

                // Empresa do usuário logado
                empresa_id: Number(user.empresa.id),
            };

            const data = await compraService.post(dadosCompra);

            await fetchCompras();

            return data;
        } catch (error) {
            console.error("Erro ao criar compra:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // ATUALIZAR COMPRA
    // =========================

    const updateCompra = async (id, dados) => {
        try {
            setLoading(true);

            const dadosCompra = {
                ...dados,

                usuario_id: Number(user.id),
                empresa_id: Number(user.empresa.id),
            };

            const data = await compraService.put(id, dadosCompra);

            await fetchCompras();

            return data;
        } catch (error) {
            console.error("Erro ao atualizar compra:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // EXCLUIR COMPRA
    // =========================

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

    // =========================
    // EFFECT
    // =========================

    useEffect(() => {
        if (!user) return;

        fetchCompras();
        fetchDadosSelects();
    }, [user]);

    return {
        compras,

        fornecedores,
        statusCompras,

        loading,

        fetchCompras,
        createCompra,
        updateCompra,
        deleteCompra,
    };
}