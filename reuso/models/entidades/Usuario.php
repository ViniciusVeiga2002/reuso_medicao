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
