<?php

declare(strict_types=1);

require_once __DIR__ . '/../entidades/Relatorio.php';

abstract class GeradorRelatorioTemplate
{
    final public function gerarRelatorio(): Relatorio
    {
        $this->buscarDadosBanco();
        $this->formatarDados();
        return $this->construirRelatorioFinal();
    }

    abstract protected function buscarDadosBanco(): void;
    abstract protected function formatarDados(): void;

    private function construirRelatorioFinal(): Relatorio { return new Relatorio(); }
}
