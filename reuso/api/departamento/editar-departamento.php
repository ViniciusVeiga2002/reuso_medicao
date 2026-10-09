<?php
require_once __DIR__ . '/../../config/Database.php';

header('Content-Type: text/plain; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Use POST para editar.');
}

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$nome = trim($_POST['nome'] ?? '');
if (!$id || $id < 1 || $nome === '') {
    http_response_code(400);
    exit('Informe o ID e o nome do departamento.');
}

try {
    $conexao = Database::conectar();
    $sql = 'UPDATE departamento SET nome = :nome WHERE id = :id';
    $consulta = $conexao->prepare($sql);
    $consulta->execute([':nome' => $nome, ':id' => $id]);
    echo 'Departamento atualizado com sucesso!';
} catch (PDOException $erro) {
    http_response_code(400);
    echo 'Não foi possível editar. Verifique se o nome já está cadastrado.';
}
