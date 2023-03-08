<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$viatura = $_POST['viatura'];
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `trafego_vtr_op_2cia5bbm` where VIATURA='$viatura' ORDER BY `ID` DESC LIMIT 0,1";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="".$dados['KMCHEGADA']."";
		}
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado.="KM Saída não encontrado!";
	}
	
}else{ 
	$resultado =0; //DEU ALGUM PROBLEMA
}	

echo $resultado;

}

?>