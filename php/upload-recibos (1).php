<?php
require('conexaoadmciabm.php');

//PEGAR IMAGEM
$new_image_name = urldecode($_FILES["file"]["name"]).".jpg";

            
/* PEGAR EXTENÇÃO DO ARQUIVO */
$ext = strtolower(strrchr($new_image_name,"."));
        
$nome_atual = md5(uniqid(time())).$ext; //nome que dará a imagem
$tmp = $_FILES['file']['tmp_name']; //caminho temporário da imagem

        
	//MOVER O ARQUIVO PARA PASTA FOTO
	if (move_uploaded_file($tmp, "recibos/".$nome_atual)){
			
			//GERAR LINK DA IMAGEM
			$caminho="https://interappctive.com/admciabm/recibos/$nome_atual";
			
			//COMANDO PARA INSERIR NO BANCO
				$inserir="INSERT INTO `recibos` (caminho) values ('$caminho')";
				$query = mysqli_query($conexao,$inserir)or die(mysqli_error());	

				//VERIFICA SE EXECUTOU A FUNÇÃO INSERIR
				if ($query == true) {
					$resultado=$caminho; //RETORNA O CAMINHO DA IMAGEM PRO APP
				}else{
					$resultado=0; //RESULTADO 0 SE DEU ERRADO INSERIR NO BANCO
				}
				
				echo $resultado; //RETORNAR PARA O APP
		
        }

?>