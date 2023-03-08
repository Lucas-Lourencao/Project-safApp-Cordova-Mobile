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
		$resultado .="<li style='background:#eeeeee;margin-bottom:5px;border-radius:10px;border:1px solid #dddddd'>
					  <a id='id_".$dados['ID']."' onclick='recebeDados(".$dados['ID'].")'>
						    <div class='card demo-facebook-card'>
								<div class='card-header item-row'>
									<div style='margin-right:20px;' class='col-20'>
										<span class='badge'><b id='id_".$dados['ID']."'>".$dados['ID']."</b></span>
									    <span class='badge'><b id='VIATURA_".$dados['ID']."'>".$dados['VIATURA']."</b></span>
									</div>
									<div style='margin-left:30px;' class='col-80'>
										<div class='demo-facebook-name'>  <b style='color:#007fff;font-size:16px;' id='MILITAR_".$dados['ID']."'>  ".$dados['MILITAR']."</b></div>
										<div class='demo-facebook-name left'>  <b style='color:#959C9C;font-size:16px;' id='DATA_".$dados['ID']."'>".$dados['DATA']."</b></div>
										<div class='demo-facebook-date display-none left'>  <b style='color:#959C9C;font-size:16px;' id='DATA_ATUALIZACAO_".$dados['ID']."'>".$dados['DATA_ATUALIZACAO']."</b></div>
									</div>
								</div></a>
								<div class='card-footer'>
									<div><a><b>Destino:</b></a> <b style='color:#959C9C;' id='DESTINO_".$dados['ID']."'>  ".$dados['DESTINO']."</b></div>
								</div>
								<div class='card-footer item-row'>
								    <div class='col-33'><a style='' class=''><b>Saida:</b></a></div>
								    <div style='color:#959C9C;margin-left:20px;' class='col-33'><b class='' id='SAIDA_".$dados['ID']."'>".$dados['SAIDA']."</b></div>
								    <div style='color:#959C9C;' class='col-33'><b class='' id='KMSAIDA_".$dados['ID']."'>".$dados['KMSAIDA']."</b></div>
								</div>
								<div class='card-footer'>
								    <div class='col'><a><b>Chegada:</b></a></div>
								    <div class='col'><b style='color:#959C9C;'  id='CHEGADA_".$dados['ID']."'>".$dados['CHEGADA']."</b></div>
								    <div class='col'><b style='color:#959C9C;'  id='KMCHEGADA_".$dados['ID']."'>".$dados['KMCHEGADA']."</b></center></div>
								</div>
								<div class='card-content card-content-padding'>
									<a class='link'><b>Alterações:</b></a><span style='color:#959C9C;' id='ALTERACOES_".$dados['ID']."'> ".$dados['ALTERACOES']."</span>
								</div>
							</div>
					  </a>
					</li>
					
					";	
		}
		
		
		
		$resultado.="<script>
		
					function recebeDados(id){ 
					
						var Viatura=$('#VIATURA_'+id).html();
						var Data=$('#DATA_'+id).html();
						var Militar=$('#MILITAR_'+id).html();
						var Destino=$('#DESTINO_'+id).html();
						var Saida=$('#SAIDA_'+id).html();
						var Kmsaida=$('#KMSAIDA_'+id).html();
						var Chegada=$('#CHEGADA_'+id).html();
						var Kmchegada=$('#KMCHEGADA_'+id).html();
						var Alteracoes=$('#ALTERACOES_'+id).html();
						var Obm_militar=$('#OBM_MILITAR_'+id).html();
						var Subobm_militar=$('#SUBOBM_MILITAR_'+id).html();
						
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
						$('#registrar_trafego').removeClass('display-none');
						
						$('#edicao_vtr').removeClass('display-none');
						$('#salva_vtr').addClass('display-none');
						
						
						
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