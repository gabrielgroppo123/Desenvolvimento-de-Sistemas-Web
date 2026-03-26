import * as service from '../service/emprestimoService.js';
import { Router } from "express";

const endpoints = Router();

endpoints.get('/emprestimos', async (req, resp) => {
    let status = req.query.status;

    try{
        let linhas = await service.listarEmprestimos();
        resp.send(linhas);
    }
    catch(err){
        resp.status(404).send({ erro: err.message })
    }
  
})

endpoints.post('/emprestimos', async (req, resp) => {
  try{
    let emprestimo = req.body;
    let id = await service.registraRetirada(emprestimo);

  resp.send({ id });
  }

  catch(err){
    resp.status(404).send({ erro: err.message })
  }
})

endpoints.get('/emprestimos/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let linha = await service.buscarEmprestimoPorId(id);

  if (!linha) {
    resp.status(404).send({ erro: 'Emprestimo não encontrado' })
  }
  else {
    resp.send(linha);
  }
})

endpoints.put('/emprestimos/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let emprestimo = req.body;

  let linhasAfetadas = await service.registraDevolucao(id, emprestimo);

  if (linhasAfetadas == 0) {
    resp.status(404).send({ erro: 'Emprestimo não encontrado' })
  }
  else {
    resp.send();
  }
})

endpoints.delete('/emprestimos/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linhasAfetadas = await service.deletarEmprestimo(id);

  if (linhasAfetadas == 0) {
    resp.status(404).send({ erro: 'Emprestimo não encontrado' })
  }
  else {
    resp.send({ linhasAfetadas });
  }
})
export default endpoints;
