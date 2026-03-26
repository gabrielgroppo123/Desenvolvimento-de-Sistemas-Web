import * as service from '../service/obraService.js';
import { Router } from "express";

const endpoints = Router();

endpoints.get('/obras', async (req, resp) => {
  let linhas = await service.listarObras();
  resp.send(linhas);
})

endpoints.post('/obras', async (req, resp) => {
  let obra = req.body;
  let id = await service.adicionarObra(obra);

  resp.send({ id });
})

endpoints.get('/obras/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let linha = await service.buscarObraPorId(id);

  if (!linha) {
    resp.status(404).send({ erro: 'Obra não encontrada' })
  }
  else {
    resp.send(linha);
  }
})

endpoints.put('/obras/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let obra = req.body;

  let linhasAfetadas = await service.alterarObra(id, obra);

  if (linhasAfetadas == 0) {
    resp.status(404).send({ erro: 'Obra não encontrada' })
  }
  else {
    resp.send();
  }
})

endpoints.delete('/obras/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linhasAfetadas = await service.deletarObra(id);

  if (linhasAfetadas == 0) {
    resp.status(404).send({ erro: 'Obra não encontrada' })
  }
  else {
    resp.send({ linhasAfetadas });
  }
})
export default endpoints;
