<?php

declare(strict_types=1);

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
