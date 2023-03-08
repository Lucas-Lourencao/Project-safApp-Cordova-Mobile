<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$hoje=date('d/m/Y');
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$municipio = $_POST['municipio'];
$bairro = $_POST['bairro'];
$rua = $_POST['rua'];
$situacaohuc = $_POST['situacaohuc'];
$abastecimentohuc = $_POST['abastecimentohuc'];
$referencia = $_POST['informacoes'];
$url_huc = $_POST['url_huc'];
$ref_1 = $_POST['ref_1'];
$ref_2 = $_POST['ref_2'];
$Chave = $_POST['Chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($Chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA INSERIR NO BANCO
$inserir="INSERT INTO `mapahuc` (datacadastro,latitude,longitude,municipio,bairro,rua,situacaohuc,abastecimentohuc,referencia,url_huc,ref_1,ref_2) values ('$hoje','$latitude','$longitude','$municipio','$bairro','$rua','$situacaohuc','$abastecimentohuc','$referencia','$url_huc','$ref_1','$ref_2')";
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