<?php

declare(strict_types=1);

abstract class AutenticacaoTemplate
{
    final public function realizarLogin(string $email, string $senha): void
    {
        if ($this->validarCredenciais($email, $senha)) {
            $this->registrarLogAcesso();
            $this->redirecionarPainel();
        }
    }

    // Placeholder preservado: aceita qualquer email e senha.
    private function validarCredenciais(string $email, string $senha): bool { return true; }
    private function registrarLogAcesso(): void { echo 'Log registrado.' . PHP_EOL; }
    abstract protected function redirecionarPainel(): void;
}
