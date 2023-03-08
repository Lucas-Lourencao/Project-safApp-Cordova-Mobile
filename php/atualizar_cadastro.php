<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$id = $_POST['id'];
$nome = $_POST['nome'];
$patente = $_POST['patente'];
$nomeguerra = $_POST['nomeguerra'];
$funcional = $_POST['funcional'];
$obm = $_POST['obm'];
$subunidade = $_POST['subobm'];
$perfil = $_POST['perfil'];
$militar = $_POST['militar'];
$e_mail = $_POST['e_mail'];
$Data = date('d/m/Y');
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
// COMANDO SQL
$consulta = "UPDATE `usuarios` SET nome='$nome',patente='$patente',nome_guerra='$nomeguerra',funcional='$funcional',obm='$obm',subunidade='$subunidade',perfil='$perfil',atualizacao_cadastro='$militar',data_atualizacao_cadastro='$Data',email='$e_mail' WHERE id='$id'";
$query = mysqli_query($conexao,$consulta) or die(mysqli_error());

if ($query == true) {
	
	$resultado = 1;
	
} else {
	$resultado = 0;
}
	
	echo $resultado;
	
}

?>