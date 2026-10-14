<?php

$destino = __DIR__ . '/reuso-extraido';

if (file_exists($destino)) {
    throw new RuntimeException(
        'A pasta reuso-extraido já existe. Escolha outro destino.'
    );
}

$phar = new Phar(__DIR__ . '/reuso.phar');
$phar->extractTo($destino);

echo "Projeto extraído para: {$destino}" . PHP_EOL;