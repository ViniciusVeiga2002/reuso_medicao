<?php

declare(strict_types=1);

class Atribuicao
{
    private ?string $idAtribuicao = null;
    private ?string $descricao = null;
    private ?string $status = null; // pendente, concluída
    private ?DateTimeInterface $prazo = null;
    private ?Funcionario $executor = null;
    private ?Gestor $delegador = null;

    public function atualizarStatus(string $novoStatus): void { $this->status = $novoStatus; }
    public function alterarPrazo(DateTimeInterface $novoPrazo): void { $this->prazo = $novoPrazo; }
}
