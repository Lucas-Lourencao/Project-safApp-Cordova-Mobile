<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

$nome=$_POST['nome'];
$chave=$_POST['chave'];

if ($chave==''){
	echo "ACESSO RESTRITO";exit;
}else{
	
$puxar="SELECT * FROM `clientes` where CampoNome LIKE '%$nome%'";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM

if ($query==true){
	if ($quantos>0){
		
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado.="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\">".$dados['CampoNome']."</div><br>
						  <div class=\"item-after\">".$dados['CampoIdade']."</div>
						  <div class=\"item-after\">".$dados['CampoMes']."</div>
						</div>
					  </div>
					</li>";
		}
		
	}else{ //É ZERO O NUMERO DE REGISTROS
		$resultado.="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\">Nenhum resultado encontrado</div>
						  <div class=\"item-after\"></div>
						</div>
					  </div>
					</li>";
	}
	
}else{
$resultado=0; //DEU PROBLEMA NO BANCO	
}
	
	echo $resultado;
	
}

?>