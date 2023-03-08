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

$puxar="SELECT * FROM `tabela_alpcb` where obrigatoriedade='0' order by `id` asc limit 0,20";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM	

//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR

if ($query == true) {
	
	//SE QUANTIDADE DE REGISTROS FOR MAIOR QUE 0
	if ($quantos>0){
		
		//LAÇO DE REPETIÇÃO PHP onclick=\"recebeDados(".$dados['id'].")\"
		while ($dados = mysqli_fetch_assoc($query)){
		$resultado .="<li style='margin-bottom:3px;border:2px solid #cccccc;border-radius:10px;'>
		              <div class='card'>
		              <div style='text-transform:uppercase;color:#214ac8;font-size:14px;' class='card-header'><b>".$dados['medida_seguranca']."</b></div>
                      <div class='card-content card-content-padding'><b style='margin-top:3px;color:#007fff;font-size:14px;'>Documentação:</b> ".$dados['documentacao']."</div>
                      <div style='text-align:justfy;' class='card-content card-content-padding'><b style='margin-top:3px;color:#007fff;font-size:14px;'>Atenção:</b><span align='justfy'> ".$dados['descricao_curta']."</span></div>
                      </div>
					</li>
				
					";	
		}
		
	//SE A QUANTIDADE DE REGISTROS É 0	
	}else{ 
		$resultado .="<li>
					  <div class=\"item-content\">
						<div class=\"item-inner\">
						  <div class=\"item-title\"><b>Nenhuma Medida Encontrada!</b></div>
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