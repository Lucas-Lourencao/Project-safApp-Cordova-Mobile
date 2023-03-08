<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$id = $_POST['id'];
$nome = $_POST['nome'];
$idade = $_POST['idade'];
$mes = $_POST['mes'];
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
// COMANDO SQL
$consulta = "UPDATE `clientes` SET CampoNome='$nome',CampoIdade='$idade',CampoMes='$mes' WHERE id='$id'";
$query = mysqli_query($conexao,$consulta) or die(mysqli_error());

if ($query == true) {
	
	$resultado = 1;
	
} else {
	$resultado = 0;
}
	
	echo $resultado;
	
}

?>