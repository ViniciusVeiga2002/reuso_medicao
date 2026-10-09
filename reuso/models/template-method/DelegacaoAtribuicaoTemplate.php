<?php

declare(strict_types=1);

abstract class DelegacaoAtribuicaoTemplate
{
    final public function delegar(Gestor $gestor, Funcionario $funcionario, Atribuicao $atribuicao): void
    {
        if (!$this->validarSubordinacao($gestor, $funcionario)) {
            throw new RuntimeException('Erro: Funcionário não é subordinado direto.');
        }
        $this->salvarAtribuicaoBanco($atribuicao);
        $this->notificar($funcionario);
    }

    private function validarSubordinacao(Gestor $gestor, Funcionario $func): bool
    {
        // Identidade de objeto equivale a equals() sem sobrescrita no Java.
        return $func->getSuperior() !== null && $func->getSuperior() === $gestor;
    }

    private function salvarAtribuicaoBanco(Atribuicao $at): void { echo 'Tarefa salva.' . PHP_EOL; }
    abstract protected function notificar(Funcionario $funcionario): void;
}
