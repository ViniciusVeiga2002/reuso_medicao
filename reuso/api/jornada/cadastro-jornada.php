<?php

require_once __DIR__ . '/../../config/Database.php';

    header('Content-Type: text/plain; charset=utf-8');
    
    $tipo_vinculo = $_POST['tipo_vinculo'] ?? '';
    $turno = $_POST['turno'] ?? '';
    $carga_horaria = $_POST['carga_horaria'] ?? '';
    
    $conexao = Database::conectar();
    $conexao = Database::conectar();
    $sql = "INSERT INTO jornada (tipo_vinculo, turno, carga_horaria) VALUES (:tipo_vinculo, :turno, :carga_horaria)";

    $consulta = $conexao->prepare($sql);
    $consulta->execute([
        ':tipo_vinculo' => $tipo_vinculo,
        ':turno' => $turno,
        ':carga_horaria' => $carga_horaria
    ]);



    echo "Jornada " . $tipo_vinculo . " inserida com sucesso!";
