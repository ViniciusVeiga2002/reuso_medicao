<?php

declare(strict_types=1);

require_once __DIR__ . '/EstrategiaExportacao.php';

class ExportacaoCSV implements EstrategiaExportacao
{
    public function exportar(Relatorio $relatorio): void
    {
        echo 'Gerando arquivo .CSV da planilha de equipes...' . PHP_EOL;
    }
}
