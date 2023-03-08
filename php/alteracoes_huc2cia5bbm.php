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

$puxar="SELECT * FROM `mapahuc` where situacaohuc='SEM ÁGUA' or situacaohuc='INOPERANTE' or abastecimentohuc='Q < 260LPM' ORDER BY `ID` DESC LIMIT 0,30";
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