<?php

declare(strict_types=1);

// Carrega as entidades e os padrões de projeto separados por pasta.

require_once __DIR__ . '/entidades/Usuario.php';
require_once __DIR__ . '/entidades/AdministradorDaEmpresa.php';
require_once __DIR__ . '/entidades/Funcionario.php';
require_once __DIR__ . '/entidades/Gestor.php';
require_once __DIR__ . '/entidades/Departamento.php';
require_once __DIR__ . '/entidades/Equipe.php';
require_once __DIR__ . '/entidades/Cargo.php';
require_once __DIR__ . '/entidades/JornadaDeTrabalho.php';
require_once __DIR__ . '/entidades/Atribuicao.php';
require_once __DIR__ . '/entidades/Relatorio.php';
require_once __DIR__ . '/singleton/ConfiguracaoWhiteLabel.php';
require_once __DIR__ . '/singleton/GerenciadorSessao.php';
require_once __DIR__ . '/template-method/GeradorRelatorioTemplate.php';
require_once __DIR__ . '/template-method/RelatorioCargaHorariaEquipe.php';
require_once __DIR__ . '/template-method/AutenticacaoTemplate.php';
require_once __DIR__ . '/template-method/AutenticacaoAdmin.php';
require_once __DIR__ . '/template-method/DelegacaoAtribuicaoTemplate.php';
require_once __DIR__ . '/template-method/DelegacaoUrgente.php';
require_once __DIR__ . '/strategy/EstrategiaCalculoJornada.php';
require_once __DIR__ . '/strategy/CalculoCLT.php';
require_once __DIR__ . '/strategy/CalculoPJ.php';
require_once __DIR__ . '/strategy/ProcessadorFolha.php';
require_once __DIR__ . '/strategy/EstrategiaExportacao.php';
require_once __DIR__ . '/strategy/ExportacaoPDF.php';
require_once __DIR__ . '/strategy/ExportacaoCSV.php';
require_once __DIR__ . '/strategy/EstrategiaStatusAtribuicao.php';
require_once __DIR__ . '/strategy/StatusConcluidaDireta.php';
require_once __DIR__ . '/strategy/StatusAguardandoRevisao.php';
