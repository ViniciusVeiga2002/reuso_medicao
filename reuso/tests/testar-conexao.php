<?php

require_once __DIR__ . '/../config/Database.php';

try {
    Database::conectar();
    echo 'Conexão com o Supabase realizada com sucesso.';
} catch (Throwable $erro) {
    echo 'Erro ao conectar com o Supabase: ' . $erro->getMessage();
}

