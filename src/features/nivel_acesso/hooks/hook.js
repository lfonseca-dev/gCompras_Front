import { useState, useEffect, useCallback } from "react";
import nivelService from "../service/service.js";

export function useNivel() {
    const [niveis, setNiveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNiveis = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await nivelService.getAll();

            setNiveis(data);
        } catch (error) {
            console.error("Erro ao buscar níveis:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const criarNivel = async (dados) => {
        try {
            const response = await nivelService.post(dados);

            await fetchNiveis();

            return response;
        } catch (error) {
            console.error("Erro ao criar nível:", error);
            throw error;
        }
    };

    const editarNivel = async (id, dados) => {
        try {
            const response = await nivelService.update(id, dados);

            await fetchNiveis();

            return response;
        } catch (error) {
            console.error("Erro ao editar nível:", error);
            throw error;
        }
    };

    const excluirNivel = async (id) => {
        try {
            const response = await nivelService.delete(id);

            await fetchNiveis();

            return response;
        } catch (error) {
            console.error("Erro ao excluir nível:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchNiveis();
    }, [fetchNiveis]);

    return {
        niveis,
        loading,
        error,
        fetchNiveis,
        criarNivel,
        editarNivel,
        excluirNivel
    };
}