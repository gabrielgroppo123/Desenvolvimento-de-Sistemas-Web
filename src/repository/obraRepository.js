import connection from "./connection.js";

export async function adicionarObra(obra) {
  const comando = `
    INSERT INTO obra
      (titulo, autor, editora, isbn, anoPublicacao, estoque, ativo, cadastro)
    VALUES (?, ?, ?, ?, ?, ?, TRUE, NOW());
  `

  const [resposta] = await connection.query(comando, [
    obra.titulo,
    obra.autor,
    obra.editora,
    obra.isbn,
    obra.anoPublicacao,
    obra.estoque
  ]);
  return resposta.insertId;
}
export async function buscarObraPorIsbn(email) {
  const comando = `
    SELECT *
    FROM cliente
    WHERE email = ?
  `;

  const [linhas] = await connection.query(comando, [email]);
  return linhas;
}

export async function alterarObra(id, obra) {
    const comando = `
      UPDATE obra
         SET titulo = ?,
             autor = ?,
             editora = ?,
             isbn = ?,
             anoPublicacao = ?,
             estoque = ?,
             ativo = ?
       WHERE id = ?
    `;
  
    const [resposta] = await connection.query(comando, [
        obra.titulo,
        obra.autor,
        obra.editora,
        obra.isbn,
        obra.anoPublicacao,
        obra.estoque,
        obra.ativo,
        id
    ]);
  
    return resposta.affectedRows;
  }
export async function listarObras() {
  const comando = `
    SELECT *
    FROM obra
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarObraPorId(id) {
  const comando = `
    SELECT *
    FROM obra
    WHERE id = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}



export async function deletarObra(id) {
  const comando = `
    DELETE FROM obra
    WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}


