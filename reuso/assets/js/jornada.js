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

async function carregarJornadas() {
  const resposta = await fetch('../api/jornada/listar-jornadas.php');
  if (!resposta.ok) throw new Error('Não foi possível carregar as jornadas.');
  const jornadas = await resposta.json();
  tabela.replaceChildren();
  jornadas.forEach(jornada => {
    const linha = document.createElement('tr');
    linha.className = 'border-b';
    linha.dataset.id = jornada.id;
    [jornada.id, jornada.tipo_vinculo, jornada.turno, jornada.carga_horaria + " h", new Date(jornada.criado_em).toLocaleDateString('pt-BR')].forEach(valor => {
      const coluna = document.createElement('td');
      coluna.className = 'py-5';
      coluna.textContent = valor;
      linha.appendChild(coluna);
    });
    const acoes = document.createElement('td');
    acoes.className = 'py-5';
    const editar = document.createElement('button');
    editar.textContent = 'Editar';
    editar.className = 'mr-2 rounded-lg border px-3 py-2';
    editar.addEventListener('click', () => abrirFormulario(jornada));
    const deletar = document.createElement('button');
    deletar.textContent = 'Deletar';
    deletar.className = 'rounded-lg border px-3 py-2 text-red-600';
    deletar.addEventListener('click', async () => {
      if (!confirm('Deletar a jornada ' + jornada.tipo_vinculo + '?')) return;
      deletar.disabled = true;
      try {
        const resposta = await fetch('../api/jornada/deletar-jornada.php', {
          method: 'POST', body: new URLSearchParams({ id: jornada.id })
        });
        const mensagem = await resposta.text();
        if (!resposta.ok) throw new Error(mensagem);
        aviso.textContent = mensagem;
        await carregarJornadas();
      } catch (falha) {
        aviso.textContent = falha.message;
      } finally {
        deletar.disabled = false;
      }
    });
    acoes.append(editar, deletar);
    linha.appendChild(acoes);
    tabela.appendChild(linha);
  });
  if (jornadas.length === 0) {
    const linha = tabela.insertRow();
    const coluna = linha.insertCell();
    coluna.colSpan = 6;
    coluna.className = 'py-5';
    coluna.textContent = 'Nenhuma jornada cadastrada.';
  }
  filtrar();
}

function abrirFormulario(jornada) {
  formulario.reset();
  erro.textContent = '';
  formulario.action = jornada ? '../api/jornada/editar-jornada.php' : '../api/jornada/cadastro-jornada.php';
  document.getElementById('campo-id').value = jornada ? jornada.id : '';
  ['tipo_vinculo', 'turno', 'carga_horaria'].forEach(campo => {
    document.getElementById('campo-' + campo).value = jornada ? jornada[campo] : '';
  });
  document.getElementById('cadastro-titulo').textContent = jornada ? 'Editar jornada' : 'Adicionar jornada';
  formulario.querySelector('button[type="submit"]').textContent = jornada ? 'Salvar' : 'Adicionar';
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
    if (!resposta.ok) throw new Error('Não foi possível salvar a jornada. Verifique os campos informados.');
    modal.close();
    aviso.textContent = mensagem;
    await carregarJornadas();
  } catch (falha) {
    erro.textContent = falha.message;
    if (!modal.open) aviso.textContent = falha.message;
  } finally {
    botao.disabled = false;
  }
});
carregarJornadas().catch(falha => {
  aviso.textContent = falha.message;
  document.getElementById('cadastro-resumo').textContent = 'Não foi possível carregar os registros.';
});
