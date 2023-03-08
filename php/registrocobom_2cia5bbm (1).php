<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$Date = date('d/m/Y');
$Hour = date('H:i');
$Vtr = $_POST['Viatura'];
$Cautelamento = $_POST['Cautela'];
$Atendente = $_POST['Cobonista'];
$Motorista = $_POST['Condutor'];
$Local = $_POST['Destino'];
$Registros = $_POST['Alteracoes'];
$Chave = $_POST['Chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($Chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA INSERIR NO BANCO
$inserir="INSERT INTO `trafegocobom_2cia5bbm` (Data,Horario,Viatura,Cautela,Cobonista,Condutor,Destino,Alteracoes) values ('$Date','$Hour','$Vtr','$Cautelamento','$Atendente','$Motorista','$Local','$Registros')";
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