<?php

declare(strict_types=1);

interface EstrategiaStatusAtribuicao
{
    public function aplicarStatus(Atribuicao $atribuicao): void;
}
