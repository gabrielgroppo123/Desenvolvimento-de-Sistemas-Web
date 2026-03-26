import * as repo from '../repository/emprestimoRepository.js'
import * as obraRepository from "../repository/obraRepository.js"
import * as clienteRepository from "../repository/clienteRepository.js";

export async function registraRetirada(emprestimo) {
    let cliente = await clienteRepository.buscarClientePorId(emprestimo.cliente_id)
    let obra = await obraRepository.buscarObraPorId(emprestimo.obra_id);
    if (cliente.bloqueadoAte > new Date()){
        throw new Error("Cliente bloqueado")
    }
    if (obra.estoque <= 0){
        throw new Error ('Nenhum exemplar no estoque')
    }

  let id = await repo.registraRetirada(emprestimo);
  obra.estoque --;
  obraRepository.alterarObra(emprestimo.obra_id, obra)
  return id;
}

export async function listarEmprestimos(status) {
  return await repo.listarEmprestimos(status);
}

export async function buscarEmprestimoPorId(id) {
  return await repo.buscarEmprestimoPorId(id);
}

export async function registraDevolucao(id, dados) {
  let emprestimo = await repo.buscarEmprestimoPorId(id)
  if (!emprestimo) return 0;

  let atraso = 0;
  let status = 'devolvido';

  let hoje = new Date(dados.dataDevolucao);
  let prevista = new Date(emprestimo.dataPrevista);
  if (hoje > prevista){
    atraso = Math.ceil ((hoje - prevista) / (1000 * 60 * 60 * 24));
    status = "devolvido_com_atraso";
    let bloqueio = new Date();
    bloqueio.setDate(bloqueio.getDate() + 3);
    await clienteRepository.atualizarBloqueio(emprestimo.cliente_id, bloqueio);
  }
  await obraRepository.incrementarEstoque(emprestimo.obra_id, 1);
  return await repo.registraDevolucao(id, atraso, status, dados);
}

export async function deletarEmprestimo(id) {
  return await repo.deletarEmprestimo(id);
}
