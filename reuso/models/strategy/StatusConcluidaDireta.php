<?php

declare(strict_types=1);

require_once __DIR__ . '/EstrategiaStatusAtribuicao.php';

class StatusConcluidaDireta implements EstrategiaStatusAtribuicao
{
    public function aplicarStatus(Atribuicao $atribuicao): void
    {
        $atribuicao->atualizarStatus('Concluída');
        echo 'Tarefa fechada automaticamente pelo Funcionário.' . PHP_EOL;
    }
}
