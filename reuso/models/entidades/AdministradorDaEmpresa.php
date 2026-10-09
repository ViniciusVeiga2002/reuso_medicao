<?php

declare(strict_types=1);

require_once __DIR__ . '/Usuario.php';

class AdministradorDaEmpresa extends Usuario
{
    private ?string $nivelPermissaoGlobal = null;

    public function configurarWhiteLabel(string $logo, string $cor): void {}
    public function gerenciarDepartamento(): void {}
    public function gerarRelatorioGeral(): void {}
}
