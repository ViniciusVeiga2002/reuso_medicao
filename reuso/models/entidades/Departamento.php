<?php

declare(strict_types=1);

class Departamento
{
    private ?string $idDepartamento = null;
    private ?string $nome = null;
    /** @var list<Equipe> */
    private array $equipes = [];

    public function adicionarEquipe(Equipe $equipe): void {}
    public function removerEquipe(Equipe $equipe): void {}
}
