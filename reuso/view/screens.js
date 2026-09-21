const pages = [
  ['index.html','▦','Visão geral'],['funcionarios.html','♣','Funcionários'],
  ['cargos.html','▤','Cargos'],['funcoes.html','⚙','Funções'],
  ['demandas.html','✓','Demandas'],['relatorios.html','◫','Relatórios'],
  ['configuracoes.html','⚙','Configurações']
];

const badge = (text, color = 'bg-emerald-600') =>
  `<span class="rounded-full ${color} px-3 py-1.5 text-[11px] font-bold text-white">${text}</span>`;

function sidebar(active) {
  return `<aside class="bg-[#171a1d] text-white lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col">
    <div class="flex items-center gap-3 p-6"><b class="grid size-10 place-items-center rounded-xl bg-[#ff7a18] text-xl text-[#171a1d]">F</b><div><p class="font-bold">FORGE</p><p class="text-[9px] font-bold text-[#8f989f]">WORKFORCE</p></div></div>
    <nav class="hidden flex-1 space-y-2 px-3 lg:block">${pages.map(([href,icon,name]) =>
      `<a href="${href}" class="flex gap-4 rounded-lg ${active===name?'border-l-4 border-[#ff7a18] bg-[#22272b] text-white':'text-[#aeb5bc]'} px-4 py-3 text-sm font-bold"><span>${icon}</span>${name}</a>`
    ).join('')}</nav>
    <a href="perfil.html" class="hidden border-t border-[#30363b] p-6 lg:flex lg:items-center lg:gap-3"><b class="grid size-9 place-items-center rounded-full bg-[#394149] text-xs">TO</b><div><p class="text-sm font-bold">Theo Otto</p><p class="text-xs text-[#9aa2a9]">Administrador</p></div></a>
  </aside>`;
}

function shell(active, subtitle, content, action = '+ Novo') {
  document.body.innerHTML = `<div class="min-h-screen lg:flex">${sidebar(active)}
    <main class="w-full p-5 sm:p-8 lg:ml-60 lg:p-10">
      <header class="mb-9 flex flex-col gap-5 sm:flex-row sm:justify-between"><div><h1 class="text-3xl font-black">${active}</h1><p class="mt-2 text-sm text-[#6f7780]">${subtitle}</p></div>
      <div class="flex gap-3"><label class="flex h-10 w-52 items-center gap-3 rounded-xl border bg-white px-4 text-xs text-[#6f7780]">⌕<input class="w-full outline-none" placeholder="Buscar no sistema"></label><button class="rounded-xl bg-[#ff7a18] px-6 text-sm font-bold">${action}</button></div></header>
      ${content}</main></div>`;
}

function funcionarios() {
  const people = [
    ['MS','Mariana Souza','mariana@empresa.com','00482','Supervisora','Produção','Ativo','03/02/2022'],
    ['CL','Carlos Lima','carlos@empresa.com','00517','Analista','Logística','Ativo','18/08/2023'],
    ['AR','Ana Ribeiro','ana@empresa.com','00391','Técnica','Qualidade','Ativo','12/04/2021'],
    ['JV','João Vieira','joao@empresa.com','00602','Mecânico','Manutenção','Ativo','07/11/2024'],
    ['CR','Camila Rocha','camila@empresa.com','00499','Assistente','Logística','Férias','20/05/2023'],
    ['FM','Felipe Martins','felipe@empresa.com','00545','Coordenador','RH','Ativo','01/09/2023']
  ];
  shell('Funcionários','Cadastre, edite e organize todos os colaboradores da empresa.',`
    <section class="mb-6 flex flex-wrap gap-4 rounded-2xl border bg-white p-5"><input class="min-w-64 flex-1 rounded-xl border px-4 py-3 text-sm" placeholder="⌕  Buscar por nome, matrícula ou e-mail"><button class="rounded-xl border px-5 text-sm">Todos os setores⌄</button><button class="rounded-xl border px-5 text-sm">Status: ativos⌄</button><b class="ml-auto rounded-full bg-gray-100 px-5 py-3 text-xs text-gray-500">248 registros</b></section>
    <section class="overflow-x-auto rounded-2xl border bg-white p-6"><table class="w-full min-w-[900px] text-left text-xs"><thead class="border-b text-gray-500"><tr><th class="pb-4">Funcionário</th><th>Matrícula</th><th>Cargo</th><th>Setor</th><th>Status</th><th>Admissão</th><th>Ações</th></tr></thead><tbody>
    ${people.map(p=>`<tr class="border-b"><td class="py-5"><div class="flex items-center gap-3"><b class="grid size-9 place-items-center rounded-full bg-gray-200">${p[0]}</b><div><strong>${p[1]}</strong><p class="text-[10px] text-gray-500">${p[2]}</p></div></div></td><td>${p[3]}</td><td>${p[4]}</td><td class="text-gray-500">${p[5]}</td><td>${badge(p[6],p[6]==='Férias'?'bg-yellow-500':'bg-emerald-600')}</td><td class="text-gray-500">${p[7]}</td><td class="text-blue-500">✎　⋮</td></tr>`).join('')}</tbody></table>
    <div class="flex justify-between pt-20 text-xs text-gray-500"><span>Mostrando 1–6 de 248 funcionários</span><span>‹　<b class="rounded-full bg-[#202428] px-3 py-2 text-white">1</b>　2　›</span></div></section>`);
}

