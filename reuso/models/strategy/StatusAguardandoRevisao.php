<?php

declare(strict_types=1);

require_once __DIR__ . '/EstrategiaStatusAtribuicao.php';

class StatusAguardandoRevisao implements EstrategiaStatusAtribuicao
{
    public function aplicarStatus(Atribuicao $atribuicao): void
    {
        $atribuicao->atualizarStatus('Em Revisão');
        echo 'Tarefa enviada para a fila de aprovação do Gestor.' . PHP_EOL;
    }
}
