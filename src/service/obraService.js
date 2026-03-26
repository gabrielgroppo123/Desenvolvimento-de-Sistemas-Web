import * as repo from '../repository/obraRepository.js'

export async function adicionarObras(obras) {

  if (!Array.isArray(obras) || obras.length === 0) {
    throw new Error("Lista de obras inválida");
  }

  let ids = [];

  for (let obra of obras) {
    if (obra.estoque < 0) {
      throw new Error(`Estoque não pode ser negativo`);
    }
    let isbnExiste = await repo.buscarObraPorIsbn(obra.isbn);
    if (isbnExiste) {
      throw new Error(`ISBN ja cadastrado`);
    }

    let id = await repo.adicionarObra(obra);
    ids.push(id);
  }

  return ids;
}

export async function listarObras() {
  return await repo.listarObras();
}

export async function buscarObraPorId(id) {
  return await repo.buscarObraPorId(id);
}

export async function alterarObra(id, obra) {
  return await repo.alterarObra(id, obra);
}

export async function deletarObra(id) {
  return await repo.deletarObra(id);
}
