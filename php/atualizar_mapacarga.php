<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$id = $_POST['id'];

$Data = date('d/m/Y');
$campoOBM = $_POST['campoOBM'];
$campoSubOBM = $_POST['campoSubOBM'];
$campoNomemilitar = $_POST['campoNomemilitar'];

$campoAtividade = $_POST['campoAtividade'];
$campoCompartimento = $_POST['campoCompartimento'];
$campoMaterial = $_POST['campoMaterial'];
$campoConservacao = $_POST['campoConservacao'];
$campoNumeroItem = $_POST['campoNumeroItem'];
$campoQuantidade = $_POST['campoQuantidade'];
$campoAlteracoes = $_POST['campoAlteracoes'];

$Chave = $_POST['Chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($Chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
// COMANDO SQL
$consulta = "UPDATE `mapacargavtr_2cia5bbm` SET compartimento='$campoCompartimento',numeracao='$campoNumeroItem',material_equipamento='$campoMaterial',conservacao='$campoConservacao',quantidade='$campoQuantidade',alteracoes='$campoAlteracoes',unidade='$campoOBM',subunidade='$campoSubOBM',atualizacao='$campoNomemilitar',data_atualizacao='$Data' WHERE id='$id'";

$query = mysqli_query($conexao,$consulta) or die(mysqli_error());

if ($query == true) {
	
	$resultado = 1;
	
} else {
	$resultado = 0;
}
	
	echo $resultado;
	
}

?>