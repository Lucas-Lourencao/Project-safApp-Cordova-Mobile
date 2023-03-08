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
$Chegada = date('H:i');
$Kmchegada = $_POST['Kmchegada'];
$Alteracoes = $_POST['Alteracoes'];
$obm_trafego = $_POST['obm_trafego'];
$subobm_trafego = $_POST['subobm_trafego'];

//VALORES ENVIADOS PELO APP - Backup
$Data_bkup = date('d/m/Y');
$Viatura_bkup = $_POST['Viatura_bkup'];
$Militar_bkup = $_POST['Militar_bkup'];
$Funcional_bkup = $_POST['Funcional_bkup'];
$Destino_bkup = $_POST['Destino_bkup'];
$Saida_bkup = $_POST['Saida_bkup'];
$Kmsaida_bkup = $_POST['Kmsaida_bkup'];
$Chegada_bkup = date('H:i');
$Kmchegada_bkup = $_POST['Kmchegada_bkup'];
$Alteracoes_bkup = $_POST['Alteracoes_bkup'];
$obm_trafego_bkup = $_POST['obm_trafego_bkup'];
$subobm_trafego_bkup = $_POST['subobm_trafego_bkup'];

$Chave = $_POST['Chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($Chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA INSERIR NO BANCO
$inserir="INSERT INTO `trafegoviaturas` (DATA,VIATURA,MILITAR,FUNCIONAL,DESTINO,SAIDA,KMSAIDA,CHEGADA,KMCHEGADA,ALTERACOES,OBM_MILITAR,SUBOBM_MILITAR, DATA_BKUP,VIATURA_BKUP,MILITAR_BKUP,FUNCIONAL_BKUP,DESTINO_BKUP,SAIDA_BKUP,KMSAIDA_BKUP,CHEGADA_BKUP,KMCHEGADA_BKUP,ALTERACOES_BKUP,OBM_MILITAR_BKUP,SUBOBM_MILITAR_BKUP) values ('$Data','$Viatura','$Militar','$Funcional','$Destino','$Saida','$Kmsaida','$Chegada','$Kmchegada','$Alteracoes','$obm_trafego','$subobm_trafego','$Data_bkup','$Viatura_bkup','$Militar_bkup','$Funcional_bkup','$Destino_bkup','$Saida_bkup','$Kmsaida_bkup','$Chegada_bkup','$Kmchegada_bkup','$Alteracoes_bkup','$obm_trafego_bkup','$subobm_trafego_bkup')";
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