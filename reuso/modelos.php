<?php

declare(strict_types=1);

abstract class Usuario
{
    protected ?string $idUsuario = null;
    protected ?string $email = null;
    protected ?string $senha = null;

    // Placeholder preservado do Java: ainda não valida credenciais.
    public function realizarAutenticacao(string $email, string $senha): bool { return true; }
}

class AdministradorDaEmpresa extends Usuario
{
    private ?string $nivelPermissaoGlobal = null;

    public function configurarWhiteLabel(string $logo, string $cor): void {}
    public function gerenciarDepartamento(): void {}
    public function gerarRelatorioGeral(): void {}
}

class Funcionario extends Usuario
{
    protected ?string $nome = null;
    protected ?Cargo $cargo = null;
    protected ?JornadaDeTrabalho $jornada = null;
    protected ?Equipe $equipe = null;
    protected ?Funcionario $superior = null;

    public function consultarDadosPessoais(): void {}
    public function consultarMinhasAtribuicoes(): void {}
    public function atualizarStatusDaAtribuicao(Atribuicao $atribuicao, string $novoStatus): void {}

    // Em PHP, outra classe não pode acessar diretamente uma propriedade protected.
    public function getSuperior(): ?Funcionario { return $this->superior; }
    public function setSuperior(?Funcionario $superior): void { $this->superior = $superior; }
}

class Gestor extends Funcionario
{
    private ?string $nivelGestao = null;

    public function gerenciarSubordinados(): void {}
    public function criarAtribuicao(Funcionario $subordinado, Atribuicao $atribuicao): void {}
    public function gerarRelatorioDaEquipe(): void {}
}

class Departamento
{
    private ?string $idDepartamento = null;
    private ?string $nome = null;
    /** @var list<Equipe> */
    private array $equipes = [];

    public function adicionarEquipe(Equipe $equipe): void {}
    public function removerEquipe(Equipe $equipe): void {}
}

class Equipe
{
    private ?string $idEquipe = null;
    private ?string $nome = null;
    private ?Gestor $lider = null;
    /** @var list<Funcionario> */
    private array $membros = [];
    private ?Departamento $departamento = null;

    public function adicionarMembro(Funcionario $f): void {}
    public function removerMembro(Funcionario $f): void {}
    public function definirLider(Gestor $gestor): void {}
}

class Cargo
{
    private ?string $idCargo = null;
    private ?string $titulo = null;
    private ?string $nivel = null; // júnior, pleno, sênior

    public function atualizarNivel(string $novoNivel): void {}
    public function editarTitulo(string $novoTitulo): void {}
}

class JornadaDeTrabalho
{
    private ?string $idJornada = null;
    private ?string $tipoDeVinculo = null;
    private ?string $turno = null;
    private int $cargaHoraria = 0;

    public function calcularHorasMensais(): int { return $this->cargaHoraria * 4; }
}

class Atribuicao
{
    private ?string $idAtribuicao = null;
    private ?string $descricao = null;
    private ?string $status = null; // pendente, concluída
    private ?DateTimeInterface $prazo = null;
    private ?Funcionario $executor = null;
    private ?Gestor $delegador = null;

    public function atualizarStatus(string $novoStatus): void { $this->status = $novoStatus; }
    public function alterarPrazo(DateTimeInterface $novoPrazo): void { $this->prazo = $novoPrazo; }
}

class Relatorio
{
    private ?string $idRelatorio = null;
    private ?string $tipo = null;
    private ?DateTimeInterface $dataGeracao = null;
    private ?string $conteudoGerado = null;

    public function exportar(string $formato): void {}
}

class ConfiguracaoWhiteLabel
{
    private static ?ConfiguracaoWhiteLabel $instancia = null;
    private ?string $logoUrl = null;
    private string $corPrimaria;

    private function __construct() { $this->corPrimaria = '#000000'; }

    public static function getInstancia(): ConfiguracaoWhiteLabel
    {
        if (self::$instancia === null) {
            self::$instancia = new ConfiguracaoWhiteLabel();
        }
        return self::$instancia;
    }

    public function aplicarIdentidade(string $logo, string $cor): void
    {
        $this->logoUrl = $logo;
        $this->corPrimaria = $cor;
    }
}

class GerenciadorSessao
{
    private static ?GerenciadorSessao $instancia = null;
    private ?Usuario $usuarioLogado = null;

    private function __construct() {}

    public static function getInstancia(): GerenciadorSessao
    {
        if (self::$instancia === null) {
            self::$instancia = new GerenciadorSessao();
        }
        return self::$instancia;
    }

    public function iniciarSessao(Usuario $usuario): void { $this->usuarioLogado = $usuario; }
    public function getUsuarioLogado(): ?Usuario { return $this->usuarioLogado; }
}