function cargos() {
  const cards=[['Supervisor de Produção','Produção','12','Pleno','R$ 5,5k – 7,2k','#ff7a18'],['Analista de Logística','Logística','21','Júnior','R$ 3,8k – 5,1k','#3b6ea8'],['Técnico de Qualidade','Qualidade','16','Pleno','R$ 4,2k – 5,9k','#2f9e6f'],['Mecânico Industrial','Manutenção','28','Pleno','R$ 4,6k – 6,3k','#d99a0b'],['Assistente Administrativo','Administrativo','14','Júnior','R$ 2,8k – 3,7k','#9aa2a9'],['Coordenador de RH','RH','4','Sênior','R$ 7,0k – 9,2k','#cf4e4e']];
  shell('Cargos','Defina cargos, níveis, faixas salariais e atribuições.',`
    <section class="mb-7 flex justify-between rounded-2xl border bg-white p-6"><div><h2 class="font-black">Estrutura organizacional</h2><p class="mt-2 text-xs text-gray-500">18 cargos cadastrados • 7 setores • 248 colaboradores vinculados</p></div><button class="rounded-full bg-[#ff7a18] px-5 text-xs font-bold">+ Criar cargo</button></section>
    <section class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">${cards.map(c=>`<article class="rounded-2xl border-l-4 bg-white p-6 shadow-sm" style="border-left-color:${c[5]}"><div class="flex justify-between"><h3 class="font-black">${c[0]}</h3><span class="text-blue-500">✎　⋮</span></div><b class="mt-4 inline-block rounded-full bg-gray-100 px-3 py-2 text-xs">${c[1]}</b><p class="mt-3 text-xs text-gray-500">${c[2]} colaboradores</p><p class="mt-3 text-xs text-gray-500">Nível ${c[3]}</p><strong class="mt-3 block text-sm">${c[4]}</strong></article>`).join('')}</section>
    <section class="mt-7 grid gap-8 rounded-2xl border bg-white p-7 lg:grid-cols-[2fr_1fr]"><div><h2 class="text-lg font-black">Cargo selecionado: Supervisor de Produção</h2><p class="mt-4 text-xs text-gray-500">Principais atribuições</p><ul class="mt-3 space-y-3 text-sm"><li>• Liderar equipe de produção e garantir cumprimento de metas do turno.</li><li>• Acompanhar indicadores de produtividade, qualidade e segurança.</li><li>• Abrir, delegar e validar demandas do setor.</li></ul></div><div class="rounded-xl border bg-gray-50 p-6"><b class="text-sm text-gray-500">Permissões do cargo</b><div class="mt-4 flex flex-wrap gap-2">${['Funcionários','Demandas','Relatórios','Escalas'].map(x=>badge(x,x==='Escalas'?'bg-gray-300 text-black':'bg-[#202428]')).join('')}</div></div></section>`);
}

