<?php
$servidor = "";
$usuario = "";
$database = "";
$senha = "";
$conexao = mysqli_connect($servidor, $usuario, $senha, $database);
if (!$conexao) {
    die("Erro de conexão: " . mysqli_connect_error());
}else{
    echo "Conexão realizada com sucesso!";
}
?>
