<?php
require('conexao.php');

$email=$_POST['email'];
$chave=$_POST['chave'];

if ($chave==''){
	echo "ACESSO RESTRITO";exit;
}else{
	
$puxar="SELECT * FROM `usuarios` where email='$email'";
$query = mysqli_query($conexao,$puxar)or die(mysqli_error());
$quantos=mysqli_num_rows($query); //CONTAR QUANTOS REGISTROS TEM

if ($query==true){
	if ($quantos==1){
		
	//SIM USUARIO ENCONTRADO
	function geraSenha($tamanho = 8, $maiusculas = true, $numeros = true, $simbolos = false)
{
$lmin = 'abcdefghijklmnopqrstuvwxyz';
$lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
$num = '1234567890';
$simb = '!@#$%*-';
$retorno = '';
$caracteres = '';
$caracteres .= $lmin;
if ($maiusculas) $caracteres .= $lmai;
if ($numeros) $caracteres .= $num;
if ($simbolos) $caracteres .= $simb;
$len = strlen($caracteres);
for ($n = 1; $n <= $tamanho; $n++) {
$rand = mt_rand(1, $len);
$retorno .= $caracteres[$rand-1];
}
return $retorno;
}
	
	
	
// ----------------ENVIAR EMAIL ----------- ///

$codigo = geraSenha(6, false, true);

$xconsulta = "UPDATE usuarios SET recuperaSenha='$codigo' WHERE email='$email'";
$xquery = mysqli_query($conexao,$xconsulta) or die(mysqli_error());

require_once("PHPMailer/class.phpmailer.php");

$user_mail=$email;

// Inicia a classe PHPMailer

$mail = new PHPMailer();

// Define os dados do servidor e tipo de conexão

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//$mail->IsSMTP(); // Define que a mensagem será SMTP

//$mail->Host = "br706.hostgator.com.br"; // Endereço do servidor SMTP

//$mail->SMTPAuth = true; // Usa autenticação SMTP? (opcional)

//$mail->Username = ''; // Usuário do servidor SMTP

//$mail->Password = ''; // Senha do servidor SMTP

// Define o remetente

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

$mail->From = "interappctive@gmail.com"; // ENDEREÇO DO EMAIL DE QUEM ENVIOU

$mail->FromName = "safApp"; // NOME DO APLICATIVO

// Define os destinatário(s)

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//$mail->AddAddress('fulano@dominio.com.br', 'Fulano da Silva');

$mail->AddAddress($user_mail);

//$mail->AddCC('ciclano@site.net', 'Ciclano'); // Copia

//$mail->AddBCC('fulano@dominio.com.br', 'Fulano da Silva'); // Cópia Oculta

// Define os dados técnicos da Mensagem

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

$mail->IsHTML(true); // Define que o e-mail será enviado como HTML

//$mail->CharSet = 'iso-8859-1'; // Charset da mensagem (opcional)

// Define a mensagem (Texto e Assunto)

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

$mail->Subject  = "CODIGO DE RECUPERACAO!"; // Assunto da mensagem

$mail->Body = "<b>Chegou seu código de verificação!</b><br><br><p>Voc&#234; est&#225; recebendo este email por que pediu para recuperar a senha. Seu código de verificação:</p><br><h1><b>$codigo</b></h1><br><br><br>Se não foi você que solicitou recuperação de senha, por favor ignore este e-mail.<br><b>InterAppctive Team.</b>";


//ENVIA O EMAIL

$enviado = $mail->Send();

// Limpa os destinatários e os anexos

$mail->ClearAllRecipients();	
	
	$resultado=0;	
		
		
	}else{ //É ZERO O NUMERO DE REGISTROS
		$resultado=1;
	}
	
}else{
$resultado=2; //DEU PROBLEMA NO BANCO	
}
	
	echo $resultado;
	
}

?>