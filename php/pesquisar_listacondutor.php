<?php
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

//RECEBER OS VALORES ENVIADOS PELO APP
$subunidade = $_POST['subunidade']; 
$parametro_busca = $_POST['parametro_busca'];
$chave = $_POST['chave'];

//UMA PEQUENA VALIDAÇÃO PARA EVITAR VAZAMENTO DE DADOS
if ($chave==''){
	//SE A CHAVE FOR VAZIA RETORNA ACESSO RESTRITO
	echo "ACESSO RESTRITO";	exit;
}else{
	
//TEM A CHAVE VINDA DO APP	
//COMANDO PARA SELECIONAR TUDO DA TABELA NO BANCO

$puxar="SELECT * FROM `condutor_2cia5bbm` where subunidade='$subunidade' and  viatura LIKE '%$parametro_busca%' or compartimento LIKE '%$parametro_busca%' or material LIKE '%$parametro_busca%' or conservacao LIKE '%$parametro_busca%' ORDER BY `id` DESC LIMIT 0,100";
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
					        <div style='background:linear-gradient(to right, #e52d27, #b31217);color:#ffffff;border-radius:10px;border:1px solid #cccccc;text-transform:uppercase;' class='item-row'>
							  <div class='item-cell display-none' id='id_".$dados['id']."'><b>".$dados['id']."</b></div>
							  <div class='item-cell'>Item n°:<b style='font-size:14px;text-transform:uppercase;' id='Numeracao_".$dados['id']."' > ".$dados['numeracao']."</b></div>
							</div>
							<div style='text-transform:uppercase; class='item-row'>
							<div style='color:#214ac8;font-size:14px;' class='item-cell' id='Viatura_".$dados['id']."'><b>".$dados['viatura']."</b></div>
							</div>
							<div style='text-transform:uppercase;' class='item-row'>
							  <div style='color:#007fff;font-size:12px;' class='item-cell col-50'><b id='Material_".$dados['id']."'>".$dados['material']."</b></div>
							  <div style='color:#007fff;font-size:12px;' class='item-cell col-50' ><b id='Setor_".$dados['id']."'> ".$dados['compartimento']."</b></div>
							</div>
							<div style='text-transform:uppercase;' class='item-row'>
							  <div style='font-size:10px;' class='item-cell col-50' ><b style='color:#cccccc;font-size:12px;' id='Conservacao_".$dados['id']."'> ".$dados['conservacao']."</b></div>
							  <div style='color:#cccccc;font-size:10px;' class='item-cell col-50'><b style='color:#cccccc;font-size:12px;' id='Quantidade_".$dados['id']."'> ".$dados['quantidade']."</b> Un.</div>
							</div><br>
							<div style='text-transform:uppercase;' class='item-row'>
							  <div style='color:#819bea;font-size:10px;text-transform:uppercase;' class='item-cell'>Inspeção/Manuteção:<b id='Acao_".$dados['id']."'> ".$dados['acao']."</b></div>
							</div><br>
							<div style='text-transform:uppercase;' class='item-row'>
							<div style='color:#819bea;font-size:10px;text-transform:uppercase;' class='item-cell' >Alteracões: <b id='Alteracoes_".$dados['id']."'>".$dados['alteracoes']."</b></div>
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