import * as repo from '../repository/clienteRepository.js'

export async function adicionarCliente(cliente) {

  let cpf = await repo.buscarClientePorCpf(cliente.cpf);
  let email = await repo.buscarClientePorEmail(cliente.email)
  if(cpf){
    throw new Error ("CPF ja cadastrado no sistema")
  }
  if(email){
    throw new Error ("Email ja cadastrado no sistema")
  }
  let id = await repo.adicionarCliente(cliente);
  return id;
}

export async function listarClientes() {
  return await repo.listarClientes();
}

export async function buscarClientePorId(id) {
  return await repo.buscarClientePorId(id);
}

export async function alterarCliente(id, cliente) {
  return await repo.alterarCliente(id, cliente);
}

export async function deletarCliente(id) {
  return await repo.deletarCliente(id);
}
