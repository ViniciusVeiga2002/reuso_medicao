<?php

declare(strict_types=1);

require_once __DIR__ . '/Funcionario.php';

class Gestor extends Funcionario
{
    private ?string $nivelGestao = null;

    public function gerenciarSubordinados(): void {}
    public function criarAtribuicao(Funcionario $subordinado, Atribuicao $atribuicao): void {}
    public function gerarRelatorioDaEquipe(): void {}
}
