// O formulário envia os inputs diretamente por POST para o PHP definido no HTML.
const modal = document.getElementById('cadastro-modal');
const formulario = document.getElementById('cadastro-form');
const busca = document.getElementById('cadastro-busca');
const linhas = [...document.querySelectorAll('#cadastro-linhas tr')];

document.querySelector('header button').addEventListener('click', () => {
  formulario.reset();
  modal.showModal();
});

modal.querySelectorAll('[data-fechar]').forEach(botao => {
  botao.addEventListener('click', () => modal.close());
});

busca.addEventListener('input', () => {
  const termo = busca.value.trim().toLocaleLowerCase('pt-BR');
  let quantidade = 0;
  linhas.forEach(linha => {
    linha.hidden = !linha.textContent.toLocaleLowerCase('pt-BR').includes(termo);
    if (!linha.hidden) quantidade++;
  });
  document.getElementById('cadastro-resumo').textContent =
    'Mostrando ' + quantidade + ' de ' + linhas.length + ' registros';
});
