<?php

declare(strict_types=1);

class Cargo
{
    private ?string $idCargo = null;
    private ?string $titulo = null;
    private ?string $nivel = null; // júnior, pleno, sênior

    public function atualizarNivel(string $novoNivel): void {}
    public function editarTitulo(string $novoTitulo): void {}
}
