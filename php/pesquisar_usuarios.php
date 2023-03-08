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

$puxar="SELECT * FROM `usuarios` where subunidade='$subunidade' and nome LIKE '%$parametro_pesquisa%' or funcional LIKE '%$parametro_pesquisa%' or email LIKE '%$parametro_pesquisa%' or perfil LIKE '%$parametro_pesquisa%' ORDER BY `id` DESC LIMIT 0,100";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM

if ($query==true){
	if ($quantos>0){
		
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<li style='background:#eeeeee;margin-bottom:5px;border-radius:10px;border:1px solid #dddddd;'>
				<a id='id_".$dados['id']."' onclick='recebeDados(".$dados['id'].")'>
					<div class='card demo-facebook-card'>
					    <div class='card-header item-row'>
    				        <div style='margin-right:20px;' class='col-20'>
    							<span class='badge'><b>Id:</b><b id='id_".$dados['id']."'> ".$dados['id']."</b>
    							</span>
    							<span class='badge'><b>NF:</b><b id='funcional_".$dados['id']."'> ".$dados['funcional']."</b>
    							</span>
    						</div>
    						<div style='margin-left:30px;' class='col-80'>
    							<div class='demo-facebook-name'><b style='color:#007fff;font-size:16px;' id='nome_".$dados['id']."'>".$dados['nome']."</b>
    							</div>
    						</div>
    				    </div></a>
				        <div class='card-footer item-row'>
						    <div style='color:#007fff;' class='col'><b id='patente_".$dados['id']."'> ".$dados['patente']."</b>
						    </div>
						    <div style='color:#959C9C;' class='col'><b id='nome_guerra_".$dados['id']."'>".$dados['nome_guerra']."</b>
						    </div>
						</div>
						<div class='card-footer item-row'>
						    <div style='color:#007fff;' class='col'><b id='obm_".$dados['id']."'> ".$dados['obm']."</b>
						    </div>
						    <div style='color:#959C9C;' class='col'><b id='subobm_".$dados['id']."'>".$dados['subunidade']."</b>
						    </div>
						    <div style='color:#959C9C;' class='col'><b id='perfil_".$dados['id']."'>".$dados['perfil']."</b>
						    </div>
						</div>
						<div class='card-content card-content-padding'>
						<a class='link'><b style='color:#007fff;'>E-mail:</b></a><span style='color:#959C9C;' id='email_".$dados['id']."'> ".$dados['email']."</span>
					    </div>
					</div>
				</a>
		    </li>
					
					<script>
			$$('#id_".$dados['id']."').on('taphold', function () {
					  
	app.dialog.confirm('Tem certeza que quer deletar <b>".$dados['nome']."</b>?','<b>CONFIRMAÇÃO</b>', function () {
				
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
						var nome=$(\"#nome_\"+id).html();
						var patente=$(\"#patente_\"+id).html();
						var nome_guerra=$(\"#nome_guerra_\"+id).html();
						var funcional=$(\"#funcional_\"+id).html();
						var obm=$(\"#obm_\"+id).html();
						var subobm=$(\"#subobm_\"+id).html();
						var perfil=$(\"#perfil_\"+id).html();
						var e_mail=$(\"#email_\"+id).html();
						
						$(\"#camponome\").val(nome);
						$(\"#campopatente\").val(patente);
						$(\"#camponomeguerra\").val(nome_guerra);
						$(\"#campofuncional\").val(funcional);
						$(\"#campoobm\").val(obm);
						$(\"#camposubobm\").val(subobm);
						$(\"#campoperfil\").val(perfil);
						$(\"#CademailCadastro\").val(e_mail);
						$(\"#CampoID\").val(id);
						
						$(\"#Cadcadastra\").addClass('display-none');
						$(\"#BotaoEditar\").removeClass('display-none');
						$(\"#editar_cadastro_militar\").removeClass('display-none');
						
					}
		
					</script>
		
		";
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado .="<li>
					  <div class='item-content'>
						<div class='item-inner'>
						  <div class='item-title'>Nenhum cadastro encontrado!</div>
						  <div class='item-after'></div>
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