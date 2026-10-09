<?php

declare(strict_types=1);

require_once __DIR__ . '/EstrategiaExportacao.php';

class ExportacaoPDF implements EstrategiaExportacao
{
    public function exportar(Relatorio $relatorio): void
    {
        echo 'Gerando arquivo .PDF do organograma...' . PHP_EOL;
    }
}
