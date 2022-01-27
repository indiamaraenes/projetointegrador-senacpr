<?php include_once "database.php"; ?>
<html>

<body>
    <?php
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $mensagem = $_POST['mensagem'];

    $conexao = mysqli_connect($servidor, $usuario, $senha, $database);
    mysqli_select_db($conexao, '$database');
    $sql="INSERT INTO formulario (nome, email, telefone, mensagem) VALUES ('$nome', '$email', '$telefone', '$mensagem')";

    if(mysqli_query($conexao, $sql)){
        echo "Dados inseridos com sucesso!";
    }else{
        echo ("Erro ao inserir os dados!".mysqli_connect_error());
    }
    mysqli_close($conexao);

    ?>
</body>

</html>