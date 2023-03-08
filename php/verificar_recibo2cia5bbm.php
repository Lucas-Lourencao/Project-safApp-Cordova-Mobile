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
$mostrar="SELECT * FROM `recibos` ORDER BY `ID` DESC LIMIT 0,1";
$query = mysqli_query($conexao,$mostrar)or die(mysqli_error());
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
							<div>
								<div style=\"color:#b31217\" class=\"title\"><center><b>ATENÇÃO: VERIFIQUE SE A IMAGEM FICOU LEGÍVEL!</b></center></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-media\"><img src=\"".$dados['caminho']."\" width=\"285\" height=\"300\"/></div>
							</div>
							<div class=\"item-row\">
							  <div  style=\"color:#b31217\" class=\"item-cell\"><center>Caso os dados não estejam legíveis, faça um novo registro!</center></div>
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