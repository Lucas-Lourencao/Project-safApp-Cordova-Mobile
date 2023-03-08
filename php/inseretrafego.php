<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$Data = date('d/m/Y');
$Viatura = $_POST['Viatura'];
$Militar = $_POST['Militar'];
$Funcional = $_POST['Funcional'];
$Destino = $_POST['Destino'];
$Saida = $_POST['Saida'];
$Kmsaida = $_POST['Kmsaida'];
$Chegada = $_POST['Chegada'];
$Kmchegada = $_POST['Kmchegada'];
$Alteracoes = $_POST['Alteracoes'];
$obm_trafego = $_POST['obm_trafego'];

$Chave = $_POST['Chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($Chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA INSERIR NO BANCO
$inserir="INSERT INTO `trafegoviaturas` (DATA,VIATURA,MILITAR,FUNCIONAL,DESTINO,SAIDA,KMSAIDA,CHEGADA,KMCHEGADA,ALTERACOES,OBM_MILITAR) values ('$Data','$Viatura','$Militar','$Funcional','$Destino','$Saida','$Kmsaida','$Chegada','$Kmchegada','$Alteracoes','$obm_trafego')";
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