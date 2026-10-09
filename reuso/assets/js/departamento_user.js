const modal = document.getElementById('cadastro-modal');
const formulario = document.getElementById('cadastro-form');
const busca = document.getElementById('cadastro-busca');
const tabela = document.getElementById('cadastro-linhas');
const aviso = document.getElementById('cadastro-aviso');
const erro = document.getElementById('cadastro-erro');

function filtrar() {
  const termo = busca.value.trim().toLocaleLowerCase('pt-BR');
  const linhas = [...tabela.querySelectorAll('tr[data-id]')];
  let quantidade = 0;
  linhas.forEach(linha => {
    linha.hidden = !linha.textContent.toLocaleLowerCase('pt-BR').includes(termo);
    if (!linha.hidden) quantidade++;
  });
  document.getElementById('cadastro-total').textContent = linhas.length + ' registros';
  document.getElementById('cadastro-resumo').textContent =
    'Mostrando ' + quantidade + ' de ' + linhas.length + ' registros';
}

async function carregarDepartamentos() {
  const resposta = await fetch('../api/departamento/listar-departamentos.php');
  if (!resposta.ok) throw new Error('Não foi possível carregar os departamentos.');
  const departamentos = await resposta.json();
  tabela.replaceChildren();
  departamentos.forEach(departamento => {
    const linha = document.createElement('tr');
    linha.className = 'border-b';
    linha.dataset.id = departamento.id;
    [departamento.id, departamento.nome, new Date(departamento.criado_em).toLocaleDateString('pt-BR')].forEach(valor => {
      const coluna = document.createElement('td');
      coluna.className = 'py-5';
      coluna.textContent = valor;
      linha.appendChild(coluna);
    });
    const acoes = document.createElement('td');
    acoes.className = 'py-5';
    // const editar = document.createElement('button');
    // editar.textContent = 'Editar';
    // editar.className = 'mr-2 rounded-lg border px-3 py-2';
    // editar.addEventListener('click', () => abrirFormulario(departamento));
    // const deletar = document.createElement('button');
    // deletar.textContent = 'Deletar';
    // deletar.className = 'rounded-lg border px-3 py-2 text-red-600';
    // deletar.addEventListener('click', async () => {
    //   if (!confirm('Deletar o departamento ' + departamento.nome + '?')) return;
    //   deletar.disabled = true;
    //   try {
    //     const resposta = await fetch('../api/departamento/deletar-departamento.php', {
    //       method: 'POST', body: new URLSearchParams({ id: departamento.id })
    //     });
    //     const mensagem = await resposta.text();
    //     if (!resposta.ok) throw new Error(mensagem);
    //     aviso.textContent = mensagem;
    //     await carregarDepartamentos();
    //   } catch (falha) {
    //     aviso.textContent = falha.message;
    //   } finally {
    //     deletar.disabled = false;
    //   }
    // });
    // acoes.append(editar, deletar);
    linha.appendChild(acoes);
    tabela.appendChild(linha);
  });
  if (departamentos.length === 0) {
    const linha = tabela.insertRow();
    const coluna = linha.insertCell();
    coluna.colSpan = 4;
    coluna.className = 'py-5';
    coluna.textContent = 'Nenhum departamento cadastrado.';
  }
  filtrar();
}

function abrirFormulario(departamento) {
  formulario.reset();
  erro.textContent = '';
  formulario.action = departamento ? '../api/departamento/editar-departamento.php' : '../api/departamento/cadastro-departamento.php';
  document.getElementById('campo-id').value = departamento ? departamento.id : '';
  document.getElementById('campo-nome').value = departamento ? departamento.nome : '';
  document.getElementById('cadastro-titulo').textContent = departamento ? 'Editar departamento' : 'Adicionar departamento';
  formulario.querySelector('button[type="submit"]').textContent = departamento ? 'Salvar' : 'Adicionar';
  modal.showModal();
}

document.querySelector('header button').addEventListener('click', () => abrirFormulario());
modal.querySelectorAll('[data-fechar]').forEach(botao => {
  botao.addEventListener('click', () => modal.close());
});
busca.addEventListener('input', filtrar);
formulario.addEventListener('submit', async evento => {
  evento.preventDefault();
  const botao = formulario.querySelector('button[type="submit"]');
  botao.disabled = true;
  erro.textContent = '';
  try {
    const resposta = await fetch(formulario.action, { method: 'POST', body: new FormData(formulario) });
    const mensagem = await resposta.text();
    if (!resposta.ok) throw new Error('Não foi possível salvar o departamento. Verifique o nome informado.');
    modal.close();
    aviso.textContent = mensagem;
    await carregarDepartamentos();
  } catch (falha) {
    erro.textContent = falha.message;
    if (!modal.open) aviso.textContent = falha.message;
  } finally {
    botao.disabled = false;
  }
});
carregarDepartamentos().catch(falha => {
  aviso.textContent = falha.message;
  document.getElementById('cadastro-resumo').textContent = 'Não foi possível carregar os registros.';
});
