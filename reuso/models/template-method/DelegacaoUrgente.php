<?php

declare(strict_types=1);

require_once __DIR__ . '/DelegacaoAtribuicaoTemplate.php';

class DelegacaoUrgente extends DelegacaoAtribuicaoTemplate
{
    protected function notificar(Funcionario $funcionario): void
    {
        echo 'Enviando SMS e Push Notification de alta prioridade.' . PHP_EOL;
    }
}
