<?php
require_once __DIR__ . '/../../config/Database.php';

header('Content-Type: text/plain; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Use POST para deletar.');
}

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
if (!$id || $id < 1) {
    http_response_code(400);
    exit('Informe o ID do departamento.');
}

try {
    $conexao = Database::conectar();
    $sql = 'DELETE FROM departamento WHERE id = :id';
    $consulta = $conexao->prepare($sql);
    $consulta->execute([':id' => $id]);
    echo 'Departamento deletado com sucesso!';
} catch (PDOException $erro) {
    http_response_code(400);
    echo 'Não foi possível deletar. O departamento pode estar vinculado a uma equipe.';
}
