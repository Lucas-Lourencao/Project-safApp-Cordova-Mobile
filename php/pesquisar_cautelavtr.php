<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$subunidade = $_POST['subunidade']; 
$parametro_pesquisa = $_POST['parametro_pesquisa'];
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `trafegocobom_2cia5bbm` where subunidade='$subunidade' and Data LIKE '%$parametro_pesquisa%' or Horario LIKE '%$parametro_pesquisa%' or Cautela Like '%$parametro_pesquisa%' or Viatura LIKE '%$parametro_pesquisa%' or Cobonista LIKE '%$parametro_pesquisa%' or Condutor LIKE '%$parametro_pesquisa%' or Destino LIKE '%$parametro_pesquisa%' ORDER BY `id` DESC LIMIT 0,25";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<li style='background:#eeeeee;margin-bottom:5px;border-radius:10px;border:1px solid #dddddd'>
			<a id='id_".$dados['id']."' onclick='recebeDados(".$dados['id'].")'>
				<div class='card demo-facebook-card'>
    				<div class='card-header item-row'>
    					<div style='margin-right:20px;' class='col-20'>
    						<span class='badge'><b id='id_".$dados['id']."'>".$dados['id']."</b></span>
    					    <span class='badge'><b id='Viatura_".$dados['id']."'>".$dados['Viatura']."</b></span>
    					</div>
    					<div style='margin-left:30px;' class='col-80'>
    					    <div class='demo-facebook-name'><b style='color:#007fff;font-size:16px;' id='Cautela_".$dados['id']."'>  ".$dados['Cautela']."</b></div>
    						<div class='demo-facebook-name'><b style='color:#007fff;font-size:16px;' id='Data_".$dados['id']."'>  ".$dados['Data']."</b></div>
    						<div class='demo-facebook-name left'><b style='color:#959C9C;font-size:16px;' id='Horario_".$dados['id']."'>".$dados['Horario']."</b></div>
    					</div>
    				</div></a>
    				<div class='card-footer'>
        				<div><a><b>Destino:</b></a> <b style='color:#959C9C;' id='Destino_".$dados['id']."'>  ".$dados['Destino']."</b></div>
        			</div>
    				<div class='card-footer item-row'>
    				    <div style='color:#007fff;' class='col'><b>Cobonista:<b><span style='color:#959C9C;' class='' id='Cobonista_".$dados['id']."'> ".$dados['Cobonista']."</span></div>
    				    <div style='color:#007fff;' class='col'><b>Condutor:<b><span style='color:#959C9C;' class='' id='Condutor_".$dados['id']."'> ".$dados['Condutor']."</span></div>
    				</div>
    				<div class='card-content card-content-padding'>
    					<a class='link'><b>Alterações:</b></a><span style='color:#959C9C;' id='Alteracoes_".$dados['id']."'> ".$dados['Alteracoes']."</span>
    				</div>
				</div>
			</a>
		</li>
					";
		}
			
		
		$resultado.="<script>
		
					function recebeDados(id){ 
					
						var Data=$(\"#Data_\"+id).html();
						var Horario=$(\"#Horario_\"+id).html();
						var Viatura=$(\"#Viatura_\"+id).html();
						var Cautela=$(\"#Cautela_\"+id).html();
						var Cobonista=$(\"#Cobonista_\"+id).html();
						var Condutor=$(\"#Condutor_\"+id).html();
						var Destino=$(\"#Destino_\"+id).html();
						var Alteracoes=$(\"#Alteracoes_\"+id).html();
						
						$(\"#data_atualizacao\").val(Data);
						$(\"#hora_atualizacao\").val(Horario);
						$(\"#vtr\").val(Viatura);
						$(\"#cautela\").val(Cautela);
						$(\"#cobonista\").val(Cobonista);
						$(\"#condutor\").val(Condutor);
						$(\"#destino\").val(Destino);
						$(\"#alteracoes\").val(Alteracoes);
						$(\"#id\").val(id);
						
						
						$(\"#BotaoSalvar_cautela\").addClass('display-none');
						$(\"#BotaoEditar_cautela\").removeClass('display-none');
						$(\".data_trafego\").removeClass('display-none');
						
						
					}
		
					</script>
		
		";
			
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado.="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\"><b>Cautela não encontrada</b></div>
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