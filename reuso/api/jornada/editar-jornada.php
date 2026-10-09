<?php
require_once __DIR__ . '/../../config/Database.php';

header('Content-Type: text/plain; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Use POST para editar.');
}

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$tipo_vinculo = trim($_POST['tipo_vinculo'] ?? '');
$turno = trim($_POST['turno'] ?? '');
$carga_horaria = filter_input(INPUT_POST, 'carga_horaria', FILTER_VALIDATE_INT);
if (!$id || $id < 1 || $tipo_vinculo === '' || $turno === '' || !$carga_horaria || $carga_horaria < 1 || $carga_horaria > 168) {
    http_response_code(400);
    exit('Informe o ID, o vínculo, o turno e a carga horária entre 1 e 168 horas.');
}

try {
    $conexao = Database::conectar();
    $sql = 'UPDATE jornada SET tipo_vinculo = :tipo_vinculo, turno = :turno, carga_horaria = :carga_horaria WHERE id = :id';
    $consulta = $conexao->prepare($sql);
    $consulta->execute([
        ':tipo_vinculo' => $tipo_vinculo,
        ':turno' => $turno,
        ':carga_horaria' => $carga_horaria,
        ':id' => $id
    ]);
    echo 'Jornada atualizada com sucesso!';
} catch (PDOException $erro) {
    http_response_code(400);
    echo 'Não foi possível editar a jornada. Verifique os campos informados.';
}
