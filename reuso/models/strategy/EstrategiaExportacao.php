<?php

declare(strict_types=1);

interface EstrategiaExportacao
{
    public function exportar(Relatorio $relatorio): void;
}
