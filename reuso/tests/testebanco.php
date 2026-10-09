<?php
    require_once __DIR__ . '/../config/Database.php';

    $conexao = Database::conectar();

    $sql = "INSERT INTO departamento (nome) VALUES (:nome)";

    $consulta = $conexao->prepare($sql);

    $consulta->execute([':nome' => 'Departamento de Teste3']);

    echo "Departamento inserido com sucesso!";

