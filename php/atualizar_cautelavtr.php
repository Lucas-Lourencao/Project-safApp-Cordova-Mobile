<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$id = $_POST['id'];

$Data_atualizacao = $_POST['campoData_atualizacao'];
$Hora_atualizacao = $_POST['campoHora_atualizacao'];
$Vtr = $_POST['campoViatura'];
$Cautelamento = $_POST['campoCautela'];
$Atendente = $_POST['campoCobonista'];
$Motorista = $_POST['campoCondutor'];
$Local = $_POST['campoDestino'];
$Registros = $_POST['campoAlteracoes'];
$unidade = $_POST['unidade'];
$subunidade = $_POST['subunidade'];
$atualizacao = $_POST['campoAtualizacao'];

$Date = date('d/m/Y');
$chave = $_POST['chave'];

//CONVERTER A DATA PARA FORMATO CERTO

$partesData = explode("-", $Data_atualizacao);

//ANO
$partesData[0];

//MES
$partesData[1];

//DIA
$partesData[2];

$dataFormatada = $partesData[2] . "/". $partesData[1] ."/". $partesData[0];


//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$consulta = "UPDATE `trafegocobom_2cia5bbm` SET Data='$dataFormatada', Horario='$Hora_atualizacao',Viatura='$Vtr', Cautela='$Cautelamento',Cobonista='$Atendente', Condutor='$Motorista',Destino='$Local', Alteracoes='$Registros', unidade='$unidade',subunidade='$subunidade', data_atualizacao='$Date', atualizacao='$atualizacao' WHERE id='$id'";
$query = mysqli_query($conexao,$consulta) or die(mysqli_error());

if ($query == true) {
	
	$resultado = 1;
	
} else {
	$resultado = 0;
}
	
	echo $resultado;
	
}

?>