function funcoes() {
  const items=[['Aprovar ordem de produção','Pode aprovar e encerrar ordens do setor.','Produção','6 cargos','Alta','bg-red-500'],['Delegar demanda','Distribui atividades para membros da equipe.','Gestão','9 cargos','Alta','bg-red-500'],['Auditar checklist','Valida checklists operacionais e registra não conformidades.','Qualidade','4 cargos','Média','bg-yellow-500'],['Gerir inventário','Atualiza saldo, movimentações e inventários.','Logística','3 cargos','Média','bg-yellow-500'],['Abrir manutenção','Registra solicitação de manutenção preventiva/corretiva.','Manutenção','7 cargos','Baixa','bg-emerald-600']];
  shell('Funções','Organize responsabilidades e competências associadas aos cargos.',`
    <section class="rounded-2xl border bg-white p-7"><div class="mb-8 flex flex-wrap justify-between gap-4"><div><h2 class="text-lg font-black">Catálogo de funções</h2><p class="text-xs text-gray-500">Funções reutilizáveis podem ser atribuídas a vários cargos.</p></div><div class="flex gap-4"><input class="rounded-xl border px-5 text-xs" placeholder="⌕ Buscar função"><button class="rounded-full bg-[#ff7a18] px-5 text-xs font-bold">+ Nova função</button></div></div>
    <div class="space-y-4">${items.map(i=>`<article class="grid items-center gap-4 rounded-2xl border bg-gray-50 p-5 md:grid-cols-[48px_1fr_90px_90px_70px]"><b class="grid size-11 place-items-center rounded-xl bg-[#202428] text-white">⚙</b><div><h3 class="font-black">${i[0]}</h3><p class="mt-1 text-xs text-gray-500">${i[1]}</p><b class="mt-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs">${i[2]}</b></div><span class="text-xs font-bold text-gray-500">${i[3]}</span>${badge(i[4],i[5])}<span class="text-blue-500">✎　⋮</span></article>`).join('')}</div></section>`);
}

function demandas() {
  const cols=[['ABERTAS','#3b6ea8',[['#142','Urgente','Revisar checklist de segurança','Produção','JM','Hoje, 16:00','bg-red-500'],['#147','Alta','Atualizar escala do turno B','RH','MS','Amanhã','bg-orange-500'],['#151','Média','Inventário semanal','Logística','CR','18 ago','bg-yellow-500']]],['EM ANDAMENTO','#ff7a18',[['#139','Alta','Inspecionar esteira 04','Manutenção','JV','Hoje','bg-orange-500'],['#145','Média','Revisar treinamento NR-12','Segurança','FM','19 ago','bg-yellow-500']]],['EM VALIDAÇÃO','#d99a0b',[['#134','Alta','Validar lote de matéria-prima','Qualidade','AR','Hoje','bg-orange-500'],['#140','Baixa','Homologar novo fornecedor','Compras','CL','20 ago','bg-emerald-600']]],['CONCLUÍDAS','#2f9e6f',[['#128','Concluída','Fechar apontamento mensal','Produção','MS','12 ago','bg-emerald-600'],['#131','Concluída','Trocar rolamento linha 2','Manutenção','JV','13 ago','bg-emerald-600']]]];
  shell('Demandas','Crie, delegue e acompanhe tarefas operacionais por prioridade e prazo.',`
    <section class="mb-7 flex flex-wrap justify-between gap-4 rounded-2xl border bg-white p-5"><div class="flex gap-2"><b class="rounded-full bg-[#202428] px-5 py-2 text-xs text-white">Kanban</b><b class="rounded-full bg-gray-100 px-5 py-2 text-xs">Lista</b></div><div class="flex gap-3"><button class="rounded-xl border px-5 text-sm">Todos os setores</button><button class="rounded-xl border px-5 text-sm">Prioridade</button><button class="rounded-full bg-[#ff7a18] px-5 text-xs font-bold">+ Demanda</button></div></section>
    <section class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">${cols.map(c=>`<div><h2 class="mb-5 flex items-center justify-between text-xs font-black text-gray-500">${c[0]}<i class="size-3 rounded-full" style="background:${c[1]}"></i></h2><div class="space-y-5">${c[2].map(x=>`<article class="rounded-2xl border bg-white p-5"><div class="flex justify-between"><b class="text-xs text-gray-500">${x[0]}</b>${badge(x[1],x[6])}</div><h3 class="my-4 text-sm font-black">${x[2]}</h3><b class="rounded-full bg-gray-100 px-3 py-1 text-xs">${x[3]}</b><div class="mt-4 flex items-center gap-3 border-t pt-4"><b class="grid size-8 place-items-center rounded-full bg-gray-200 text-xs">${x[4]}</b><span class="text-xs text-gray-500">${x[5]}</span><span class="ml-auto">⋮</span></div></article>`).join('')}</div></div>`).join('')}</section>`);
}

