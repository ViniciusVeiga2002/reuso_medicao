# Reuso — medição

## Pastas

- `view/`: telas HTML.
- `assets/js/`: scripts das telas.
- `assets/vendor/`: Tailwind.
- `api/departamento/`: cadastro, listagem, edição e delete dos departamentos.
- `api/jornada/`: cadastro, listagem, edição e delete das jornadas.
- `config/`: conexão com o banco.
- `database/`: sql do banco.
- `models/entidades/`: classes Funcionários, Departamentos e Jornadas.
- `models/singleton/`: ConfiguracaoWhiteLabel e GerenciadorSessao.
- `models/template-method/`: templates e implementações de relatórios, autenticação e delegação.
- `models/strategy/`: interfaces e estratégias de cálculo, exportação e status.
- `models/modelos.php`: carrega todas as classes.
- `examples/`: exemplo de uso das classes.
- `tests/`: scripts pra testar se ta funcionando.

## Executar

usa (`reuso`) no terminal:

pra rodar
```powershell
php -S localhost:8000
```

pra ver como ta -> http://localhost:8000/view/index.html.

pra rodar precisa do banco configurado no `.env`.

## Exemplo de variabilidade

O comun é a operação com as mesmas telas e operações.
A variação é a identidade visual da empresa: nome, sigla e cor principal.
Pode configurar em `view/configuracoes.html`
O script compartilhado `assets/js/variabilidade.js` aplica a configuração nas telas.
