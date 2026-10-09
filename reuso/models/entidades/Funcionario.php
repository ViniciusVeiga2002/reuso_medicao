<?php

declare(strict_types=1);

require_once __DIR__ . '/Usuario.php';

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
