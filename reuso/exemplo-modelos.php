<?php

declare(strict_types=1);

require_once __DIR__ . '/modelos.php';

$folha = new ProcessadorFolha();
$folha->setEstrategia(new CalculoCLT());
echo 'CLT: ' . $folha->calcular(40) . ' horas' . PHP_EOL;
$folha->setEstrategia(new CalculoPJ());
echo 'PJ: ' . $folha->calcular(40) . ' horas' . PHP_EOL;

$gestor = new Gestor();
$funcionario = new Funcionario();
$funcionario->setSuperior($gestor);
$atribuicao = new Atribuicao();
$atribuicao->alterarPrazo(new DateTimeImmutable('2026-12-01'));
(new DelegacaoUrgente())->delegar($gestor, $funcionario, $atribuicao);
(new StatusAguardandoRevisao())->aplicarStatus($atribuicao);
(new StatusConcluidaDireta())->aplicarStatus($atribuicao);

GerenciadorSessao::getInstancia()->iniciarSessao($funcionario);
ConfiguracaoWhiteLabel::getInstancia()->aplicarIdentidade('logo.png', '#008000');

$relatorio = (new RelatorioCargaHorariaEquipe())->gerarRelatorio();
(new ExportacaoCSV())->exportar($relatorio);

// Estas mensagens são simulações, como no Java; não há persistência ou exportação real.
