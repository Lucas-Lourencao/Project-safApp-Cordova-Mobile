<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$id = $_POST['id'];
$Viatura = $_POST['campoVtr'];
$Destino = $_POST['campoDestino'];
$Saida = $_POST['campoHorasaida'];
$Kmsaida = $_POST['campoKmsaida'];
$Chegada = $_POST['campoHorachegada'];
$Kmchegada = $_POST['campoKmchegada'];
$Alteracoes = $_POST['campoAlteracoes'];
$obm_trafego = $_POST['obm_trafego'];
$subobm_trafego = $_POST['subobm_trafego'];
$Atualizacao_Militar = $_POST['campoAtualizaNomemilitar'];

$Data_alterada = $_POST['campoData'];

//CONVERTER A DATA PARA FORMATO CERTO

$partesData = explode("-", $Data_alterada);

//ANO
$partesData[0];

//MES
$partesData[1];

//DIA
$partesData[2];

$dataFormatada = $partesData[2] . "/". $partesData[1] ."/". $partesData[0];

$Chave = $_POST['Chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($Chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
// COMANDO SQL
$consulta = "UPDATE `trafegoviaturas` SET VIATURA='$Viatura', DESTINO='$Destino',SAIDA='$Saida', KMSAIDA='$Kmsaida', CHEGADA='$Chegada', KMCHEGADA='$Kmchegada', ALTERACOES='$Alteracoes', ATUALIZACAO_TRAFEGO='$Atualizacao_Militar',OBM_MILITAR='$obm_trafego',SUBOBM_MILITAR='$subobm_trafego', DATA_ATUALIZACAO='$dataFormatada' WHERE ID='$id'";
$query = mysqli_query($conexao,$consulta) or die(mysqli_error());

if ($query == true) {
	
	$resultado = 1;
	
} else {
	$resultado = 0;
}
	
	echo $resultado;
	
}

?>