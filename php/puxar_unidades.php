<?php
//CONEXÃO COM BANCO DE DADOS
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `cadastro_unidades`";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<li>
					  <a href=\"#\" id=\"id_".$dados['id']."\" onclick=\"recebeDados(".$dados['id'].")\" class=\"item-link item-content\">
						<div style=\"text-transform:uppercase\" class=\"item-inner item-cell\">
							<div class=\"item-row\">
							  <div class=\"item-cell\" id=\"unidade_".$dados['id']."\">".$dados['unidade']."</div>
							</div>
						</div>
					  </a>
					</li>
					
					<script>
			$$('#id_".$dados['id']."').on('taphold', function () {
					  
	app.dialog.confirm('Tem certeza que quer deletar <b>".$dados['unidade']."</b>?','<b>CONFIRMAÇÃO</b>', function () {
				
				var id=\"".$dados['id']."\";
				
				app.dialog.preloader('Deletando...');
						$.ajax({
						type: 'POST', 
						data: {id:id,chave:'chave'}, 
						url: 'https://interappctive.com/admciabm/deletar_unidade.php',  
							 
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
						var unidade=$(\"#unidade_\"+id).html();
						
						$(\"#cadastro_obm\").val(unidade);
						$(\"#CampoID\").val(id);
						
						$(\"#BotaoSalvar\").addClass('display-none');
						$(\"#BotaoEditar_obm\").removeClass('display-none');
						$(\"#cad_unidade\").removeClass('display-none');
						
					}
		
					</script>
		
		";
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado .="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\"><b>Nenhuma Unidade Encontrada</b></div>
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