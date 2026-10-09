<?php

declare(strict_types=1);

class GerenciadorSessao
{
    private static ?GerenciadorSessao $instancia = null;
    private ?Usuario $usuarioLogado = null;

    private function __construct() {}

    public static function getInstancia(): GerenciadorSessao
    {
        if (self::$instancia === null) {
            self::$instancia = new GerenciadorSessao();
        }
        return self::$instancia;
    }

    public function iniciarSessao(Usuario $usuario): void { $this->usuarioLogado = $usuario; }
    public function getUsuarioLogado(): ?Usuario { return $this->usuarioLogado; }
}
