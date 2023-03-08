<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$Data = date('d/m/Y');

$area_carga = $_POST['area_carga'];

$compartimento_carga = $_POST['compartimento_carga'];

$unidade = $_POST['unidade'];

$subunidade = $_POST['subunidade'];

$militar = $_POST['militar'];

$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA INSERIR NO BANCO
$inserir="INSERT INTO `cadastro_compartimento_vtr` (area_carga,compartimento,unidade,subunidade,militar_cadastro) values ('$area_carga','$compartimento_carga','$unidade','$subunidade','$militar')";
$query = mysqli_query($conexao,$inserir)or die(mysqli_error());	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR
if ($query == true) {
	$resultado=1; //RESULTADO 1 SE EXECUTOU
}else{
	$resultado=0; //RESULTADO 0 SE NÃO EXECUTOU
}

echo $resultado;

}

?>