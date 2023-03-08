<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

$nome=$_POST['nome'];
$chave=$_POST['chave'];

if ($chave==''){
	echo "ACESSO RESTRITO";exit;
}else{
	
$puxar="SELECT * FROM `cadastro_viaturas` where viatura LIKE '%$nome%'";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM

if ($query==true){
	if ($quantos>0){
		
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado.="<li>
					  <a href=\"#\" id=\"id_".$dados['id']."\" onclick=\"recebeDados(".$dados['id'].")\" class=\"item-link item-content\">
						<div style=\"text-transform:uppercase\" class=\"item-inner item-cell\">
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"viatura_".$dados['id']."\">".$dados['viatura']."</div>
							  <div class=\"item-cell\" id=\"tipologia_".$dados['id']."\">".$dados['tipologia']."</div>
							  <div class=\"item-cell\" id=\"unidade_".$dados['id']."\">".$dados['unidade']."</div>
							</div>
						</div>
					  </a>
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