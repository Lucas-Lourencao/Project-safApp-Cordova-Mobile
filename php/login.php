<?php 
require('conexao.php');

$email = mysqli_real_escape_string($conexao,$_POST["email"]);
$senha = mysqli_real_escape_string($conexao,$_POST["senha"]);
$senhaCriptografada= sha1($senha);
$appvalidation= mysqli_real_escape_string($conexao,$_REQUEST["chave"]);

if ($appvalidation==''){

	echo "ACESSO RESTRITO!";

	exit;

}else{

	// Validação do usuário/senha digitados
	$consulta = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senhaCriptografada'";
	$query = mysqli_query($conexao, $consulta);

	if (mysqli_num_rows($query) != 1) {

		$resultado = 0; //NÃO ENCONTROU USUARIO
		
	} else { // ENCONTROU USUARIO
		
		$dados=mysqli_fetch_assoc($query);	//PUXAR DADOS NA VARIAVEL $dados
			
		//COLOCA TODOS OS DADOS EM UMA UNICA VARIAVEL
		$TodosDados = array('nome'=> $dados['nome'],'patente'=>$dados['patente'],'nomeguerra'=>$dados['nome_guerra'],'NF'=>$dados['funcional'],'email'=>$dados['email'],'perfil'=>$dados['perfil'],'obm'=>$dados['obm'],'subunidade'=>$dados['subunidade'],'senha'=>$senha);
		
		// CONVERTO ELE COM A FUNÇÃO json_encode PARA ENVIAR OS DADOS "ENCAPSULADOS"
		$resultado = json_encode($TodosDados);
				
	};

echo $resultado;
}

?>