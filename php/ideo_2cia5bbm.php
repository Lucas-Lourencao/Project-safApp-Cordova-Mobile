<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$nome = $_POST['nome'];
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `ideo_2cia_5bbm`where Lista='$nome' ORDER BY `ID` ASC LIMIT 0,50";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<li>
					    <label class='item-checkbox item-content'>
						<input type='checkbox' name='demo-checkbox' value=''>
						<i class='icon icon-checkbox'></i>
						<div class=\"item-inner item-cell\">
					    </label>
							<div style='background:linear-gradient(to right, #e52d27, #b31217);color:#ffffff;border:1px solid gray;font-size:10px;text-transform:uppercase;' class=\"item-row\">
							  <div class=\"item-cell display-none\" id=\"ID_".$dados['ID']."\"><b>".$dados['ID']."</b></div>
							  <div class=\"item-cell\" id=\"Lista_".$dados['ID']."\"><b>Lista:</b> ".$dados['Lista']."</div>
							  <div class=\"item-cell\" id=\"Numeracao".$dados['ID']."\"><b>Item n°:</b> ".$dados['Numeracao']."</div>
							</div>
							<div style='font-size:10px;text-transform:uppercase;' class=\"item-row\">
							  <div class=\"item-cell\" id=\"Vtr_Local_".$dados['ID']."\"><b>Viatura/Local:</b> ".$dados['Vtr_Local']."</div>
							  <div class=\"item-cell\" id=\"Setor_".$dados['ID']."\"><b>Setor:</b> ".$dados['Setor']."</div>
							</div>
							<div style='font-size:10px;text-transform:uppercase;' class=\"item-row\">
							  <div class=\"item-cell\" id=\"Item_".$dados['ID']."\"><b>Equipamento:</b> ".$dados['Item']."</div>
							</div><br>
							<div style='font-size:10px;text-transform:uppercase;' class=\"item-row\">
							  <div class=\"item-cell\" id=\"Acao_".$dados['ID']."\"><b>Ação:</b> ".$dados['Acao']."</div>
							</div>
						</div>
					</li>";	
		}
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado .="<li>
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