<?php
require_once __DIR__ . '/config/Database.php';

    header('Content-Type: text/plain; charset=utf-8');
    $nome = $_POST['nome'] ?? '';

    $conexao = Database::conectar();
    $sql = "INSERT INTO departamento (nome) VALUES (:nome)";

    $consulta = $conexao->prepare($sql);
    $consulta->execute([':nome' => $nome]);

    echo "Departamento " . $nome . " inserido com sucesso!";
    
