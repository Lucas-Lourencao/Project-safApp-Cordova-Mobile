<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$recibo = $_POST['recibo'];
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `abastecimento` where data='$recibo' or viatura='$recibo' or militar='$recibo' or funcional='$recibo' ORDER BY `ID` DESC LIMIT 0,15";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<li style=\"border-top:2px solid gray;border-bottom:2px solid gray;>
					  <a href=\"#\" id=\"recebeDados\" class=\"item-link item-content\">
						<div class=\"item-inner item-cell\">
							<div style=\"color:#b31217;\">
								<div class=\"title\"><center><b>RECIBOS ABASTECIMENTO 2ªCIA/5°BBM</b></center></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-media\"><center><img src=\"".$dados['url']."\" width=\"280\" height=\"300\"/></center></div>
							</div>
							<div style=\"font-size: 10px;\" class=\"item-row\">
							  <div class=\"item-cell\" id=\"data_".$dados['id']."\"><b>Data:</b> ".$dados['data']."</div>
							  <div class=\"item-cell\" id=\"horário_".$dados['id']."\"><b>Horário:</b> ".$dados['horario']."</div>
							</div>
								<div style=\"font-size: 10px;text-transform: uppercase;\" class=\"item-row\">
							  <div class=\"item-cell uppercase\" id=\"viatura_".$dados['id']."\"><b>Viatura:</b> ".$dados['viatura']."</div>
							</div>
							<div style=\"font-size: 10px;text-transform: uppercase;\" class=\"item-row\">
							  <div class=\"item-cell\" id=\"militar_".$dados['id']."\"><b>Condutor:</b> ".$dados['militar']."</div>
							  <div class=\"item-cell\" id=\"km_abastecimento_".$dados['id']."\"><b>KM:</b> ".$dados['km_abastecimento']."</div>
							</div>
							<div style=\"font-size: 10px;text-transform: uppercase;\" class=\"item-row\">
							  <div class=\"item-cell\" id=\"custo_".$dados['id']."\"><b>Custo: R$</b> ".$dados['custo']."</div>
							  <div class=\"item-cell\" id=\"volume_".$dados['id']."\"><b>Volume(L):</b> ".$dados['volume']."</div>
							</div>
							<div class=\"item-row\">
							  <div style=\"font-size: 10px;\" class=\"item-cell\" id=\"alteracoes_".$dados['id']."\"><b>Alterações:</b> ".$dados['alteracoes']."</div>
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