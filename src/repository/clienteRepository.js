import connection from "./connection.js";

export async function adicionarCliente(cliente) {
  const comando = `
    INSERT INTO cliente
      (nome, cpf, email, telefone, bloqueadoAte, cadastro)
    VALUES (?, ?, ?, ?, ?, NOW());
  `

  const [resposta] = await connection.query(comando, [
    cliente.nome,
    cliente.cpf,
    cliente.email,
    cliente.telefone,
    cliente.bloqueadoAte
  ]);

  return resposta.insertId;
}

export async function buscarClientePorCpf(cpf) {
  const comando = `
    SELECT *
    FROM cliente
    WHERE cpf = ?
  `;

  const [linhas] = await connection.query(comando, [cpf]);
  return linhas;
}

export async function buscarClientePorEmail(email) {
  const comando = `
    SELECT *
    FROM cliente
    WHERE email = ?
  `;

  const [linhas] = await connection.query(comando, [email]);
  return linhas;
}
export async function alterarCliente(id, cliente) {
    const comando = `
      UPDATE cliente
         SET nome = ?,
             cpf = ?,
             email = ?,
             telefone = ?,
             bloqueadoAte = ?
       WHERE id = ?
    `;
  
    const [resposta] = await connection.query(comando, [
      cliente.nome,
      cliente.cpf,
      cliente.email,
      cliente.telefone,
      cliente.bloqueadoAte,
      id
    ]);
  
    return resposta.affectedRows;
  }
export async function listarClientes() {
  const comando = `
    SELECT *
    FROM cliente
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarClientePorNome(nome){
  const comando = `
    SELECT *
    FROM cliente
    WHERE nome like ?
  `;
  const [linhas] = await connection.query(comando, [ '%' + (nome??'') + '%' ]);
  return linhas;
}

export async function buscarClientePorId(id) {
  const comando = `
    SELECT *
    FROM cliente
    WHERE id = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}



export async function deletarCliente(id) {
  const comando = `
    DELETE FROM cliente
    WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}
