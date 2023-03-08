<?php
require('conexaoadmciabm.php');

//RECEBER OS VALORES ENVIADOS PELO APP
$Data = date('d/m/Y');
$Horario = date('H:i:s');
$Viatura = $_POST['Viatura'];
$Militar = $_POST['Militar'];
$Funcional = $_POST['Funcional'];
$Km = $_POST['KM'];
$Custo = $_POST['Custo'];
$Volume = $_POST['Volume'];
$Alteracoes = $_POST['Alteracoes'];
$Url = $_POST['Url'];
$Chave = $_POST['Chave'];
			
			//COMANDO PARA INSERIR NO BANCO
				$inserir="INSERT INTO `abastecimento` (data,horario,viatura,militar,funcional,km_abastecimento,custo,volume,alteracoes,url) values ('$Data','$Horario','$Viatura','$Militar','$Funcional','$Km','$Custo','$Volume','$Alteracoes','$Url')";
				$query = mysqli_query($conexao,$inserir)or die(mysqli_error());	

				//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR
				if ($query == true) {
					$resultado=1; //RETORNA O CAMINHO DA IMAGEM PRO APP
				}else{
					$resultado=0; //RESULTADO 0 SE DEU ERRADO INSERIR NO BANCO
				}
				
				echo $resultado; //RETORNAR PARA O APP

?>