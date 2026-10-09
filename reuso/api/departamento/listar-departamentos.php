<?php
require_once __DIR__ . '/../../config/Database.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $conexao = Database::conectar();
    $consulta = $conexao->query('SELECT id, nome, criado_em FROM departamento ORDER BY id');
    echo json_encode($consulta->fetchAll());
} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode(['erro' => 'Não foi possível carregar os departamentos.']);
}