function relatorios() {
  const metrics=[['Produtividade média','84%','+5% este mês','#2f9e6f'],['Horas trabalhadas','31.420','3 sem ocupação','#3b6ea8'],['Demandas concluídas','428','92 dentro do prazo','#ff7a18'],['Eficiência operacional','91%','+4% vs. mês anterior','#2f9e6f']];
  shell('Relatórios','Analise desempenho, produtividade e evolução da equipe.',`
    <section class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">${metrics.map(m=>`<article class="rounded-2xl border bg-white p-5"><div class="flex gap-4"><i class="h-11 w-1.5 rounded-full" style="background:${m[3]}"></i><div><p class="text-sm font-bold text-gray-500">${m[0]}</p><b class="block text-3xl">${m[1]}</b><small class="font-bold" style="color:${m[3]}">${m[2]}</small></div></div></article>`).join('')}</section>
    <section class="mt-7 grid gap-5 xl:grid-cols-[1.9fr_1fr]"><article class="rounded-2xl border bg-white p-6"><h2 class="text-lg font-black">Produtividade por setor</h2><p class="text-xs text-gray-500">Comparativo mensal</p><div class="mt-8 space-y-6">${[['90%','78%'],['8,5/10','54%'],['Qualidade • 88%','42%'],['3,0%','66%'],['Administrativo • 72%','33%']].map(x=>`<div class="grid grid-cols-[100px_1fr_36px] gap-4 text-xs font-bold"><span>${x[0]}</span><div class="h-4 rounded-full bg-gray-200"><div class="h-full rounded-full bg-[#ff7a18]" style="width:${x[1]}"></div></div><span>${x[1]}</span></div>`).join('')}</div></article>
    <article class="rounded-2xl border bg-white p-6"><h2 class="text-lg font-black">Resumo do período</h2><div class="mt-8 space-y-7">${[['2h 18min','Produção • 96% de eficiência'],['Maior evolução','Logística • +18% no mês'],['Atenção necessária','Qualidade • 3 atrasos'],['3,0%','7 demandas críticas no período']].map((x,i)=>`<div><b class="text-sm">${x[0]}</b><p class="text-xs text-gray-500">${x[1]}</p></div>`).join('')}</div></article></section>
    <section class="mt-7 rounded-2xl border bg-white p-6"><div class="flex justify-between"><h2 class="text-lg font-black">Indicadores detalhados</h2><button class="rounded-full bg-gray-100 px-5 text-xs font-bold">Baixar CSV</button></div><div class="overflow-x-auto"><table class="mt-5 w-full min-w-[700px] text-left text-xs"><thead class="border-b text-gray-500"><tr><th class="py-3">Indicador</th><th>Resultado</th><th>Meta</th><th>Variação</th><th>Situação</th></tr></thead><tbody>${[['Taxa de conclusão','91%','90%','+4,2%','Acima da meta','bg-red-500'],['Tempo médio por demanda','2h 18min','2h 30min','-8 min','Positivo','bg-orange-500'],['Absenteísmo','2,4%','3,0%','-0,6%','Controlado','bg-blue-500'],['Satisfação interna','8,7/10','8,5/10','+0,2','Excelente','bg-yellow-500']].map(x=>`<tr><td class="py-5 font-bold">${x[0]}</td><td>${x[1]}</td><td>${x[2]}</td><td>${x[3]}</td><td>${badge(x[4],x[5])}</td></tr>`).join('')}</tbody></table></div></section>`,'Exportar PDF');
}

