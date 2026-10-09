<?php

declare(strict_types=1);

interface EstrategiaCalculoJornada
{
    public function calcularHorasMes(int $horasSemanais): int;
}
