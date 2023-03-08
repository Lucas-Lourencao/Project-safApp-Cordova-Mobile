<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$chave = $_POST['Chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `Rotinaop_2cia5bbm` ORDER BY `ID` DESC LIMIT 0,30";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado.="<li style=\"border-top:2px solid gray;border-bottom:2px solid gray;>
					  <a href=\"#\" id=\"recebeDados\" class=\"item-link item-content\">
						<div class=\"item-inner item-cell\">
							<div style=\"background:linear-gradient(to right, #e52d27, #b31217);color:#ffffff;\">
								<div class=\"title\"><center><b>REGISTRO DE ALTERAÇÕES 2ªCIA/5°BBM</b></center></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"VIATURA_".$dados['id']."\"><b>Militar:</b> ".$dados['Militar']."</div>
							  <div class=\"item-cell\" id=\"DATA_".$dados['id']."\"><b>".$dados['DATA']."</b></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"MILITAR_".$dados['id']."\"><b>Atividade:</b> ".$dados['Atividade']."</div>
							  <div class=\"item-cell\" id=\"DESTINO_".$dados['id']."\"><b>Equipe:</b> ".$dados['Equipe']."</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"ALTERACOES_".$dados['id']."\"><b>Alteracões:</b> ".$dados['ALTERACOES']."</div>
							</div>
						</div>
					  </a>
					</li>";
		}
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado.="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\"><b>trafego não encontrado</b></div>
						  <div class=\"item-after\"></div>
						</div>
					  </div>
					</li>";
	}
	
}else{ 
	$resultado =0; //DEU ALGUM PROBLEMA
}	

echo $resultado;

}

?>