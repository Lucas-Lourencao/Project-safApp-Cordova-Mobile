<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$hidrante = $_POST['pesquisa'];
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `mapahuc` where municipio='$hidrante' or bairro='$hidrante' or rua='$hidrante' ORDER BY `ID` DESC LIMIT 0,10";
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
							<div style=\"background:linear-gradient(to right, #e52d27, #b31217);color:#ffffff;\">
								<div class=\"title\"><center><b>MAPA DE HIDRANTES URBANOS DE COLUNA</b></center></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"datacadastro_".$dados['id']."\"><b>".$dados['datacadastro']."</b></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"latitude_".$dados['id']."\"><b>Latitude:</b> ".$dados['latitude']."</div>
							  <div class=\"item-cell\" id=\"longitude_".$dados['id']."\"><b>Longitude:</b> ".$dados['longitude']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"municipio_".$dados['id']."\"><b>Município:</b> ".$dados['municipio']."</div>
							  <div class=\"item-cell\" id=\"bairro_".$dados['id']."\"><b>Bairro:</b>".$dados['bairro']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"rua_".$dados['id']."\"><b>Rua:</b> ".$dados['rua']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"situacaohuc_".$dados['id']."\"><b>Situação H.U.C:</b> ".$dados['situacaohuc']."</div>
							  <div class=\"item-cell\" id=\"abastecimentohuc_".$dados['id']."\"><b>Vazão:</b> ".$dados['abastecimentohuc']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"referencia_".$dados['id']."\"><b>Informações:</b> ".$dados['referencia']."</div>
							</div>
						</div>
					  </a>
					</li>";
		}	
		
		$resultado.="<script>
						$(\"#recebeDados\").on(click, function(id){ 
						var Latitude=$(\"#LATITUDE_\"+ID).html();
						var Longitude=$(\"#LONGITUDE_\"+ID).html();
						var Municipio=$(\"#MUNICIPIO\"+ID).html();
						var Bairro=$(\"#BAIRRO_\"+ID).html();
						var Rua=$(\"#RUA_\"+ID).html();
						var Situacao=$(\"#SITUACAOHUC_\"+ID).html();
						var Abastecimento=$(\"#ABASTECIMENTOHUC_\"+ID).html();
						var Referencia=$(\"#REFERENCIA_\"+ID).html();
						
						$(\"#lattitudereg\").val(Unidade);
						$(\"#longitudereg\").val(Viatura);
						$(\"#municipio\").val(Funcional);
						$(\"#bairro\").val(Data);
						$(\"#rua\").val(Destino);
						$(\"#situacaohuc\").val(Horasaida);
						$(\"#abastecimentohuc\").val(Kmsaida);
						$(\"#informacoes\").val(Horachegada);
						$(\"#id\").val(id);
						
						
						$(\"#BotaoSalvar\").addClass('display-none');
						$(\"#BotaoEditar\").removeClass('display-none');
						
						}
		
					 <\script>
					 ";
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado.="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\"><b>Hidrante não encontrado!</b></div>
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