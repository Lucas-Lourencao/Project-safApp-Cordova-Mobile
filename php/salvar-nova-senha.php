<?php
require('conexao.php');

$email=$_POST['email'];
$senha=$_POST['senha'];
$senhaCriptografada = sha1($senha); 
$chave=$_POST['chave'];

if ($chave==''){
	echo "ACESSO RESTRITO";exit;
}else{
	
$puxar="SELECT * FROM `usuarios` where email='$email'";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM

if ($query==true){
	if ($quantos==1){
	
	$xconsulta = "UPDATE usuarios SET senha='$senhaCriptografada' WHERE email='$email'";
	$xquery = mysqli_query($conexao,$xconsulta) or die(mysqli_error());	
	
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