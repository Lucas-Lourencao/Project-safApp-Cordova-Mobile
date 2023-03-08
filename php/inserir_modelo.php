<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$nome = $_POST['nome'];
$idade = $_POST['idade'];
$mes = $_POST['mes'];
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA INSERIR NO BANCO
$inserir="INSERT INTO `clientes` (CampoNome,CampoIdade,CampoMes) values ('$nome','$idade','$mes')";
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