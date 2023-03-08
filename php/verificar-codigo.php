<?php
require('conexaoadmciabm.php');

$email=$_POST['email'];
$codigo=$_POST['codigo'];
$chave=$_POST['chave'];

if ($chave==''){
	echo "ACESSO RESTRITO";exit;
}else{
	
$puxar="SELECT * FROM `usuarios` where email='$email' and recuperaSenha='$codigo'";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM

if ($query==true){
	if ($quantos==1){
		
	$resultado=0; //BELEZA O CODIGO ESTAVA CERTO	
		
		
	}else{ //É ZERO O NUMERO DE REGISTROS - CÓDIGO ERRADO
		$resultado=1;
	}
	
}else{
$resultado=2; //DEU PROBLEMA NO BANCO	
}
	
	echo $resultado;
	
}

?>