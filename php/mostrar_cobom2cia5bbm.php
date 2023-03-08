<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `trafegocobom_2cia5bbm` ORDER BY `ID` DESC LIMIT 0,10";
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
								<div class=\"title\"><center><b>CONTROLE COBOM 2ªCIA/5°BBM</b></center></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Data_".$dados['id']."\"><b>Data:</b> ".$dados['Data']."</div>
							  <div class=\"item-cell\" id=\"Horário_".$dados['id']."\"><b>Horário:</b> ".$dados['Horario']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Viatura_".$dados['id']."\"><b>Viatura:</b> <b style=\"color:#b31217;\">".$dados['Viatura']."</b></div>
							  <div class=\"item-cell\" id=\"Cautela_".$dados['id']."\"><b>Status:</b> <b style=\"color:#b31217;\">".$dados['Cautela']."</b></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Cobonista_".$dados['id']."\"><b>Cobonista:</b> ".$dados['Cobonista']."</div>
							  <div class=\"item-cell\" id=\"Condutor_".$dados['id']."\"><b>Condutor:</b> ".$dados['Condutor']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Destino_".$dados['id']."\"><b>Destino:</b> ".$dados['Destino']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Alteracoes_".$dados['id']."\"><b>Alterações:</b> ".$dados['Alteracoes']."</div></div>
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