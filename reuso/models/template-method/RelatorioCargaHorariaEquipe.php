<?php

declare(strict_types=1);

require_once __DIR__ . '/GeradorRelatorioTemplate.php';

class RelatorioCargaHorariaEquipe extends GeradorRelatorioTemplate
{
    protected function buscarDadosBanco(): void
    {
        echo 'Buscando carga horária dos funcionários da equipe...' . PHP_EOL;
    }

    protected function formatarDados(): void
    {
        echo 'Formatando em tabela de horas por turno.' . PHP_EOL;
    }
}
