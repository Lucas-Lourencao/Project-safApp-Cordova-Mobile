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

$puxar="SELECT * FROM `cadastro_compartimento_vtr` where subunidade='$subunidade' and compartimento LIKE '%$parametro_pesquisa%' order by `id` asc limit 0,20";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM

if ($query==true){
	if ($quantos>0){
		
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado.="<li>
					  <a href=\"#\"  id=\"id_".$dados['id']."\" onclick=\"recebeDados(".$dados['id'].")\" class=\"item-link item-content\">
						<div class=\"item-inner\">
						  <div class='item-title' id='compartimento_".$dados['id']."'>".$dados['compartimento']."</div>
						</div>
					  </a>
					</li>
					
					<script>
			$$('#id_".$dados['id']."').on('taphold', function () {
					  
	app.dialog.confirm('Tem certeza que quer deletar <b>".$dados['compartimento']."</b>?','<b>CONFIRMAÇÃO</b>', function () {
				
				var id=\"".$dados['id']."\";
				
				app.dialog.preloader('Deletando...');
						$.ajax({
						type: 'POST', 
						data: {id:id,chave:'exemplo'}, 
						url: 'https://interappctive.com/admciabm/deletar_material.php',  
							 
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
						var compartimento=$(\"#compartimento_\"+id).html();
						
						$(\"#inserir_compartimento\").val(compartimento);
						$(\"#id\").val(id);
						
					
						$(\"#BotaoEditar_compartimento\").removeClass('display-none');
						$(\"#cad_compartimento\").removeClass('display-none');
						
					}
		
					</script>
		
		";
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado .="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\"><b>Nenhum Compartimento Encontrado</b></div>
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