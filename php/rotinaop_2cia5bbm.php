<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
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
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA INSERIR NO BANCO
$inserir="INSERT INTO `mapacargavtr_2cia5bbm` (atividade,compartimento,numeracao,material_equipamento,conservacao,quantidade,alteracoes,unidade,subunidade,cadastrante,data_cadastro) values ('$campoAtividade','$campoCompartimento','$campoNumeroItem','$campoMaterial','$campoConservacao','$campoQuantidade','$campoAlteracoes','$campoOBM','$campoSubOBM','$campoNomemilitar','$Data')";
$query = mysqli_query($conexao,$inserir)or die(mysqli_error());	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR
if ($query == true) {
	$resultado=1; //RESULTADO 1 SE EXECUTOU
}else{
	$resultado=0; //RESULTADO 0 SE NÃO EXECUTOU
}

//RESPOSTA DO SERVIDOR PARA O APLICATIVO
echo $resultado;

}

?>