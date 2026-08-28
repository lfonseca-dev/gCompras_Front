import { useState } from "react";

import { useCompra } from "../hooks/hook.js";

export default function Compra() {
    const {
        compras,
        fornecedores,
        statusCompras,
        loading,
        createCompra,
        updateCompra,
        deleteCompra,
    } = useCompra();

    const [modal, setModal] = useState(null);
    const [compraSelecionada, setCompraSelecionada] = useState(null);

    const [form, setForm] = useState({
        numero: "",
        descricao: "",
        data: "",
        valor: "",
        observacao: "",
        fornecedor_id: "",
        status_compra_id: "",
    });

    const [salvando, setSalvando] = useState(false);
    const [erroForm, setErroForm] = useState("");

    // =========================
    // ADICIONAR
    // =========================

    const abrirModalAdicionar = () => {
        setForm({
            numero: "",
            descricao: "",
            data: "",
            valor: "",
            observacao: "",
            fornecedor_id: "",
            status_compra_id: "",
        });

        setErroForm("");
        setModal("adicionar");
    };

    // =========================
    // EDITAR
    // =========================

    const abrirModalEditar = (compra) => {
        setCompraSelecionada(compra);

        setForm({
            numero: compra.numero ?? "",
            descricao: compra.descricao ?? "",

            data: compra.data
                ? compra.data.substring(0, 10)
                : "",

            valor:
                compra.valor !== null &&
                compra.valor !== undefined
                    ? Number(compra.valor)
                    : "",

            observacao: compra.observacao ?? "",

            fornecedor_id:
                compra.fornecedor_id ?? "",

            status_compra_id:
                compra.status_compra_id ?? "",
        });

        setErroForm("");
        setModal("editar");
    };

    // =========================
    // EXCLUIR
    // =========================

    const abrirModalExcluir = (compra) => {
        setCompraSelecionada(compra);
        setErroForm("");
        setModal("excluir");
    };

    // =========================
    // FECHAR MODAL
    // =========================

    const fecharModal = () => {
        if (salvando) return;

        setModal(null);
        setCompraSelecionada(null);
        setErroForm("");
    };

    // =========================
    // CHANGE
    // =========================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.numero.trim()) {
            setErroForm(
                "O número da compra é obrigatório."
            );
            return;
        }

        if (!form.descricao.trim()) {
            setErroForm(
                "A descrição é obrigatória."
            );
            return;
        }

        if (!form.data) {
            setErroForm(
                "A data da compra é obrigatória."
            );
            return;
        }

        if (!form.valor) {
            setErroForm(
                "O valor da compra é obrigatório."
            );
            return;
        }

        if (!form.fornecedor_id) {
            setErroForm(
                "Selecione um fornecedor."
            );
            return;
        }

        if (!form.status_compra_id) {
            setErroForm(
                "Selecione o status da compra."
            );
            return;
        }

        try {
            setSalvando(true);
            setErroForm("");

            // ==========================================
            // ATENÇÃO:
            // usuario_id e empresa_id NÃO SÃO ENVIADOS.
            // O BACKEND PEGA OS DOIS DO TOKEN.
            // ==========================================

            const dados = {
                numero: form.numero.trim(),

                descricao: form.descricao.trim(),

                data: form.data,

                valor: Number(form.valor),

                observacao: form.observacao.trim(),

                fornecedor_id:
                    Number(form.fornecedor_id),

                status_compra_id:
                    Number(form.status_compra_id),
            };

            console.log(
                "PAYLOAD ENVIADO:",
                dados
            );

            if (modal === "adicionar") {
                await createCompra(dados);
            }

            if (modal === "editar") {
                await updateCompra(
                    compraSelecionada.id,
                    dados
                );
            }

            fecharModal();

        } catch (error) {
            console.error(error);

            setErroForm(
                error?.response?.data?.message ||
                "Não foi possível salvar a compra."
            );
        } finally {
            setSalvando(false);
        }
    };

    // =========================
    // DELETE
    // =========================

    const handleExcluir = async () => {
        try {
            setSalvando(true);
            setErroForm("");

            await deleteCompra(
                compraSelecionada.id
            );

            fecharModal();

        } catch (error) {
            console.error(error);

            setErroForm(
                error?.response?.data?.message ||
                "Não foi possível excluir a compra."
            );
        } finally {
            setSalvando(false);
        }
    };

    // =========================
    // FORMATAR VALOR
    // =========================

    const formatarValor = (valor) => {
        return Number(
            valor || 0
        ).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );
    };

    // =========================
    // FORMATAR DATA
    // =========================

    const formatarData = (data) => {
        if (!data) return "-";

        const dataSemHora =
            data.split("T")[0];

        const [
            ano,
            mes,
            dia
        ] = dataSemHora.split("-");

        return `${dia}/${mes}/${ano}`;
    };

    // =========================
    // BUSCAR FORNECEDOR
    // =========================

    const getFornecedor = (id) => {
        const fornecedor =
            fornecedores.find(
                (item) =>
                    item.id === Number(id)
            );

        return (
            fornecedor?.razao_social ||
            `Fornecedor #${id}`
        );
    };

    // =========================
    // BUSCAR STATUS
    // =========================

    const getStatus = (id) => {
        const status =
            statusCompras.find(
                (item) =>
                    Number(item.id) ===
                    Number(id)
            );

        return (
            status?.descricao ||
            `Status #${id}`
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-7xl">

                {/* =========================
                    CABEÇALHO
                ========================== */}

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Compras
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Gerencie as compras realizadas pela empresa.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={
                            abrirModalAdicionar
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                    >
                        + Nova compra
                    </button>

                </div>

                {/* =========================
                    TABELA
                ========================== */}

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                    {loading ? (

                        <div className="flex flex-col items-center justify-center px-6 py-16">

                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                            <p className="mt-4 text-sm text-gray-500">
                                Carregando compras...
                            </p>

                        </div>

                    ) : compras.length === 0 ? (

                        <div className="flex flex-col items-center justify-center px-6 py-16">

                            <h2 className="text-base font-semibold text-gray-900">
                                Nenhuma compra cadastrada
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Cadastre uma nova compra para começar.
                            </p>

                            <button
                                type="button"
                                onClick={
                                    abrirModalAdicionar
                                }
                                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                + Nova compra
                            </button>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full text-left text-sm">

                                <thead className="border-b border-gray-200 bg-gray-50">

                                    <tr>

                                        <th className="px-6 py-4 font-semibold text-gray-600">
                                            Número
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-600">
                                            Descrição
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-600">
                                            Fornecedor
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-600">
                                            Data
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-600">
                                            Valor
                                        </th>

                                        <th className="px-6 py-4 font-semibold text-gray-600">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right font-semibold text-gray-600">
                                            Ações
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {compras.map(
                                        (compra) => (

                                            <tr
                                                key={
                                                    compra.id
                                                }
                                                className="transition hover:bg-gray-50"
                                            >

                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {
                                                        compra.numero
                                                    }
                                                </td>

                                                <td className="px-6 py-4 text-gray-700">
                                                    {
                                                        compra.descricao
                                                    }
                                                </td>

                                                <td className="px-6 py-4 text-gray-700">
                                                    {getFornecedor(
                                                        compra.fornecedor_id
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {formatarData(
                                                        compra.data
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {formatarValor(
                                                        compra.valor
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                                        {getStatus(
                                                            compra.status_compra_id
                                                        )}
                                                    </span>

                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                abrirModalEditar(
                                                                    compra
                                                                )
                                                            }
                                                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                abrirModalExcluir(
                                                                    compra
                                                                )
                                                            }
                                                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                                                        >
                                                            Excluir
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

                {!loading &&
                    compras.length > 0 && (

                        <p className="mt-3 text-sm text-gray-500">

                            {compras.length}{" "}

                            {compras.length === 1
                                ? "compra cadastrada"
                                : "compras cadastradas"}

                        </p>
                    )}

            </div>

            {/* =====================================================
                MODAL ADICIONAR / EDITAR
            ====================================================== */}

            {(modal === "adicionar" ||
                modal === "editar") && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(e) => {

                        if (
                            e.target ===
                            e.currentTarget
                        ) {
                            fecharModal();
                        }

                    }}
                >

                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">

                        {/* HEADER */}

                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">

                                    {modal === "adicionar"
                                        ? "Nova compra"
                                        : "Editar compra"}

                                </h2>

                                <p className="mt-1 text-sm text-gray-500">

                                    {modal === "adicionar"
                                        ? "Preencha os dados da compra."
                                        : "Altere os dados da compra."}

                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={
                                    fecharModal
                                }
                                className="text-xl text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>

                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">

                                {/* NÚMERO */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Número
                                    </label>

                                    <input
                                        type="text"
                                        name="numero"
                                        value={
                                            form.numero
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="FL-00001"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                </div>

                                {/* DATA */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Data
                                    </label>

                                    <input
                                        type="date"
                                        name="data"
                                        value={
                                            form.data
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                </div>

                                {/* DESCRIÇÃO */}

                                <div className="sm:col-span-2">

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Descrição
                                    </label>

                                    <input
                                        type="text"
                                        name="descricao"
                                        value={
                                            form.descricao
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Ex: Pregos"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                </div>

                                {/* VALOR */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Valor
                                    </label>

                                    <input
                                        type="number"
                                        name="valor"
                                        value={
                                            form.valor
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                </div>

                                {/* FORNECEDOR */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Fornecedor
                                    </label>

                                    <select
                                        name="fornecedor_id"
                                        value={
                                            form.fornecedor_id
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    >

                                        <option value="">
                                            Selecione um fornecedor
                                        </option>

                                        {fornecedores.map(
                                            (fornecedor) => (

                                                <option
                                                    key={
                                                        fornecedor.id
                                                    }
                                                    value={
                                                        fornecedor.id
                                                    }
                                                >
                                                    {
                                                        fornecedor.codigo
                                                    }{" "}
                                                    -{" "}
                                                    {
                                                        fornecedor.razao_social
                                                    }
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                {/* STATUS */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Status
                                    </label>

                                    <select
                                        name="status_compra_id"
                                        value={
                                            form.status_compra_id
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    >

                                        <option value="">
                                            Selecione um status
                                        </option>

                                        {statusCompras.map(
                                            (status) => (

                                                <option
                                                    key={
                                                        status.id
                                                    }
                                                    value={
                                                        status.id
                                                    }
                                                >
                                                    {
                                                        status.codigo
                                                    }{" "}
                                                    -{" "}
                                                    {
                                                        status.descricao
                                                    }
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                {/* OBSERVAÇÃO */}

                                <div className="sm:col-span-2">

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Observação
                                    </label>

                                    <textarea
                                        name="observacao"
                                        value={
                                            form.observacao
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        rows="3"
                                        placeholder="Observações sobre a compra..."
                                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                </div>

                                {/* ERRO */}

                                {erroForm && (

                                    <div className="sm:col-span-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                        {
                                            erroForm
                                        }
                                    </div>

                                )}

                            </div>

                            {/* FOOTER */}

                            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

                                <button
                                    type="button"
                                    onClick={
                                        fecharModal
                                    }
                                    disabled={
                                        salvando
                                    }
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        salvando
                                    }
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
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

            {modal === "excluir" &&
                compraSelecionada && (

                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onMouseDown={(e) => {

                            if (
                                e.target ===
                                e.currentTarget
                            ) {
                                fecharModal();
                            }

                        }}
                    >

                        <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                            <div className="px-6 py-6">

                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">

                                    <span className="text-xl font-bold text-red-600">
                                        !
                                    </span>

                                </div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Excluir compra?
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-500">

                                    Tem certeza que deseja excluir a compra{" "}

                                    <strong className="text-gray-700">
                                        {
                                            compraSelecionada.numero
                                        }
                                    </strong>

                                    ?

                                </p>

                                <p className="mt-2 text-sm text-red-500">
                                    Essa ação não poderá ser desfeita.
                                </p>

                                {erroForm && (

                                    <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                        {
                                            erroForm
                                        }
                                    </div>

                                )}

                            </div>

                            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

                                <button
                                    type="button"
                                    onClick={
                                        fecharModal
                                    }
                                    disabled={
                                        salvando
                                    }
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleExcluir
                                    }
                                    disabled={
                                        salvando
                                    }
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                                >

                                    {salvando
                                        ? "Excluindo..."
                                        : "Sim, excluir"}

                                </button>

                            </div>

                        </div>

                    </div>

                )}

        </div>
    );
}