function configuracoes() {
  const rows = [
    ['MS','Dados da empresa','Nome, CNPJ, unidades e identidade','CFG-01','Theo Otto','Organização','Ativo','Hoje'],
    ['CL','Usuários e permissões','Perfis, níveis e controle de acesso','CFG-02','Administrador','Segurança','Ativo','20 ago'],
    ['AR','Notificações','E-mail, alertas e lembretes','CFG-03','Gestores','Comunicação','Ativo','18 ago'],
    ['JV','Fluxos de demanda','Status, prioridades e aprovações','CFG-04','Operações','Processos','Ativo','15 ago'],
    ['CR','Jornada e calendário','Turnos, feriados e escalas','CFG-05','RH','Logística','RH','10 ago'],
    ['FM','Integrações','ERP, ponto e exportação de dados','CFG-06','TI','Sistema','Ativo','02 ago']
  ];
  shell('Configurações','Personalize regras, acessos e preferências da plataforma.',`
    <section class="mb-6 flex flex-wrap gap-4 rounded-2xl border bg-white p-5"><input class="min-w-64 flex-1 rounded-xl border px-4 py-3 text-sm" placeholder="⌕  Buscar configuração"><button class="rounded-xl border px-5 text-sm">Todos os módulos⌄</button><button class="rounded-xl border px-5 text-sm">Exibir: todos⌄</button><b class="ml-auto rounded-full bg-gray-100 px-5 py-3 text-xs text-gray-500">6 categorias</b></section>
    <section class="overflow-x-auto rounded-2xl border bg-white p-6"><table class="w-full min-w-[900px] text-left text-xs"><thead class="border-b text-gray-500"><tr><th class="pb-4">Configuração</th><th>Código</th><th>Responsável</th><th>Escopo</th><th>Situação</th><th>Atualização</th><th>Editar</th></tr></thead><tbody>
    ${rows.map(r=>`<tr class="border-b"><td class="py-5"><div class="flex items-center gap-3"><b class="grid size-9 place-items-center rounded-full bg-gray-200">${r[0]}</b><div><strong>${r[1]}</strong><p class="text-[10px] text-gray-500">${r[2]}</p></div></div></td><td>${r[3]}</td><td>${r[4]}</td><td class="text-gray-500">${r[5]}</td><td>${badge(r[6],r[6]==='RH'?'bg-yellow-500':'bg-emerald-600')}</td><td class="text-gray-500">${r[7]}</td><td class="text-blue-500">✎　⋮</td></tr>`).join('')}</tbody></table><div class="flex justify-between pt-20 text-xs text-gray-500"><span>6 categorias de configuração</span><span>‹　<b class="rounded-full bg-[#202428] px-3 py-2 text-white">1</b>　2　›</span></div></section>`,'Salvar alterações');
}

function detalheFuncionario() {
  shell('Funcionários','Cadastre, edite e organize todos os colaboradores da empresa.',`
    <section class="relative min-h-[700px] rounded-2xl border bg-white p-7 shadow-sm">
      <div class="flex items-center gap-5"><b class="grid size-16 place-items-center rounded-full bg-gray-100 text-xl">MS</b><div><h2 class="text-3xl font-black">Mariana Souza</h2><p class="text-sm text-gray-500">Supervisora de Produção • Matrícula 00482</p><p class="mt-1 text-xs font-bold text-emerald-600">Ativa desde 03/02/2022</p></div></div>
      <article class="mt-14 rounded-xl border bg-gray-50 p-5"><h3 class="text-lg font-black">Informações pessoais</h3><div class="mt-3 space-y-2 text-sm text-gray-500"><p>E-mail: mariana@empresa.com</p><p>Telefone: (41) 99942-1840</p><p>CPF: ***.482.***-**</p><p>Data de nascimento: 14/09/1994</p></div></article>
      <article class="mt-6 h-40 rounded-xl border bg-gray-50"></article><article class="mt-6 h-40 rounded-xl border bg-gray-50"></article>
    </section>`);
}

