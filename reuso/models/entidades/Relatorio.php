<?php

declare(strict_types=1);

class Relatorio
{
    private ?string $idRelatorio = null;
    private ?string $tipo = null;
    private ?DateTimeInterface $dataGeracao = null;
    private ?string $conteudoGerado = null;

    public function exportar(string $formato): void {}
}
