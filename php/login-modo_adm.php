<?php 
//CONEXÃO COM BANCO DE DADOS
$conexao = mysqli_connect('localhost', 'inte0174_cmtcia', '1234560654321');
$banco = mysqli_select_db($conexao,'inte0174_admciabm');
mysqli_set_charset($conexao,'utf8');

$senha = $_POST["senha"];
//$senhaCriptografada= sha1($senha);
$appvalidation= $_REQUEST["chave"];

if ($appvalidation==''){

	echo "ACESSO RESTRITO. RASTREANDO INVASOR...DADOS COLETADOS.";

	exit;

}else{

// Validaﾃｧﾃ｣o do usuﾃ｡rio/senha digitados
$consulta = "SELECT * FROM safappAdm WHERE senha = '$senha'";
$query = mysqli_query($conexao,$consulta);

if (mysqli_num_rows($query) != 1) {

	$resultado = 0; //Nﾃグ ENCONTROU USUARIO
	
} else {
	 // ENCONTROU USUARIO
	 $dados=mysqli_fetch_assoc($query);		
};

echo $resultado;
}

?>