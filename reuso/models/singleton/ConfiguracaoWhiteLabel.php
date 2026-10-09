<?php

declare(strict_types=1);

class ConfiguracaoWhiteLabel
{
    private static ?ConfiguracaoWhiteLabel $instancia = null;
    private ?string $logoUrl = null;
    private string $corPrimaria;

    private function __construct() { $this->corPrimaria = '#000000'; }

    public static function getInstancia(): ConfiguracaoWhiteLabel
    {
        if (self::$instancia === null) {
            self::$instancia = new ConfiguracaoWhiteLabel();
        }
        return self::$instancia;
    }

    public function aplicarIdentidade(string $logo, string $cor): void
    {
        $this->logoUrl = $logo;
        $this->corPrimaria = $cor;
    }
}
