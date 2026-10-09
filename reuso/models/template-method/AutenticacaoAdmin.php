<?php

declare(strict_types=1);

require_once __DIR__ . '/AutenticacaoTemplate.php';

class AutenticacaoAdmin extends AutenticacaoTemplate
{
    protected function redirecionarPainel(): void
    {
        echo 'Redirecionando para Dashboard de Configuração Global.' . PHP_EOL;
    }
}
