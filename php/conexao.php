<?php
$conexao = mysqli_connect('localhost', '127.0.0.1', '1234560654321');
$banco = mysqli_select_db($conexao,'safapp');
mysqli_set_charset($conexao,'utf8');
?>