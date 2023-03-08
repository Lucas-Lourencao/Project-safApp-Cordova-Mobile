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

$puxar="SELECT * FROM `trafegoviaturas` where SUBOBM_MILITAR='$subunidade' ORDER BY `ID` DESC LIMIT 0,20";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<li style='margin-bottom:3px;border:2px solid #cccccc;border-radius:10px;'>
					  <a href=\"#\" id=\"id_".$dados['ID']."\" onclick=\"recebeDados(".$dados['ID'].")\" class=\"item-link item-content\">
						    <div class=\"item-inner item-cell\">
							<div style=\"background:linear-gradient(to right, #e52d27, #b31217);color:#ffffff;\">
								<div class=\"title\"><center><b>CONTROLE DE TRÁFEGO</b> <b id='identificador_".$dados['ID']."'>".$dados['ID']."</b></center></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"VIATURA_".$dados['ID']."\">".$dados['VIATURA']."</div>
							  <div class=\"item-cell\" id=\"DATA_".$dados['ID']."\"><b>".$dados['DATA']."</b></div>
							  <div class=\"item-cell display-none\" id=\"DATA_ATUALIZACAO_".$dados['ID']."\"><b>".$dados['DATA_ATUALIZACAO']."</b></div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"MILITAR_".$dados['ID']."\">".$dados['MILITAR']."</div>
							  <div class=\"item-cell\" id=\"DESTINO_".$dados['ID']."\">".$dados['DESTINO']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"SAIDA_".$dados['ID']."\">".$dados['SAIDA']."</div>
							  <div class=\"item-cell\" id=\"CHEGADA_".$dados['ID']."\">".$dados['CHEGADA']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"KMSAIDA_".$dados['ID']."\">".$dados['KMSAIDA']."</div>
							  <div style=\"color:#b31217;\" class=\"item-cell\" id=\"KMCHEGADA_".$dados['ID']."\">".$dados['KMCHEGADA']."</div>
							</div>
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"ALTERACOES_".$dados['ID']."\">".$dados['ALTERACOES']."</div>
							</div>
							<div class=\"item-row display-none\">
							  <div class=\"item-cell\" id=\"OBM_MILITAR_".$dados['ID']."\">".$dados['OBM_MILITAR']."</div>
							  <div style=\"color:#b31217;\" class=\"item-cell\" id=\"SUBOBM_MILITAR_".$dados['ID']."\">".$dados['SUBOBM_MILITAR']."</div>
							</div>
						</div>
					  </a>
					</li>
						
		           <script>
			$$('#id_".$dados['ID']."').on('taphold', function () {
					  
	app.dialog.confirm('Tem certeza que quer deletar <b>".$dados['ID']."</b>?','<b>CONFIRMAÇÃO</b>', function () {
				
				var id=\"".$dados['ID']."\";
				
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
								app.dialog.alert('Houve um problema ao deletar!');
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
					
						var Viatura=$(\"#VIATURA_\"+id).html();
						var Data=$(\"#DATA_\"+id).html();
						var Militar=$(\"#MILITAR_\"+id).html();
						var Destino=$(\"#DESTINO_\"+id).html();
						var Saida=$(\"#SAIDA_\"+id).html();
						var Kmsaida=$(\"#KMSAIDA_\"+id).html();
						var Chegada=$(\"#CHEGADA_\"+id).html();
						var Kmchegada=$(\"#KMCHEGADA_\"+id).html();
						var Alteracoes=$(\"#ALTERACOES_\"+id).html();
						var Obm_militar=$(\"#OBM_MILITAR_\"+id).html();
						var Subobm_militar=$(\"#SUBOBM_MILITAR_\"+id).html();
						
						$('#vtr').val(Viatura);
						$('#data_atualizacao').val(Data);
						$('#militar').val(Militar);
						$('#destino').val(Destino);
						$('#horasaida').val(Saida);
						$('#kmsaida').val(Kmsaida);
						$('#horachegada').val(Chegada);
						$('#kmchegada').val(Kmchegada);
						$('#alteracoes').val(Alteracoes);
						$('#quartel').val(Obm_militar);
						$('#subunidade').val(Subobm_militar);
						$('#id').val(id);
						
						
						$('#BotaoSalvar_trajeto').addClass('display-none');
						$('#BotaoEditar_trajeto').removeClass('display-none');
						$('.data_trafego').removeClass('display-none');
						$('#hora-chegada').removeClass('display-none');
						
						
					}
		
					</script>
		
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