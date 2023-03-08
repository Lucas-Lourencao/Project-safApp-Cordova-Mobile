<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$subunidade = $_POST['subunidade']; 
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `trafegocobom_2cia5bbm` where subunidade='$subunidade' ORDER BY `id` DESC LIMIT 0,25";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<li style='margin-bottom:3px;border:2px solid #cccccc;border-radius:10px;'>
					  <a href=\"#\" id=\"id_".$dados['id']."\" onclick=\"recebeDados(".$dados['id'].")\" class=\"item-link item-content\">
						    <div class=\"item-inner item-cell\">
							<div style=\"background:linear-gradient(to right, #e52d27, #b31217);color:#ffffff;\">
								<div class=\"title\"><center><b>CONTROLE DE CAUTELA DE VIATURAS</b> <b id='identificador_".$dados['id']."'>".$dados['id']."</b></center></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Data_".$dados['id']."\">".$dados['Data']."</div>
							  <div class=\"item-cell\" id=\"Horario_".$dados['id']."\">".$dados['Horario']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Viatura_".$dados['id']."\">".$dados['Viatura']."</div>
							  <div class=\"item-cell\" id=\"Cautela_".$dados['id']."\">".$dados['Cautela']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Cobonista_".$dados['id']."\">".$dados['Cobonista']."</div>
							  <div class=\"item-cell\" id=\"Condutor_".$dados['id']."\">".$dados['Condutor']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Destino_".$dados['id']."\">".$dados['Destino']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"Alteracoes_".$dados['id']."\">".$dados['Alteracoes']."</div>
							</div>
						</div>
					  </a>
					</li>
					<script>
			$$('#id_".$dados['id']."').on('taphold', function () {
					  
	app.dialog.confirm('Tem certeza que quer deletar <b>".$dados['id']."</b>?','<b>CONFIRMAÇÃO</b>', function () {
				
				var id=\"".$dados['id']."\";
				
				app.dialog.preloader('Deletando...');
						$.ajax({
						type: 'POST', 
						data: {id:id,chave:'chave'}, 
						url: 'https://interappctive.com/admciabm/deletar_cadastrados.php',  
							 
						success: function (resposta) {
							
							if (resposta==1){
								app.dialog.close();
								app.views.main.router.refreshPage();
							}
							
							if (resposta==0){
								app.dialog.close();
								app.dialog.alert('Houve um problema ao inserir!');
							}
							
						},
							
						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');								   
						},
							
						complete: function(){
							
						}

						});
				
				
			  });
					  
					});
					</script>
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