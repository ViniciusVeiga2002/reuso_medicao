<?php

declare(strict_types=1);

class JornadaDeTrabalho
{
    private ?string $idJornada = null;
    private ?string $tipoDeVinculo = null;
    private ?string $turno = null;
    private int $cargaHoraria = 0;

    public function calcularHorasMensais(): int { return $this->cargaHoraria * 4; }
}