abstract class GeradorRelatorioTemplate
{
    final public function gerarRelatorio(): Relatorio
    {
        $this->buscarDadosBanco();
        $this->formatarDados();
        return $this->construirRelatorioFinal();
    }

    abstract protected function buscarDadosBanco(): void;
    abstract protected function formatarDados(): void;

    private function construirRelatorioFinal(): Relatorio { return new Relatorio(); }
}

class RelatorioCargaHorariaEquipe extends GeradorRelatorioTemplate
{
    protected function buscarDadosBanco(): void
    {
        echo 'Buscando carga horária dos funcionários da equipe...' . PHP_EOL;
    }

    protected function formatarDados(): void
    {
        echo 'Formatando em tabela de horas por turno.' . PHP_EOL;
    }
}

abstract class AutenticacaoTemplate
{
    final public function realizarLogin(string $email, string $senha): void
    {
        if ($this->validarCredenciais($email, $senha)) {
            $this->registrarLogAcesso();
            $this->redirecionarPainel();
        }
    }

    // Placeholder preservado: aceita qualquer email e senha.
    private function validarCredenciais(string $email, string $senha): bool { return true; }
    private function registrarLogAcesso(): void { echo 'Log registrado.' . PHP_EOL; }
    abstract protected function redirecionarPainel(): void;
}

class AutenticacaoAdmin extends AutenticacaoTemplate
{
    protected function redirecionarPainel(): void
    {
        echo 'Redirecionando para Dashboard de Configuração Global.' . PHP_EOL;
    }
}

abstract class DelegacaoAtribuicaoTemplate
{
    final public function delegar(Gestor $gestor, Funcionario $funcionario, Atribuicao $atribuicao): void
    {
        if (!$this->validarSubordinacao($gestor, $funcionario)) {
            throw new RuntimeException('Erro: Funcionário não é subordinado direto.');
        }
        $this->salvarAtribuicaoBanco($atribuicao);
        $this->notificar($funcionario);
    }

    private function validarSubordinacao(Gestor $gestor, Funcionario $func): bool
    {
        // Identidade de objeto equivale a equals() sem sobrescrita no Java.
        return $func->getSuperior() !== null && $func->getSuperior() === $gestor;
    }

    private function salvarAtribuicaoBanco(Atribuicao $at): void { echo 'Tarefa salva.' . PHP_EOL; }
    abstract protected function notificar(Funcionario $funcionario): void;
}

class DelegacaoUrgente extends DelegacaoAtribuicaoTemplate
{
    protected function notificar(Funcionario $funcionario): void
    {
        echo 'Enviando SMS e Push Notification de alta prioridade.' . PHP_EOL;
    }
}

interface EstrategiaCalculoJornada
{
    public function calcularHorasMes(int $horasSemanais): int;
}

class CalculoCLT implements EstrategiaCalculoJornada
{
    public function calcularHorasMes(int $horasSemanais): int
    {
        return $horasSemanais * 5; // Regra original preservada.
    }
}

class CalculoPJ implements EstrategiaCalculoJornada
{
    public function calcularHorasMes(int $horasSemanais): int { return $horasSemanais * 4; }
}

class ProcessadorFolha
{
    private ?EstrategiaCalculoJornada $estrategia = null;

    public function setEstrategia(EstrategiaCalculoJornada $estrategia): void
    {
        $this->estrategia = $estrategia;
    }

    public function calcular(int $horas): int
    {
        if ($this->estrategia === null) {
            throw new LogicException('Defina a estratégia antes de calcular.');
        }
        return $this->estrategia->calcularHorasMes($horas);
    }
}

interface EstrategiaExportacao
{
    public function exportar(Relatorio $relatorio): void;
}

class ExportacaoPDF implements EstrategiaExportacao
{
    public function exportar(Relatorio $relatorio): void
    {
        echo 'Gerando arquivo .PDF do organograma...' . PHP_EOL;
    }
}

class ExportacaoCSV implements EstrategiaExportacao
{
    public function exportar(Relatorio $relatorio): void
    {
        echo 'Gerando arquivo .CSV da planilha de equipes...' . PHP_EOL;
    }
}

interface EstrategiaStatusAtribuicao
{
    public function aplicarStatus(Atribuicao $atribuicao): void;
}

class StatusConcluidaDireta implements EstrategiaStatusAtribuicao
{
    public function aplicarStatus(Atribuicao $atribuicao): void
    {
        $atribuicao->atualizarStatus('Concluída');
        echo 'Tarefa fechada automaticamente pelo Funcionário.' . PHP_EOL;
    }
}

class StatusAguardandoRevisao implements EstrategiaStatusAtribuicao
{
    public function aplicarStatus(Atribuicao $atribuicao): void
    {
        $atribuicao->atualizarStatus('Em Revisão');
        echo 'Tarefa enviada para a fila de aprovação do Gestor.' . PHP_EOL;
    }
}
