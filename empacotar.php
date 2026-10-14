<?php

$origem = __DIR__ . '/reuso_medicao-main/reuso';
$destino = __DIR__ . '/reuso.phar';

if (!is_dir($origem)) {
    throw new RuntimeException('Pasta do projeto não encontrada.');
}

if (file_exists($destino)) {
    throw new RuntimeException(
        'reuso.phar já existe. Renomeie o pacote antes de gerar outro.'
    );
}

$phar = new Phar($destino);
$phar->startBuffering();

// Empacota apenas estas pastas do projeto.
$pastas = [
    'api',
    'assets',
    'config',
    'database',
    'models',
    'view',
];

foreach ($pastas as $pasta) {
    $diretorio = $origem . '/' . $pasta;

    $arquivos = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator(
            $diretorio,
            FilesystemIterator::SKIP_DOTS
        )
    );

    foreach ($arquivos as $arquivo) {
        if (!$arquivo->isFile()) {
            continue;
        }

        $caminho = $arquivo->getPathname();
        $relativo = substr($caminho, strlen($origem) + 1);
        $relativo = str_replace('\\', '/', $relativo);

        $phar->addFile($caminho, $relativo);
    }
}

$phar->setStub(
    "<?php echo 'Extraia este pacote para executar o site.' . PHP_EOL; __HALT_COMPILER();"
);

$phar->stopBuffering();

echo "Pacote criado: {$destino}" . PHP_EOL;