import Parse from "/src/../parseConfig";

export const getProdutos = async () => {
  const Produto = Parse.Object.extend("Produto");
  const query = new Parse.Query(Produto);
  try {
    const results = await query.find();
    return results.map((p) => ({
      id: p.id || "",
      nome: p.get("nome"), // mapear corretamente
      descricao: p.get("descricao"),
      preco: p.get("preco"),
      categoria: p.get("categoria"),
      observacao: "",
      quantidade: 0, // já inicializa a quantidade
    }));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
};

import { apiRespo } from "/src/app/(pages)/pedido/page";

export const postPedido = async (
  usuarioId: number,
  clienteId: number,
  data: apiRespo
) => {
  const Pedido = Parse.Object.extend("Pedido");
  const pedido = new Pedido();

  try {
    const Cliente = Parse.Object.extend("Cliente");
    const cliPointer = new Cliente();
    cliPointer.id = clienteId;

    const Usuario = Parse.Object.extend("usuario");
    const usuPointer = new Usuario();
    usuPointer.id = usuarioId;

    pedido.set("cliente", cliPointer); // ✅ Pointer para Cliente
    pedido.set("usuario", usuPointer);
    pedido.set("endereco", data.endereco);
    pedido.set("status", "em andamento");
    pedido.set("entrega", data.endereco ? true : false);
    pedido.set(
      "metodo_pagamento",
      data.pagamentoMeth ? data.pagamentoMeth : ""
    );
    pedido.set(
      "produtos",
      data.produtos.map((p) => ({
        id: p.id,
        quantidade: p.quantidade,
        observacao: p.observacao ?? "",
      }))
    );
    const result = await pedido.save();
    console.log("Pedido criado com sucesso:", result.id);
    return result;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw error;
  }
};
