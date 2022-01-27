<?php
$servidor = "sql300.byetcluster.com";
$usuario = "epiz_30853110";
$database = "epiz_30853110_projeto";
$senha = "HRVfBZQFQktb";
$conexao = mysqli_connect($servidor, $usuario, $senha, $database);
if (!$conexao) {
    die("Erro de conexão: " . mysqli_connect_error());
}else{
    echo "Conexão realizada com sucesso!";
}
?>