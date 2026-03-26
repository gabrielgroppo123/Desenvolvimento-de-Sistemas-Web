import connection from "./connection.js";

export async function registraRetirada(obra) {
  const comando = `
    INSERT INTO emprestimo
      (cliente_id, obra_id, dataRetirada, dataPrevista, dataDevolucao, diasAtraso, status, observacao, cadastro)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW());
  `

  const [resposta] = await connection.query(comando, [
    emprestimo.cliente_id,
    emprestimo.obra_id,
    emprestimo.dataRetirada,
    emprestimo.dataPrevista,
    emprestimo.dataDevolucao,
    emprestimo.diasAtraso,
    emprestimo.status,
    emprestimo.observacao
  ]);

  return resposta.insertId;
}
export async function registraDevolucao(id, obra) {
    const comando = `
      UPDATE emprestimo
         SET dataDevolucao = ?,
         observacao = ?
       WHERE id = ?
    `;
  
    const [resposta] = await connection.query(comando, [
        emprestimo.dataDevolucao,
        emprestimo.observacao,
        id
    ]);
  
    return resposta.affectedRows;
  }
export async function listarEmprestimos(status) {
  const comando = `
    select
	emprestimo.id,
    emprestimo.cliente_id,
    emprestimo.obra_id,
    emprestimo.dataRetirada,
    emprestimo.dataPrevista,
    emprestimo.dataDevolucao,
    emprestimo.diasAtraso,
    emprestimo.status,
    emprestimo.observacao,
    emprestimo.cadastro as cadastro_emprestimo,
    cliente.nome,
    cliente.cpf,
    cliente.email,
    cliente.telefone,
    cliente.bloqueadoAte,
    cliente.cadastro as cadastro_cliente,
    obra.titulo,
    obra.autor,
    obra.editora,
    obra.isbn,
    obra.anoPublicacao,
    obra.estoque,
    obra.ativo,
    obra.cadastro as cadastro_obra
    from emprestimo join cliente on emprestimo.cliente_id = cliente.id
    join obra on emprestimo.obra_id = obra.id
    where emprestimo.status like?
  `;

  const [linhas] = await connection.query(comando, [ '%' + (status??'') + '%' ]);
  return linhas;
}

export async function buscarEmprestimoPorId(id) {
  const comando = `
    SELECT *
    FROM emprestimo
    WHERE id = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}



export async function deletarEmprestimo(id) {
  const comando = `
    DELETE FROM emprestimo
    WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}
