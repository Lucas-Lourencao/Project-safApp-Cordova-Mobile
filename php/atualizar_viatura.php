<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$id = $_POST['id'];
$viatura = $_POST['prefixo'];
$tipologia = $_POST['tipologia'];
$obm = $_POST['unidade'];
$subunidade = $_POST['subunidade'];
$militar = $_POST['militar'];
$Data = date('d/m/Y');
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
// COMANDO SQL
$consulta = "UPDATE `cadastro_viaturas` SET viatura='$viatura',tipologia='$tipologia',unidade='$obm',subunidade='$subunidade',atualizacao_vtr='$militar',data_atualizacao_vtr='$Data' WHERE id='$id'";
$query = mysqli_query($conexao,$consulta) or die(mysqli_error());

if ($query == true) {
	
	$resultado = 1;
	
} else {
	$resultado = 0;
}
	
	echo $resultado;
	
}

?>