function perfil() {
  const tasks=[['Revisar planilha de admissão','Administrativo','Hoje, 17:00','Urgente','bg-red-100 text-red-600'],['Atualizar checklist de segurança','Comitê Qualidade','Amanhã','Em andamento','bg-orange-100 text-orange-600'],['Alinhamento de processos mensais','Administrativo','18 Ago','Planejada','bg-blue-100 text-blue-600'],['Gerar relatório de auditoria','Comitê Qualidade','20 Ago','Aguardando','bg-gray-200 text-gray-600']];
  document.body.innerHTML = `<div class="min-h-screen lg:flex">${sidebar('Meu perfil')}<main class="w-full p-5 sm:p-8 lg:ml-60 lg:p-10">
    <header class="mb-7 flex justify-between"><div><h1 class="text-3xl font-black">Meu perfil</h1><p class="text-sm text-gray-500">Consulte seus dados, equipes, tarefas e jornada de trabalho.</p></div><div class="flex gap-3"><label class="hidden items-center rounded-xl border bg-white px-4 sm:flex">⌕　<input class="outline-none" placeholder="Buscar no sistema"></label><button class="rounded-xl border bg-white px-4">♧</button><button class="rounded-xl bg-[#ff7a18] px-5 font-bold">✎ Editar perfil</button></div></header>
    <section class="flex flex-col justify-between gap-5 rounded-2xl border bg-white p-6 sm:flex-row"><div class="flex items-center gap-5"><b class="grid size-16 place-items-center rounded-full bg-slate-100 text-xl">TO</b><div><h2 class="text-2xl font-black">Theo Otto <span class="rounded bg-emerald-100 px-2 py-1 text-xs text-emerald-700">Ativo</span></h2><p class="text-sm text-gray-500">Auxiliar Administrativo • Matrícula 00482</p><p class="mt-2 text-xs text-gray-500">✉ theo.otto@forge.com　📍 Sede Curitiba　▣ Administrativo</p></div></div><div class="text-right text-xs text-gray-500">Membro da equipe<br><b class="text-black">Na empresa desde 19 mar 2025</b></div></section>
    <section class="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">${[['Horas este mês','152h 30min','de 176h previstas'],['Banco de horas','+ 08h 15min','Saldo positivo'],['Jornada','08:00 - 17:48','Segunda a sexta'],['Tarefas concluídas','18 de 24','75% neste mês']].map((x,i)=>`<article class="rounded-2xl border bg-white p-5"><p class="text-sm font-bold text-gray-500">${x[0]}</p><b class="mt-5 block text-2xl">${x[1]}</b><p class="text-xs text-gray-500">${x[2]}</p>${i===0?'<div class="mt-5 h-1.5 rounded-full bg-gray-100"><div class="h-full w-[82%] rounded-full bg-[#ff7a18]"></div></div>':''}</article>`).join('')}</section>
    <section class="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]"><article class="rounded-2xl border bg-white p-6"><h2 class="text-lg font-black">Informações pessoais</h2><div class="mt-6 grid gap-6 text-sm sm:grid-cols-2"><div><small class="text-gray-500">NOME COMPLETO</small><p>Theo Otto</p></div><div><small class="text-gray-500">CPF</small><p>***.482.***-**</p></div><div><small class="text-gray-500">E-MAIL</small><p>theo.otto@forge.com</p></div><div><small class="text-gray-500">TELEFONE</small><p>(41) 99942-1840</p></div><div><small class="text-gray-500">CARGO</small><p>Auxiliar Administrativo</p></div><div><small class="text-gray-500">GESTOR DIRETO</small><p>Mariana Souza (Supervisora)</p></div></div></article><article class="rounded-2xl border bg-white p-6"><h2 class="text-lg font-black">Minhas equipes</h2><div class="mt-5 space-y-3"><div class="rounded-xl border bg-gray-50 p-4"><b>Administrativo</b><p class="text-xs text-gray-500">8 integrantes <span class="float-right">Membro</span></p></div><div class="rounded-xl border bg-gray-50 p-4"><b>Comitê de Qualidade</b><p class="text-xs text-gray-500">5 integrantes <span class="float-right text-orange-600">Líder</span></p></div></div></article></section>
    <section class="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]"><article class="rounded-2xl border bg-white p-6"><div class="flex justify-between"><h2 class="text-lg font-black">Minhas tarefas recentes</h2><a class="text-sm font-bold text-orange-600">Ver todas (12)</a></div><div class="mt-4 overflow-x-auto"><table class="w-full text-left text-xs"><thead class="bg-gray-50 text-gray-500"><tr><th class="p-3">Tarefa</th><th>Equipe</th><th>Prazo</th><th>Status</th></tr></thead><tbody>${tasks.map(t=>`<tr class="border-b"><td class="p-3">${t[0]}</td><td class="text-gray-500">${t[1]}</td><td class="text-gray-500">${t[2]}</td><td><b class="rounded px-2 py-1 ${t[4]}">${t[3]}</b></td></tr>`).join('')}</tbody></table></div></article>
    <article class="rounded-2xl border bg-white p-6"><div class="flex justify-between"><div><h2 class="text-lg font-black">Resumo de horas</h2><p class="text-xs text-gray-500">Esta semana (Seg - Sex)</p></div><b class="text-xl">38h 42min</b></div><div class="mt-7 flex h-36 items-end justify-around">${[['SEG','8h 12m',64],['TER','8h 45m',72],['QUA','8h 00m',62],['QUI','8h 15m',66],['SEX','5h 30m',45]].map(x=>`<div class="text-center"><small>${x[1]}</small><div class="mx-auto my-3 w-4 rounded-t bg-[#ff7a18]" style="height:${x[2]}px"></div><small class="text-gray-500">${x[0]}</small></div>`).join('')}</div><div class="mt-5 flex justify-between border-t pt-4 text-xs text-gray-400"><span>Último registro hoje às 12:45</span><b class="text-orange-600">Ver espelho de ponto →</b></div></article></section>
  </main></div>`;
}

({funcionarios,cargos,funcoes,demandas,relatorios,configuracoes,detalheFuncionario,perfil})[document.body.dataset.screen]?.();
