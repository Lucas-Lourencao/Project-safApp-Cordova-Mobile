<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

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

$puxar="SELECT * FROM `condutor_2cia5bbm` where subunidade='$subunidade' ORDER BY `id` ASC LIMIT 0,50";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
	//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<li style='background:#eeeeee;margin-bottom:5px;border-radius:10px;border:1px solid #dddddd;'>
				<a id='id_".$dados['id']."' onclick='recebeDados(".$dados['id'].")'>
						<div class='card demo-facebook-card'>
    						<div class='card-header item-row'>
    						    <div style='margin-right:20px;' class='col-20'>
        							<span class='badge'><b>Id:</b><b id='id_".$dados['id']."'> ".$dados['id']."</b>
        							</span>
        						    <span class='badge'><b>Item:</b><b id='Numeracao_".$dados['id']."'> ".$dados['numeracao']."</b>
        						    </span>
        						</div>
        						<div style='margin-left:30px;' class='col-80'>
        							<div class='demo-facebook-name'><b style='color:#007fff;font-size:16px;' id='Viatura_".$dados['id']."'><b>".$dados['viatura']."</b>
        							</div>
        						</div>
        					</div></a>
							<div class='card-footer item-row'>
    						    <div style='color:#007fff;' class='col'><b id='Setor_".$dados['id']."'> ".$dados['compartimento']."</b>
    						    </div>
    						    <div style='color:#959C9C;' class='col'><b id='Material_".$dados['id']."'>".$dados['material']."</b>
    						    </div>
    						</div>
							<div class='card-footer item-row'>
    						    <div style='color:#959C9C;' class='col'><b id='Quantidade_".$dados['id']."'> ".$dados['quantidade']."</b> Un.
    						    </div>
    						    <div style='color:#959C9C;' class='col'><b id='Conservacao_".$dados['id']."'> ".$dados['conservacao']."</b>
    						    </div>
    						</div>
							<div class='card-content card-content-padding'>
							  <a class='link'><b style='color:#007fff;'>Inspeção:</b>
							  </a>
							  <span style='color:#959C9C;' id='Acao_".$dados['id']."'> ".$dados['acao']."
							  </span>
							</div>
							</div>
							<div class='card-content card-content-padding'>
							<a class='link'><b style='color:#007fff;'>Alterações:</b></a><span style='color:#959C9C;' id='Alteracoes_".$dados['id']."'>".$dados['alteracoes']."</span>
						    </div>
						</div>
						</a>
					</li>";	
		}
		
		//var Atividade=$(\"#Vtr_Local_\"+id).html();$(\"#mapa_carga\").val(Atividade);
		
		$resultado.="<script>
					function recebeDados(id){
						var Compartimento=$(\"#Compartimento_\"+id).html();
						var Numeracao=$(\"#Numeracao_\"+id).html();
						var Material=$(\"#Material_\"+id).html();
						var Quantidade=$(\"#Quantidade_\"+id).html();
						var Conservacao=$(\"#Conservacao_\"+id).html();
						var Acao=$(\"#Acao_\"+id).html();
						var Alteracoes=$(\"#Alteracoes_\"+id).html();
						
						
						$('#setor_compartimento').val(Compartimento);
						$('#item_carga').val(Numeracao);
						$('#material_carga').val(Material);
						$('#condicoes_uso').val(Conservacao);
						$('#quantidade_carga').val(Quantidade);
						$('#acao_manutencao').val(Acao);
						$('#alteracoes_carga').val(Alteracoes);
						$('#id').val(id);
						
						$('.selecao_atividade').addClass('display-none');
						$('#inserir_carga').removeClass('display-none');
						$('#inspecao_condutor').removeClass('display-none');
						$('#BotaoSalvar_conferenciacondutor').addClass('display-none');
						$('#BotaoEditar_conferenciacondutor').removeClass('display-none');
						$('#BotaoSalvar_mapacarga').addClass('display-none');
						$('#BotaoEditar_mapacarga').addClass('display-none');
						
					}
		
					</script>
		
		";
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado .="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\"><b>Item não encontrado!</b></div>
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