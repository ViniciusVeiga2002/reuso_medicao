<?php

declare(strict_types=1);

class ProcessadorFolha
{
    private ?EstrategiaCalculoJornada $estrategia = null;

    public function setEstrategia(EstrategiaCalculoJornada $estrategia): void
    {
        $this->estrategia = $estrategia;
    }

    public function calcular(int $horas): int
    {
        if ($this->estrategia === null) {
            throw new LogicException('Defina a estratégia antes de calcular.');
        }
        return $this->estrategia->calcularHorasMes($horas);
    }
}
