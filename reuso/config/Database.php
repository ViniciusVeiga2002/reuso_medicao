<?php

class Database
{
    private static ?PDO $conexao = null;

    public static function conectar(): PDO
    {
        if (self::$conexao !== null) {
            return self::$conexao;
        }

        $configuracoes = parse_ini_file(__DIR__ . '/../.env');

        if ($configuracoes === false) {
            throw new RuntimeException('Arquivo .env não encontrado.');
        }

        $dsn = sprintf(
            'pgsql:host=%s;port=%s;dbname=%s;sslmode=require',
            $configuracoes['DB_HOST'],
            $configuracoes['DB_PORT'],
            $configuracoes['DB_NAME']
        );

        self::$conexao = new PDO(
            $dsn,
            $configuracoes['DB_USER'],
            $configuracoes['DB_PASSWORD'],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );

        return self::$conexao;
    }
}

