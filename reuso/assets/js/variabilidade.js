// Ponto de variação da LPS: identidade visual configurável por instalação.
(() => {
  const chave = 'forge.identidade.v1';
  const padrao = { nome: 'FORGE', sigla: 'F', cor: '#ff7a18' };
  const normalizar = valor => ({
    nome: typeof valor?.nome === 'string' && valor.nome.trim() ? valor.nome.trim().slice(0, 40) : padrao.nome,
    sigla: typeof valor?.sigla === 'string' && valor.sigla.trim() ? valor.sigla.trim().slice(0, 3) : padrao.sigla,
    cor: /^#[0-9a-f]{6}$/i.test(valor?.cor) ? valor.cor : padrao.cor
  });
  let identidade = padrao;
  try { identidade = normalizar(JSON.parse(localStorage.getItem(chave))); } catch { /* Usa a identidade padrão. */ }
  const estilo = document.createElement('style');
  document.head.append(estilo);
  const aplicar = valor => {
    const rgb = valor.cor.slice(1).match(/../g).map(parte => parseInt(parte, 16));
    const texto = rgb[0] * .299 + rgb[1] * .587 + rgb[2] * .114 > 150 ? '#171a1d' : '#ffffff';
    estilo.textContent = `[class~="bg-[#ff7a18]"], .bg-orange { background-color: ${valor.cor} !important; }
      button[class~="bg-[#ff7a18]"], button.bg-orange, aside b[class~="bg-[#ff7a18]"], aside b.bg-orange { color: ${texto} !important; }
      [class~="border-[#ff7a18]"], .border-orange { border-color: ${valor.cor} !important; }
      [class~="text-[#ff7a18]"], .text-orange { color: ${valor.cor} !important; }`;
    const nome = document.querySelector('aside p.font-bold');
    const logo = document.querySelector('aside b');
    if (nome) nome.textContent = valor.nome;
    if (logo) logo.textContent = valor.sigla;
    const previa = document.getElementById('identidade-previa');
    if (previa) {
      previa.style.backgroundColor = valor.cor;
      previa.style.color = texto;
      previa.textContent = `${valor.sigla} · ${valor.nome}`;
    }
  };
  aplicar(identidade);
  const form = document.getElementById('identidade-form');
  if (!form) return;
  const mensagem = document.getElementById('identidade-mensagem');
  const preencher = valor => {
    for (const campo of ['nome', 'sigla', 'cor']) form.elements[campo].value = valor[campo];
    aplicar(valor);
  };
  const ler = () => normalizar(Object.fromEntries(new FormData(form)));
  preencher(identidade);
  form.addEventListener('input', () => {
    aplicar(ler());
    mensagem.textContent = 'Prévia das alterações. Clique em salvar para manter esta configuração.';
  });
  form.addEventListener('submit', evento => {
    evento.preventDefault();
    try {
      identidade = ler();
      localStorage.setItem(chave, JSON.stringify(identidade));
      aplicar(identidade);
      mensagem.textContent = 'Identidade salva! Abra outra tela para ver a mesma configuração.';
    } catch {
      mensagem.textContent = 'Não foi possível salvar no navegador. Verifique se o armazenamento está habilitado.';
    }
  });
  document.getElementById('identidade-restaurar').addEventListener('click', () => {
    try {
      localStorage.removeItem(chave);
      identidade = padrao;
      preencher(padrao);
      mensagem.textContent = 'Identidade padrão restaurada.';
    } catch { mensagem.textContent = 'Não foi possível restaurar a configuração salva.'; }
  });
})();
