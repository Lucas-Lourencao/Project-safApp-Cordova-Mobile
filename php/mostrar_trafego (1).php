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

$puxar="SELECT * FROM `trafegoviaturas` ORDER BY `ID` DESC LIMIT 0,10";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado.="<li style=\"border-top:2px solid gray;border-bottom:2px solid gray;>
					  <a href=\"#\" id=\"id_".$dados['ID']."\" onclick=\"recebeDados(".$dados['ID'].")\" class=\"item-link item-content\">
						<div class=\"item-inner item-cell\">
							<div style=\"background:linear-gradient(to right, #e52d27, #b31217);color:#ffffff;\">
								<div class=\"title\"><center><b>CONTROLE DE TRÁFEGO 2ªCIA/5°BBM</b></center></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"VIATURA_".$dados['id']."\"><b>Viatura:</b> ".$dados['VIATURA']."</div>
							  <div class=\"item-cell\" id=\"DATA_".$dados['id']."\"><b>".$dados['DATA']."</b></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"MILITAR_".$dados['ID']."\"><b>Condutor:</b> ".$dados['MILITAR']."</div>
							  <div class=\"item-cell\" id=\"DESTINO_".$dados['ID']."\"><b>Destino:</b> ".$dados['DESTINO']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"SAIDA_".$dados['id']."\"><b>Horario Saída:</b> ".$dados['SAIDA']."</div>
							  <div class=\"item-cell\" id=\"CHEGADA_".$dados['ID']."\"><b>Horário Chegada:</b>".$dados['CHEGADA']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"KMSAIDA_".$dados['ID']."\"><b>Km Inicial:</b> ".$dados['KMSAIDA']."</div>
							  <div style=\"color:#b31217;\" class=\"item-cell\" id=\"KMCHEGADA_".$dados['ID']."\"><b>Km Final:</b> <b>".$dados['KMCHEGADA']."</b></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"MILITAR_".$dados['ID']."\"><b>ID:</b> ".$dados['ID']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"ALTERACOES_".$dados['ID']."\"><b>Alteracões:</b> ".$dados['ALTERACOES']."</div>
							</div>
						</div>
					  </a>
					</li>
					";	
		}
		
		$resultado.="<script>
		
					function recebeDados(id){ 
					
						var Viatura=$(\"#VIATURA_\"+ID).html();
						var Militar=$(\"#MILITAR_\"+ID).html();
						var Destino=$(\"#DESTINO_\"+ID).html();
						var Saida=$(\"#SAIDA_\"+ID).html();
						var Kmsaida=$(\"#KMSAIDA_\"+ID).html();
						var Chegada=$(\"#CHEGADA_\"+ID).html();
						var Kmchegada=$(\"#KMCHEGADA_\"+ID).html();
						var Alteracoes=$(\"#ALTERACOES_\"+ID).html();
						
						$(\"#vtr\").val(Viatura);
						$(\"#militar\").val(Militar);
						$(\"#destino\").val(Destino);
						$(\"#horasaida\").val(Horasaida);
						$(\"#kmsaida\").val(Kmsaida);
						$(\"#horachegada\").val(Chegada);
						$(\"#kmchegada\").val(Kmchegada);
						$(\"#alteracoes\").val(Alteracoes);
						$(\"#id\").val(ID);
						
						$(\"#BotaoSalvar\").addClass('display-none');
						$(\"#BotaoEditar_trafego\").removeClass('display-none');
						
						)};
		
					 <\script>
					 ";
			
		
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