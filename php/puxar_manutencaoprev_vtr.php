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

$puxar="SELECT * FROM `agenda_manutencao` where subunidade='$subunidade' ORDER BY `ID` DESC LIMIT 0,20";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<div class='data-table data-table-init card'>
					<div style='background:#007fff;color:#ffffff;' class='card-header'>
						<div class='data-table-title'><b>Manutenção Preventiva</b>
						</div>
					</div>
		            <div class='card-content'>
		            <table>
						<thead>
							<tr id='manutencaoprev_vtr'>
							  <th class='checkbox-cell'>
									<label class='checkbox'>
									  <input type='checkbox'>
									  <i class='icon-checkbox'></i>
									</label>
							  </th>
							  <th  class='label-cell'><b id='viatura_".$dados['id']."' style='font-size:16px;text-align:center;color:#007fff;'>".$dados['viatura']."</b></th>
							  <th  class='numeric-cell'><b style='font-size:14px;text-align:center;color:#007fff;'>Data</b></th>
							  <th style='text-aling:center' class='numeric-cell'><b style='font-size:14px;text-align:center;color:#007fff;'>KM</b></th>
							</tr>
						</thead>
						<tbody>
							<tr id='monitora_oleo'>
    						  <td class='checkbox-cell'>
                                    <label class='checkbox'>
                                      <input type='checkbox'>
                                      <i class='icon-checkbox'></i>
                                    </label>
                              </td>
							  <td class='label-cell'>Óleo e Filtro</td>
							  <td id='data_oleo' class='numeric-cell'><span id='data_oleo_".$dados['id']."'>".$dados['data_oleo']."</span></td>
							  <td id='km_oleo' class='numeric-cell'><span id='km_oleo_".$dados['id']."'>".$dados['km_oleo']."</span></td>
							</tr>
							<tr id='monitora_alinhamento'>
							  <td class='checkbox-cell'>
                                    <label class='checkbox'>
                                      <input type='checkbox'>
                                      <i class='icon-checkbox'></i>
                                    </label>
                              </td>
							  <td align='left' class='label-cell'>Alinhamento</td>
							  <td id='data_oleo' class='numeric-cell'><span id='data_alinhamento_".$dados['id']."'>".$dados['data_alinhamento']."</span></td>
							  <td id='km_alinhamento' class='numeric-cell'><span id='km_oleo_".$dados['id']."'>".$dados['km_alinhamento']."</span></td>
							</tr>
							<tr id='monitora_pneu'>
							  <td class='checkbox-cell'>
                                    <label class='checkbox'>
                                      <input type='checkbox'>
                                      <i class='icon-checkbox'></i>
                                    </label>
                              </td>
							  <td class='label-cell'>Troca de Pneus</td>
							  <td id='data_oleo' class='numeric-cell'><span id='data_pneu_".$dados['id']."'>".$dados['data_pneu']."</span></td>
							  <td id='km_pneu_' class='numeric-cell'><span id='km_oleo_".$dados['id']."'>".$dados['km_pneu']."</span></td>
							</tr>
							<tr id='monitora_documentacao'>
							  <td class='checkbox-cell'>
                                    <label class='checkbox'>
                                      <input type='checkbox'>
                                      <i class='icon-checkbox'></i>
                                    </label>
                              </td>
							  <td class='label-cell'>Documentação</td>
							  <td id='data_oleo' class='numeric-cell'><span id='data_documentacao_".$dados['id']."'>".$dados['data_documentacao']."</span></td>
							  <td style='background:#ffffff' class='numeric-cell'></td>
							</tr>
						</tbody>
					    </table><br>
					</div>
				</div>";	
		}
		
		
		
		/*$resultado.="<script>
		
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
		
		";*/
			
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado.="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\"><b>Manutenções preventivas em dia!</b></div>
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