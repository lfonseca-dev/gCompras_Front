import { useState } from "react";
import { useNivel } from "../hooks/hook.js";

export default function Nivel() {
    const {
        niveis,
        loading,
        error,
        fetchNiveis,
        criarNivel,
        editarNivel,
        excluirNivel,
    } = useNivel();

    const [modal, setModal] = useState(null);
    const [nivelSelecionado, setNivelSelecionado] = useState(null);

    const [form, setForm] = useState({
        codigo: "",
        descricao: "",
    });

    const [salvando, setSalvando] = useState(false);
    const [erroForm, setErroForm] = useState("");

    // =========================
    // MODAL ADICIONAR
    // =========================

    const abrirModalAdicionar = () => {
        setForm({
            codigo: "",
            descricao: "",
        });

        setErroForm("");
        setModal("adicionar");
    };

    // =========================
    // MODAL EDITAR
    // =========================

    const abrirModalEditar = (nivel) => {
        setNivelSelecionado(nivel);

        setForm({
            codigo: nivel.codigo,
            descricao: nivel.descricao,
        });

        setErroForm("");
        setModal("editar");
    };

    // =========================
    // MODAL EXCLUIR
    // =========================

    const abrirModalExcluir = (nivel) => {
        setNivelSelecionado(nivel);
        setModal("excluir");
    };

    // =========================
    // FECHAR MODAL
    // =========================

    const fecharModal = () => {
        if (salvando) return;

        setModal(null);
        setNivelSelecionado(null);
        setErroForm("");
    };

    // =========================
    // INPUT
    // =========================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // SALVAR
    // =========================

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.codigo.trim()) {
            setErroForm("O código é obrigatório.");
            return;
        }

        if (!form.descricao.trim()) {
            setErroForm("A descrição é obrigatória.");
            return;
        }

        try {
            setSalvando(true);
            setErroForm("");

            const dados = {
                codigo: form.codigo.trim().toUpperCase(),
                descricao: form.descricao.trim(),
            };

            if (modal === "adicionar") {
                await criarNivel(dados);
            }

            if (modal === "editar") {
                await editarNivel(nivelSelecionado.id, dados);
            }

            fecharModal();
        } catch (error) {
            console.error(error);

            setErroForm(
                error?.response?.data?.message ||
                "Não foi possível salvar o nível."
            );
        } finally {
            setSalvando(false);
        }
    };

    // =========================
    // EXCLUIR
    // =========================

    const handleExcluir = async () => {
        try {
            setSalvando(true);

            await excluirNivel(nivelSelecionado.id);

            fecharModal();
        } catch (error) {
            console.error(error);

            setErroForm(
                error?.response?.data?.message ||
                "Não foi possível excluir o nível."
            );
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-6xl">

                {/* CABEÇALHO */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Níveis de Acesso
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Gerencie os níveis de acesso do sistema.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={abrirModalAdicionar}
                        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                    >
                        + Novo nível
                    </button>
                </div>

                {/* TABELA */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                    {/* LOADING */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center px-6 py-16">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                            <p className="mt-4 text-sm text-gray-500">
                                Carregando níveis...
                            </p>
                        </div>
                    )}

                    {/* ERRO */}
                    {!loading && error && (
                        <div className="flex flex-col items-center justify-center px-6 py-16">
                            <p className="text-sm text-red-600">
                                Erro ao carregar os níveis.
                            </p>

                            <button
                                type="button"
                                onClick={fetchNiveis}
                                className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                            >
                                Tentar novamente
                            </button>
                        </div>
                    )}

                    {/* DADOS */}
                    {!loading && !error && (
                        <>
                            {niveis.length === 0 ? (
                                <div className="flex flex-col items-center justify-center px-6 py-16">
                                    <h2 className="text-base font-semibold text-gray-900">
                                        Nenhum nível cadastrado
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Cadastre um novo nível de acesso.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={abrirModalAdicionar}
                                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        + Novo nível
                                    </button>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">

                                        <thead className="border-b border-gray-200 bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold text-gray-600">
                                                    ID
                                                </th>

                                                <th className="px-6 py-4 font-semibold text-gray-600">
                                                    Código
                                                </th>

                                                <th className="px-6 py-4 font-semibold text-gray-600">
                                                    Descrição
                                                </th>

                                                <th className="px-6 py-4 text-right font-semibold text-gray-600">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {niveis.map((nivel) => (
                                                <tr
                                                    key={nivel.id}
                                                    className="transition hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 font-medium text-gray-900">
                                                        #{nivel.id}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                                            {nivel.codigo}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 text-gray-700">
                                                        {nivel.descricao}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-end gap-2">

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    abrirModalEditar(nivel)
                                                                }
                                                                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                                                            >
                                                                Editar
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    abrirModalExcluir(nivel)
                                                                }
                                                                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                                            >
                                                                Excluir
                                                            </button>

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* QUANTIDADE */}
                {!loading && !error && niveis.length > 0 && (
                    <p className="mt-3 text-sm text-gray-500">
                        {niveis.length}{" "}
                        {niveis.length === 1
                            ? "nível cadastrado"
                            : "níveis cadastrados"}
                    </p>
                )}
            </div>

            {/* =====================================================
                MODAL ADICIONAR / EDITAR
            ====================================================== */}

            {(modal === "adicionar" || modal === "editar") && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            fecharModal();
                        }
                    }}
                >
                    <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                        {/* HEADER */}
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {modal === "adicionar"
                                        ? "Novo nível de acesso"
                                        : "Editar nível de acesso"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {modal === "adicionar"
                                        ? "Preencha os dados do novo nível."
                                        : "Altere os dados do nível."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={fecharModal}
                                className="text-xl text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit}>

                            <div className="space-y-4 px-6 py-5">

                                {/* CÓDIGO */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Código
                                    </label>

                                    <input
                                        type="text"
                                        name="codigo"
                                        value={form.codigo}
                                        onChange={handleChange}
                                        placeholder="Ex: ADMIN"
                                        maxLength={50}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                    <p className="mt-1 text-xs text-gray-400">
                                        Entre 3 e 50 caracteres.
                                    </p>
                                </div>

                                {/* DESCRIÇÃO */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Descrição
                                    </label>

                                    <input
                                        type="text"
                                        name="descricao"
                                        value={form.descricao}
                                        onChange={handleChange}
                                        placeholder="Ex: Administrador"
                                        maxLength={50}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                    <p className="mt-1 text-xs text-gray-400">
                                        Entre 3 e 50 caracteres.
                                    </p>
                                </div>

                                {/* ERRO */}
                                {erroForm && (
                                    <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                        {erroForm}
                                    </div>
                                )}
                            </div>

                            {/* FOOTER */}
                            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

                                <button
                                    type="button"
                                    onClick={fecharModal}
                                    disabled={salvando}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    disabled={salvando}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {salvando
                                        ? "Salvando..."
                                        : modal === "adicionar"
                                            ? "Cadastrar"
                                            : "Salvar alterações"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* =====================================================
                MODAL EXCLUIR
            ====================================================== */}

            {modal === "excluir" && nivelSelecionado && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            fecharModal();
                        }
                    }}
                >
                    <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                        <div className="px-6 py-6">

                            {/* ÍCONE */}
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                <span className="text-xl font-bold text-red-600">
                                    !
                                </span>
                            </div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Excluir nível de acesso?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Tem certeza que deseja excluir o nível{" "}
                                <strong className="text-gray-700">
                                    {nivelSelecionado.descricao}
                                </strong>
                                ?
                            </p>

                            <p className="mt-2 text-sm text-red-500">
                                Essa ação não poderá ser desfeita.
                            </p>

                            {/* ERRO */}
                            {erroForm && (
                                <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {erroForm}
                                </div>
                            )}

                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

                            <button
                                type="button"
                                onClick={fecharModal}
                                disabled={salvando}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleExcluir}
                                disabled={salvando}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {salvando ? "Excluindo..." : "Sim, excluir"}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}