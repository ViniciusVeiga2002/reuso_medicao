<?php

declare(strict_types=1);

require_once __DIR__ . '/EstrategiaCalculoJornada.php';

class CalculoCLT implements EstrategiaCalculoJornada
{
    public function calcularHorasMes(int $horasSemanais): int
    {
        return $horasSemanais * 5; // Regra original preservada.
    }
}
