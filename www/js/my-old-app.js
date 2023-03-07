//COMANDO PARA "OUVIR" QUANDO O DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady.bind(this), false);

var app = new Framework7({
	// App root element
	root: '#app',
	// App Name
	name: 'safApp',
	// App id
	id: 'br.com.safappbeta',
	// Enable swipe panel
	panel: {
		swipe: 'left',
	},
	touch: {
		tapHold: true //enable tap hold events
	},
	// Add default routes
	routes: [
		{
			path: '/index/',
			url: 'index.html',
			on: {
				pageInit: function (event, page) {

					//DESATIVAR PAINEL ESQUERDO NA ABERTURA
					app.panel.disableSwipe('left');

					//REMOVER ANIMACAO DE "CORACAO BATENDO" 2 SEGUNDOS
					setTimeout(function () {
						$(".Aligner").removeClass("animated lightSpeedIn");
					}, 2000);

					//ANIMAÇÃO DE BATER CORACAO 2 SEGUNDOS E MEIO
					setTimeout(function () {
						$(".Aligner").addClass("animated heartBeat");
					}, 2500);

					//REMOVER ANIMACAO DE "CORACAO BATENDO" 3 SEGUNDOS E MEIO
					setTimeout(function () {
						$(".Aligner").removeClass("animated heartBeat");
					}, 3500);

					//FAZER NOVAMENTE ANIMACAO DO CORACAO BATENDO 4 SEGUNDOS E MEIO
					setTimeout(function () {
						$(".Aligner").addClass("animated lightSpeedOut");
					}, 4500);


					//REDIRECIONAR PARA HOME EM 5 SEGUNDOS
					setTimeout(function () {

						var login = localStorage.getItem("email");

						if (login == null || login == '') {
							app.views.main.router.navigate('/home/');
						} else {
							app.views.main.router.navigate('/admunidadesciabm/');
						}

					}, 5500);

					//QUANDO CLICAR VARIAS VEZES SOBRE O NOME NO MENU
					$('#firefront').on('click', function () {
						var contagem = localStorage.getItem('contagem');

						if (contagem == null) {
							localStorage.setItem('contagem', '1');
							//app.dialog.alert(contagem);
						} else {

							if (contagem == '5') {

								var dialog = app.dialog.create({
									title: '<b>MODO ADMINISTRADOR</b>',
									text: 'Acesso restrito',
									content: '<div class="dialog-input-field item-input"><div class="item-input-wrap"><input class="dialog-input" type="password" placeholder="Qual é a senha?" required validate ></div></div>',
									buttons: [{ text: '<b><i class="mdi mdi-login"></i> Acessar</b>' }, { text: '<span style="color:gray">Cancelar</span>' }],
									onClick: function (dialog, index) {
										if (index == 1) {
											//CANCELADO
											app.dialog.close();
										} else {
											//ACESSAR
											var senha = dialog.$el.find('.dialog-input').val();
											app.dialog.preloader('Verificando');

											$.ajax({
												type: 'POST',
												data: { senha: senha, chave: 'ok' },
												url: 'https://interappctive.com/Curso_Apps_Youtuber/login-youtube.php',
												crossDomain: true,

												success: function (respost) {

													if (respost == 0) {
														app.dialog.close();

														app.dialog.alert('Nenhum usuário encontrado com este login / senha. Tente novamente!', '<i class="mdi mdi-alert-circle"></i> <b>Login Inválido</b>');
														return false;

													}

													if (respost !== 0) {
														app.dialog.close();

														//DESENCAPSULA OS DADOS DA RESPOSTA
														var dados = JSON.parse(respost);

														//ARMAZENA CADA ITEM DO USUARIO EM UM LOCALSTORAGE
														localStorage.setItem("canal", dados.canal);
														localStorage.setItem("apikey", dados.apikey);


														//REDIRECIONA PARA PAGINA PRINCIPAL
														app.views.main.router.navigate('/admin/');

													}



												},

												error: function (erro) {
													app.dialog.close();

													app.dialog.alert('Falha em se comunicar com servidor. Por favor, tente novamente!');



												}

											});
										}

									},
									on: {
										open: function () {
											localStorage.setItem('contagem', '1');
										}
									}
								}).open();


							} else {
								var soma = parseInt(contagem) + parseInt(1);
								localStorage.setItem('contagem', soma);
								//app.dialog.alert(contagem);
							}

						}



					});



				}
			}
		},

		{
			path: '/admin/',
			url: 'admin.html',
			on: {
				pageInit: function (event, page) {

					app.panel.close();

					$("#enviarNotificacao").on("click", function () {
						var tituloNot = $("#tituloNotificacao").val();
						var conteudoNot = $("#conteudoNotificacao").val();

						if (tituloNot == '' || conteudoNot == '') {
							app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
						} else {
							app.dialog.preloader('Enviando Notificação');
							$.ajax({
								type: 'POST',
								data: { titulo: tituloNot, conteudo: conteudoNot, chave: 'ok' },
								url: 'https://interappctive.com/admciabm/notificacao-push.php',
								crossDomain: true,

								success: function (respost) {

									if (respost !== 0) {
										app.dialog.close();
										app.dialog.alert('Enviado com sucesso!', '<b>NOTIFICAÇÃO ENVIADA</b>');
									}

									if (respost == 0) {
										app.dialog.close();
										app.dialog.alert('Por favor tente novamente...', '<b>Houve um problema</b>');
									}

								},

								error: function (erro) {
									app.dialog.close();

									app.dialog.alert('Falha em se comunicar com servidor. Por favor, tente novamente!');


								}

							});
						}

					});



					app.dialog.preloader('carregando');

					//REQUISIÇÃO AJAX - MOSTRAR EDIFICACAO
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/alteracoes_log2cia5bbm.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#log2cia5bbm").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});


					app.dialog.preloader('carregando');

					//REQUISIÇÃO AJAX - MOSTRAR EDIFICACAO
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/alteracoes_huc2cia5bbm.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#sat2cia5bbm").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

				}
			}
		},

		{
			path: '/gerencia/',
			url: 'gerencia.html',
			on: {
				pageInit: function (event, page) {

					/*/Função para mostrar as viaturas que estão próximas a receber manutenção preventiva
					app.dialog.preloader('Carregando');
					var unidade = localStorage.getItem('unidade');

					$.ajax({
						type: 'POST',
						data: { unidade: unidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_vtrs.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".vtrs_bbm").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});
				});*/

					$('#exit_delete').on('click', function () {
						$('#cadastro_relatorio').removeClass('display-none');
						$('#fechar_busca').addClass('display-none');
						$('#relatorios_alteracoes').addClass('display-none');
						$('#agendar_manutencao').addClass('display-none');

					});

					$('#verifica_alteracao').on('click', function () {
						$('.fechar_busca').removeClass('display-none');
						$('#agendar_manutencao').addClass('display-none');
						$('#cadastro_relatorio').addClass('display-none');
						$('#relatorios_alteracoes').removeClass('display-none');


						/*/Mostrar alteracoes registradas nas conferencias de mapacarga
						app.dialog.preloader('carregando');
						var subunidade = localStorage.getItem('subunidade');
						//REQUISIÇÃO AJAX - MAPACARGA ABTS
						$.ajax({
						 type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						 data: {subunidade: subunidade, chave:'exemplo'}, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						 url: 'https://interappctive.com/admciabm/puxaralteracao_viaturas.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 
						 
						 //SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						 success: function (resposta) {
								
								if (resposta!==0){
								app.dialog.close();
								$("#oficina_viaturas").removeClass('display-none');
								$("#manutencao_viatura").html(resposta);
								}
								
								if (resposta==0){
									app.dialog.alert('Houve um problema. Tente novamente');
								}
								
							},
								
							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');								   
							},
								
							complete: function(){
								
							}
			
							});*/

						//Mostrar alteracoes registradas nos trafegos
						/*app.dialog.preloader('carregando');
						var subunidade = localStorage.getItem('subunidade');
						//REQUISIÇÃO AJAX - MAPACARGA ABTS
						$.ajax({
						 type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						 data: {subunidade: subunidade, chave:'exemplo'}, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						 url: 'https://interappctive.com/admciabm/puxaralteracao_trafego.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 
						 
						 //SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						 success: function (resposta) {
								
								if (resposta!==0){
								app.dialog.close();
								$(".alteracoes_trafego").removeClass('display-none');
								$("#alteracoes_trafego").html(resposta);
								}
								
								if (resposta==0){
									app.dialog.alert('Houve um problema. Tente novamente');
								}
								
							},
								
							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');								   
							},
								
							complete: function(){
								
							}
			
							});*/

						//Mostrar alteracoes registradas na lista do condutor
						app.dialog.preloader('carregando');
						var subunidade = localStorage.getItem('subunidade');
						//REQUISIÇÃO AJAX - MAPACARGA ABTS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/puxaralteracao_condutor.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$(".alteracoes_condutor").removeClass('display-none');
									$("#alteracoes_condutor").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

						//Mostrar alteracoes registradas nas conferencias de mapacarga
						app.dialog.preloader('carregando');
						var subunidade = localStorage.getItem('subunidade');
						//REQUISIÇÃO AJAX - MAPACARGA ABTS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/puxaralteracao_mapacarga.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#oficina_equipamentos").removeClass('display-none');
									$("#manutencao_equipamento").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

						/*/Mostrar alteracoes registradas nas conferencias de patrimônio
						app.dialog.preloader('carregando');
						var subunidade = localStorage.getItem('subunidade');
						//REQUISIÇÃO AJAX - MAPACARGA ABTS
						$.ajax({
						 type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						 data: {subunidade: subunidade, chave:'exemplo'}, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						 url: 'https://interappctive.com/admciabm/puxaralteracao_patrimonio.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 
						 
						 //SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						 success: function (resposta) {
								
								if (resposta!==0){
								app.dialog.close();
								$("#alteracao_patrimonio").removeClass('display-none');
								$("#manutencao_patrimonio").html(resposta);
								
								}
								
								if (resposta==0){
									app.dialog.alert('Houve um problema. Tente novamente');
								}
								
							},
								
							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');								   
							},
								
							complete: function(){
								
							}
			
							});*/
					});

					$('#cadastrar_manutencao').on('click', function () {
						$('#agendar_manutencao').removeClass('display-none');
						$('#cadastro_relatorio').addClass('display-none');
						$('#relatorios_alteracoes').addClass('display-none');
						$('#fechar_busca').removeClass('display-none');

						//Função para mostrar as viaturas no campo select do controle de tráfego de viaturas
						app.dialog.preloader('Carregando');
						var unidade = localStorage.getItem('unidade');

						$.ajax({
							type: 'POST',
							data: { unidade: unidade, chave: 'chave' },
							url: 'https://interappctive.com/admciabm/opcoes_vtrs.php',

							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$(".vtrs_bbm").html(resposta);


								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});
					});

					//FUNÇÃO PARA INSERIR OS VALORES NA TABELA DE TRÁFEGO DAS VIATURAS 
					$("#BotaoAgendar_Manutencao").on("click", function () {
						app.dialog.confirm('Deseja agendar uma manutenção?', '<b>Atenção!</b>', function () {

							//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
							var campoVtr = $("#viatura").val();
							var campoNomemilitar = localStorage.getItem('nomemilitar');
							var campoData = $("#data_previsao").val();
							var campoServico = $("#servico_manutencao").val();
							var campoKmprevisto = $("#km_previsao").val();
							var subunidade = localStorage.getItem('subunidade');


							//SE OS CAMPOS INPUTS FOREM VAZIOS NÃO PERMITE INSERIR OS DADOS NO BANCO
							if (campoVtr == '' || campoNomemilitar == '' || campoData == '' || campoServico == '' || campoKmprevisto == '' || subunidade == '') {
								app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
							} else {

								//PRELOADER
								app.dialog.preloader('Salvando...');

								//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
								$.ajax({
									type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
									data: { campoVtr: campoVtr, campoNomemilitar: campoNomemilitar, campoData: campoData, campoServico: campoServico, campoKmprevisto: campoKmprevisto, subunidade: subunidade, Chave: 'wfdal6$' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
									url: 'https://interappctive.com/admciabm/agenda_manutencao.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

									//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
									success: function (resposta) {

										if (resposta == 1) {
											//FECHA O DIALOG LOADING
											app.dialog.close();
											app.dialog.alert('Informações Registradas', '<b>SUCESSO!</b>');

											$('#agendar_manutencao').addClass('display-none');
											$('#cadastro_relatorio').removeClass('display-none');
											$('#relatorios_alteracoes').addClass('display-none');

											app.views.main.router.refreshPage();
											app.dialog.close();

										}
										//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
										if (resposta == 0) {
											app.dialog.close;
											app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
										}
									},

									//SE RETORNAR UM ERRO
									error: function (erro) {
										app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
									},

									//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
									complete: function () {
									}

								});
							}
						});
					});

				}
			}
		},

		{
			path: '/cadastros/',
			url: 'cadastros.html',
			on: {
				pageInit: function (event, page) {

					//Criar Validação para acesso aos recursos de gerência
					var proj_piloto = localStorage.getItem('nomemilitar');

					if (proj_piloto == "Lucas Lourenção") {
						$("#cad-subunidade").removeClass("display-none");
						$("#cad-unidade").removeClass("display-none");

					}

					var perfil_cadastros = localStorage.getItem('perfil');

					if (perfil_cadastros == '') {
						$("#cadastro_de_usuarios").addClass("display-none");
						$("#cadastro_de_viaturas").addClass("display-none");
						$("#cadastro_de_areas").addClass("display-none");
						$("#arrow_left_perfil").addClass("display-none");
						$("#arrow_left_normal").removeClass("display-none");

					}

					//Prrenchimento automático do militar que realiza os cadastramentos 
					var militar = localStorage.getItem('nomemilitar');

					if (militar !== "" || militar !== null) {
						$("#militar").val(militar);
					}

					//Prenchimento automático do obm do militar que realiza os cadastramentos 
					var quartel = localStorage.getItem('unidade');

					if (quartel !== "" || quartel !== null) {
						$("#quartel").val(quartel);
					}

					var subquartel = localStorage.getItem('subunidade');

					if (subquartel !== "" || subquartel !== null) {
						$("#subquartel").val(subquartel);
					}

					//Função para mostrar os registros no BD assim que inicia o App - SELECT UNIDADES
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_obms.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".lotacao_obm").html(resposta);

							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//Função para mostrar os registros no BD assim que inicia o App - SELECT SUBUNIDADES
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_subobms.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".lotacao_subobm").html(resposta);

							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					$('#Cadcadastra').click(function () {

						var nome = $$("#CadnomeCadastro").val();
						var patente = $$("#CadpatenteCadastro").val();
						var nomeguerra = $$("#CadnguerraCadastro").val();
						var NF = $$("#CadfuncionalCadastro").val();
						var obm = $$("#CadobmCadastro").val();
						var subobm = $$("#CadsubobmCadastro").val();
						var perfil = $$("#CadperfilCadastro").val();
						var email = $$("#CademailCadastro").val();
						var senha = $$("#CadsenhaCadastro").val();
						var RepeteSenha = $$("#CadrepeteSenhaCadastro").val();

						//Militar que irá realizar o cadastro
						var militar = $("#militar").val();

						if ((nome == '') || (patente == '') || (nomeguerra == '') || (NF == '') || (obm == '') || (subobm == '') || (senha == '') || (email == '') || (RepeteSenha == '') || (militar == '')) { //|| (dataNascimento =='') || (posto =='')
							app.dialog.alert('Por favor, todos os campos sao obrigatorios.', '<i class="mdi mdi-alert"></i> Campos faltando!');
							return false;
						}

						if ((nome !== '') && (patente !== '') && (nomeguerra !== '') && (NF !== '') && (obm !== '') && (subobm !== '') && (email !== '') && (senha !== '') && (RepeteSenha !== '') && (militar !== '')) { // &&(dataNascimento !== '') &&(posto !== '')

							//VALIDACAO DO EMAIL
							var sEmail = email;
							// filtros
							var emailFilter = /^.+@.+\..{2,}$/;
							var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/
							// condicao
							if (!(emailFilter.test(sEmail)) || sEmail.match(illegalChars)) {
								//EMAIL INVALIDO
								app.dialog.alert('Por favor, informe um e-mail valido!', '<i class="mdi mdi-alert"></i> E-mail Invalido');
								return false;

							} else {
								//VERIFICAR SE AS SENHAS SAO IGUAIS
								if (senha == RepeteSenha) {
									//SENHAS SAO IGUAIS - VERIFICAR O CHECKBOX
									//EMAIL E VALIDO
									if (($("#CadcheckPolitica").is(":checked")) && ($("#CadcheckTermos").is(":checked"))) {
										//TA TUDO OK
										//TUDO OK
										//AJAX PARA CADASTRAR
										app.dialog.preloader('Cadastrando');

										$.ajax({
											type: 'POST',
											data: { nome: nome, patente: patente, nomeguerra: nomeguerra, NF: NF, obm: obm, subobm: subobm, perfil: perfil, email: email, senha: senha, militar: militar, valida: 'ok' }, //datanascimento:dataNascimento, posto: posto,
											url: 'https://interappctive.com/admciabm/cadastraadmciabm.php',
											crossDomain: true,

											success: function (resposta) {

												if (resposta == 0) {
													app.dialog.close();
													//Limpar os campos Inputs
													$("#CadnomeCadastro").val('');
													$("#CadpatenteCadastro").val('');
													$("#CadnguerraCadastro").val('');
													$("#CadfuncionalCadastro").val('');
													$("#CadobmCadastro").val('');
													$("#CadsubobmCadastro").val('');
													$("#CadperfilCadastro").val('');
													$("#CademailCadastro").val('');
													$("#CadsenhaCadastro").val('');
													$("#CadrepeteSenhaCadastro").val('');

													app.dialog.alert('Tudo certo. Um email foi enviado para endere&ccedil;o cadastrado. Caso esque&ccedil;a a senha verifique este email.', '<i class="mdi mdi-email-check-outline"></i> <b>Cadastrado!</b>', function () {



													});



												}

												if (resposta == 1) {
													app.dialog.close();
													app.dialog.alert('Por favor tente novamente!', 'Falhou...');

												}

												if (resposta == 3) {
													app.dialog.close();

													app.dialog.alert('Por favor, informe outro email!', '<i class="mdi mdi-email-lock"></i> <b>Email j&aacute; Cadastrado</b>');



												}



											},

											error: function (erro) {
												app.dialog.close();

												app.dialog.alert('Falha em se comunicar com servidor. Por favor, tente novamente!');

											}

										});



									} else {
										app.dialog.alert("É preciso aceitar as <b>Políticas de Privacidade</b> e também os <b>Termos de Uso</b> para se cadastrar.", "<i class='mdi mdi-alert'></i> Aceitar Termos");
									}


								} else {
									app.dialog.alert('A senha e a repetição da senha não são iguais!', '<i class="mdi mdi-alert"></i> Senha e Repetição de Senha');
									return false;
								}




							}


						}


					});

					//CADASTRAR UNIDADE
					$("#cadastrar_unidade").on("click", function () {



						var obm = $("#cadastro_obm").val();
						var militar = $("#militar").val();

						if (obm == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Salvando...');
							$.ajax({
								type: 'POST',
								data: { obm: obm, militar: militar, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/cadastrar_unidade.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Limpar campo Input
										$("#cadastro_obm").val('');
										$("#cadastro_subobm").val('');
										app.dialog.alert('Cadastro Realizado!', '<b>Sucesso!</b>');
									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});

					//CADASTRAR SUBUNIDADE
					$("#cadastrar_subunidade").on("click", function () {



						var subobm = $("#cadastro_subobm").val();
						var militar = $("#militar").val();

						if (subobm == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Salvando...');
							$.ajax({
								type: 'POST',
								data: { subobm: subobm, militar: militar, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/cadastrar_subunidade.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Limpar campo Input
										app.dialog.alert('Cadastro Realizado!', '<b>Sucesso!</b>');
										$("#cadastro_subobm").val('');

									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});


					//CADASTRAR VIATURA
					$("#cadastrar_viatura").on("click", function () {
						var sub_unidade = localStorage.getItem('subunidade');

						if (sub_unidade !== "" || sub_unidade !== null) {
							$("#subunidade").val(sub_unidade);
						}

						var prefixo = $("#prefixo_vtr").val();
						var tipologia = $("#tipologia_vtr").val();
						//VARIÁVEIS OBM CAPTURADA NO LOCALSTORAGE AUTOMATICAMENTE (OBM DE LOTAÇÃO DO MILITAR E O MILITAR)
						var obm = $("#quartel").val();
						var subobm = $("#subunidade").val();
						var militar = $("#militar").val();

						if (prefixo == '' || tipologia == '' || obm == '' || subobm == '' || militar == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Salvando...');
							$.ajax({
								type: 'POST',
								data: { prefixo: prefixo, tipologia: tipologia, obm: obm, subobm: subobm, militar: militar, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/cadastrar_viatura.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Limpar campo Input
										app.dialog.alert('Cadastro Realizado!', '<b>Sucesso!</b>');
										$("#prefixo_vtr").val('');
										$("#tipologia_vtr").val('');
									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});

					//CADASTRAR EQUIPAMENTOS E MATERIAIS
					$("#cadastrar_material").on("click", function () {

						var equipamento = $("#equipamento_material").val();
						//VARIÁVEIS OBM CAPTURADA NO LOCALSTORAGE AUTOMATICAMENTE (OBM DE LOTAÇÃO DO MILITAR E O MILITAR)
						var unidade = localStorage.getItem('unidade');
						var subunidade = localStorage.getItem('subunidade');
						var militar = $("#militar").val();

						if (unidade == '' || equipamento == '' || militar == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Salvando...');
							$.ajax({
								type: 'POST',
								data: { unidade: unidade, subunidade: subunidade, equipamento: equipamento, militar: militar, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/cadastro_materiais.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Limpar Campo Input
										app.dialog.alert('Cadastro Realizado!', '<b>Sucesso!</b>');
										$("#equipamento_material").val('');
									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});

					//Função para mostrar as atividades da rotina operacional
					var subunidade = subquartel;
					$.ajax({
						type: 'POST',
						data: { subunidade: subunidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_atividades.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".mapa-carga").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//CADASTRAR EQUIPAMENTOS E MATERIAIS
					$("#cadastrar_ambiente").on("click", function () {
						var sub_unidade = localStorage.getItem('subunidade');

						if (sub_unidade !== "" || sub_unidade !== null) {
							$("#subunidade").val(sub_unidade);
						}

						var area_carga = $("#area-de-carga").val();
						//VARIÁVEIS OBM CAPTURADA NO LOCALSTORAGE AUTOMATICAMENTE (OBM DE LOTAÇÃO DO MILITAR E O MILITAR)
						var obm = $("#quartel").val();
						var subobm = $("#subunidade").val();
						var militar = $("#militar").val();

						if (obm == '' || subunidade == '' || militar == '' || area_carga == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Salvando...');
							$.ajax({
								type: 'POST',
								data: { obm: obm, subobm: subobm, area_carga: area_carga, militar: militar, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/cadastro_area_mapacarga.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										app.dialog.alert('Cadastro Realizado!', '<b>Sucesso!</b>');
										//Limpar Campo Input
										$("#area-de-carga").val('');
									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});

					//CADASTRAR EQUIPAMENTOS E MATERIAIS
					$("#cadastrar_compartimento").on("click", function () {
						var unidade = localStorage.getItem('unidade');
						var subunidade = localStorage.getItem('subunidade');
						var militar = localStorage.getItem('nomemilitar');

						var compartimento_carga = $("#inserir_compartimento").val();

						if (unidade == '' || subunidade == '' || militar == '' || compartimento_carga == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Salvando...');
							$.ajax({
								type: 'POST',
								data: { unidade: unidade, subunidade: subunidade, compartimento_carga: compartimento_carga, militar: militar, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/cadastrar_compartimento.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										app.dialog.alert('Cadastro Realizado!', '<b>Sucesso!</b>');

									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});



				}
			}
		},

		{
			path: '/logistica/',
			url: 'logistica.html',
			on: {
				pageInit: function (event, page) {

					//Criar Validação para acesso aos recursos de gerência
					var proj_piloto = localStorage.getItem('nomemilitar');

					if (proj_piloto == "Lucas Lourenção") {
						$("#cad-subunidade").removeClass("display-none");
						$("#cad-unidade").removeClass("display-none");
						$("#cad-rel-mapacarga").removeClass("display-none");
						$("#cad-rel-patrimonio").removeClass("display-none");
						$("#relatorios").removeClass("display-none");
						$("#relatorio_trafegodel").removeClass("display-none");
						$("#relatorio_cauteladel").removeClass("display-none");

					}

					// Prompt - PESQUISAR NOME
					$$('#pesquisar_trafego').on('click', function () {

						var parametro_pesquisa = $("#parametro_pesquisa").val();
						var subunidade = $("#subunidade").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, parametro_pesquisa: parametro_pesquisa, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_trafego.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#trafego").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					app.dialog.preloader('carregando');
					var subunidade = localStorage.getItem('subunidade');

					//REQUISIÇÃO AJAX - MOSTRAR CORRIDAS
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { subunidade: subunidade, chave: 'w&Fdal6s' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/relatorio_trafegodel.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#trafego").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					app.dialog.preloader('carregando');
					var subunidade = localStorage.getItem('subunidade');

					//REQUISIÇÃO AJAX - MOSTRAR CORRIDAS
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { subunidade: subunidade, chave: 'w&Fdal6s' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/relatorio_cauteladel.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#lista_cautela").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//MOSTRAR CORRIDAS
					$('.refresh').on('click', function () {

						app.dialog.preloader('carregando');
						var subunidade = localStorage.getItem('subunidade');

						//REQUISIÇÃO AJAX - MOSTRAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/puxar_cautelavtr.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_cautela").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					// Prompt - PESQUISAR VIATURA
					$$('#pesquisacobom').on('click', function () {

						var subunidade = localStorage.getItem('subunidade')
						var parametro_pesquisa = $(".parametro_pesquisa").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, parametro_pesquisa: parametro_pesquisa, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_cautelavtr.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_cautela").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					app.dialog.preloader('Carregando');
					var subunidade = localStorage.getItem('subunidade');

					$.ajax({
						type: 'POST',
						data: { subunidade: subunidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/puxar_manutencaoprev_vtr.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#monitoramento_vtr").html(resposta);


							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});



				}
			}
		},

		{
			path: '/cadastro_usuarios/',
			url: 'cadastro_usuarios.html',
			on: {
				pageInit: function (event, page) {

					$('#refresh').on('click', function () {
						app.views.main.router.refreshPage();
						app.dialog.close();
					});

					//Prrenchimento automático do militar que realiza as edições dos cadastramentos 
					var militar = localStorage.getItem('nomemilitar');

					//Função para mostrar os registros no BD assim que inicia o App
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/puxar_cadastrados.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#militares_cadastrados").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//Função para mostrar as opções de OBMs
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_obms.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".lotacao_obm").html(resposta);

							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//Função para mostrar as opções de SubOBMs
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_subobms.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".lotacao_subobm").html(resposta);

							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					$("#BotaoEditar").on("click", function () {

						var nome = $("#camponome").val();
						var patente = $("#campopatente").val();
						var nomeguerra = $("#camponomeguerra").val();
						var funcional = $("#campofuncional").val();
						var obm = $("#campoobm").val();
						var subobm = $("#camposubobm").val();
						var perfil = $("#campoperfil").val();
						var militar = $("#militar").val();
						var e_mail = $("#CademailCadastro").val();
						var id = $("#CampoID").val();

						if (nome == '' || patente == '' || nomeguerra == '' || funcional == '' || obm == '' || subobm == '' || militar == '' || e_mail == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Atualizando...');
							$.ajax({
								type: 'POST',
								data: { nome: nome, patente: patente, nomeguerra: nomeguerra, funcional: funcional, obm: obm, subobm: subobm, perfil: perfil, militar: militar, e_mail, e_mail, id: id, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/atualizar_cadastro.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Limpar Campos Input
										$("#camponome").val('');
										$("#campopatente").val('');
										$("#camponomeguerra").val('');
										$("#campofuncional").val('');
										$("#campoobm").val('');
										$("#campoperfil").val('');
										$("#militar").val('');
										$("#CademailCadastro").val('');
										$("#CampoID").val('');

										$("#cad_email").addClass("display-none");
										app.views.main.router.refreshPage();
										app.dialog.close();

									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});

					// Prompt - PESQUISAR NOME
					$$('#pesquisa_banco').on('click', function () {

						var parametro_pesquisa = $("#parametro_usuario").val();
						var subunidade = localStorage.getItem('subunidade');
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, parametro_pesquisa: parametro_pesquisa, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_usuarios.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#militares_cadastrados").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});


				}
			}
		},

		{
			path: '/cadastro_viaturas/',
			url: 'cadastro_viaturas.html',
			on: {
				pageInit: function (event, page) {

					//Penchimento automático do militar que realiza as edições dos cadastramentos 
					var militar = localStorage.getItem('nomemilitar');
					var unidade = localStorage.getItem('unidade');
					var subunidade = localStorage.getItem('subunidade');


					//CADASTRO DE VIATURAS

					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/puxar_viaturas.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#viaturas_cadastradas").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});



					$("#BotaoEditar_vtr").on("click", function () {


						var prefixo = $("#prefixo_vtr").val();
						var tipologia = $("#tipologia_vtr").val();
						var unidade = localStorage.getItem('unidade');
						var subunidade = localStorage.getItem('subunidade');
						var militar = localStorage.getItem('nomemilitar');
						var id = $("#CampoID").val();

						if (prefixo == '' || tipologia == '' || unidade == '' || subunidade == '' || militar == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Atualizando...');
							$.ajax({
								type: 'POST',
								data: { prefixo: prefixo, tipologia: tipologia, unidade: unidade, subunidade: subunidade, militar: militar, id: id, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/atualizar_viatura.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Esconde o campo de edição
										$("#BotaoEditar_viatura").addClass('display-none');
										$("#editar_viatura").addClass('display-none');
										//Limpa os campos input
										app.views.main.router.refreshPage();
										app.dialog.close();
									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});

					// Prompt - PESQUISAR VIATURA
					$$('#pesquisa_banco').on('click', function () {

						var unidade = localStorage.getItem('unidade')
						var parametro_pesquisa = $("#parametro_viatura").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { unidade: unidade, parametro_pesquisa: parametro_pesquisa, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_viaturas.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#viaturas_cadastradas").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});


				}
			}
		},

		{
			path: '/cadastro_unidades/',
			url: 'cadastro_unidades.html',
			on: {
				pageInit: function (event, page) {


					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/puxar_unidades.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#unidades_cadastradas").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});



					$("#BotaoEditar_obm").on("click", function () {

						var obm = localStorage.getItem('unidade');
						var militar = localStorage.getItem('nomemilitar');
						var id = $("#CampoID").val();

						if (obm == '' || militar == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Atualizando...');
							$.ajax({
								type: 'POST',
								data: { obm: obm, militar: militar, id: id, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/atualizar_unidade.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Limpar Campo Input
										$("#cadastro_obm").val('');
									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});


				}
			}
		},

		{
			path: '/cadastro_subunidades/',
			url: 'cadastro_subunidades.html',
			on: {
				pageInit: function (event, page) {

					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/puxar_subunidades.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#subunidades_cadastradas").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});



					$("#BotaoEditar_subobm").on("click", function () {

						var subobm = localStorage.getItem('subunidade');
						var militar = localStorage.getItem('nomemilitar');
						var id = $("#CampoID").val();

						if (subobm == '' || militar == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Atualizando...');
							$.ajax({
								type: 'POST',
								data: { subobm: subobm, militar: militar, id: id, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/atualizar_subunidade.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Limpa o campo Input da subunidade
										$("#cadastro_subobm").val('');
									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});


				}
			}
		},

		{
			path: '/cadastro_materiais/',
			url: 'cadastro_materiais.html',
			on: {
				pageInit: function (event, page) {

					//Prenchimento automático do militar que realiza as edições dos cadastramentos 
					var militar = localStorage.getItem('nomemilitar');

					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/puxar_materiais.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#lista_materiais").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					$('#refresh').on('click', function () {
						app.views.main.router.refreshPage();
						app.dialog.close();
					});

					// Prompt - PESQUISAR VIATURA
					$$('#pesquisa_banco').on('click', function () {

						var subunidade = localStorage.getItem('subunidade')
						var parametro_pesquisa = $("#parametro_materiais").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, parametro_pesquisa: parametro_pesquisa, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_material.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_materiais").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					$("#BotaoEditar_material").on("click", function () {

						var equipamento = $("#material").val();
						var militar = localStorage.getItem('nomemilitar');
						var obm = localStorage.getItem('unidade');
						var id = $("#id").val();

						if (equipamento == '' || militar == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Atualizando...');
							$.ajax({
								type: 'POST',
								data: { equipamento: equipamento, militar: militar, id: id, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/atualizar_material.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Limpar campo Input
										$("#material").val('');
										$("#cad_material").addClass("display-none");
										app.views.main.router.refreshPage();

									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});


				}
			}
		},

		{
			path: '/cadastro_compartimentos/',
			url: 'cadastro_compartimentos.html',
			on: {
				pageInit: function (event, page) {

					//Prenchimento automático do militar que realiza as edições dos cadastramentos 
					var militar = localStorage.getItem('nomemilitar');
					var unidade = localStorage.getItem('unidade');
					var subunidade = localStorage.getItem('subunidade');

					//SOlicitação para mostrar compartimentos cadastrados
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { chave: 'chave' },
						url: 'https://interappctive.com/admciabm/puxar_compartimentos.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#lista_compartimentos").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					$("#BotaoEditar_compartimento").on("click", function () {

						var inserir_compartimento = $("#inserir_compartimento").val();
						var militar = $("#militar").val();

						var id = $("#id").val();

						if (inserir_compartimento == '' || militar == '') {
							app.dialog.alert('Preencha todos os campos', 'OPS!');
						} else {
							app.dialog.preloader('Atualizando...');
							$.ajax({
								type: 'POST',
								data: { inserir_compartimento: inserir_compartimento, militar: militar, id: id, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/atualizar_compartimentos.php',

								success: function (resposta) {

									if (resposta == 1) {
										app.dialog.close();
										//Limpar campo Input
										$("#inserir_compartimento").val('');
										$("#cad_compartimento").addClass("display-none");
										app.views.main.router.refreshPage();
										app.dialog.close();


									}

									if (resposta == 0) {
										app.dialog.close();
										app.dialog.alert('Houve um problema ao inserir!');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

					});

					// Prompt - PESQUISAR VIATURA
					$$('#pesquisa_banco').on('click', function () {

						var subunidade = localStorage.getItem('subunidade')
						var parametro_pesquisa = $("#parametro_compartimento").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, parametro_pesquisa: parametro_pesquisa, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_compartimento.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_compartimentos").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});


				}
			}
		},

		{
			path: '/home/',
			url: 'home.html',
			on: {
				pageInit: function (event, page) {

					$('#Fazerlogin').on('click', function () {

						var email = $("#ContaLogin").val();
						var senha = $("#ContaSenha").val();

						if ((email == '') || (senha == '')) {
							app.dialog.alert('Por favor, preencha seu email e senha.', '<i class="mdi mdi-alert"></i> Campos Vazios');

						} else {

							app.dialog.preloader('Fazendo Login');

							$.ajax({
								type: 'POST',
								data: { email: email, senha: senha, chave: '123' },
								url: 'https://interappctive.com/admciabm/login.php',
								crossDomain: true,

								success: function (respost) {

									if (respost == 0) {
										app.dialog.close();

										app.dialog.alert('Nenhum usuário encontrado com este login / senha. Tente novamente!', '<i class="mdi mdi-alert-circle"></i> <b>Login Inválido</b>');
										return false;

									}

									if (respost !== 0) {
										app.dialog.close();

										//DESENCAPSULA OS DADOS DA RESPOSTA
										var dados = JSON.parse(respost);

										//ARMAZENA CADA ITEM DO USUARIO EM UM LOCALSTORAGE
										localStorage.setItem("nomemilitar", dados.nome);
										localStorage.setItem("patente", dados.patente);
										localStorage.setItem("nomeguerra", dados.nomeguerra);
										localStorage.setItem("NFmilitar", dados.NF);
										localStorage.setItem("email", dados.email);
										localStorage.setItem("senha", dados.senha);
										localStorage.setItem("unidade", dados.obm);
										localStorage.setItem("subunidade", dados.subunidade);
										localStorage.setItem("perfil", dados.perfil);

										//REDIRECIONA PARA PAGINA PRINCIPAL
										app.views.main.router.navigate('/admunidadesciabm/');

									}



								},

								error: function (erro) {
									app.dialog.close();

									app.dialog.alert('Falha em se comunicar com servidor. Por favor, tente novamente!');



								}

							});
						}


					});

					//RECUPERAÇÃO DE SENHA
					$('#esqueceuSenha').on('click', function () {
						app.dialog.prompt('Informe o e-mail de login', '<b>SEU EMAIL DE LOGIN</b>', function (email) {

							var email = email;


							app.dialog.preloader('Verificando');

							$.ajax({
								type: 'POST',
								data: { email: email, chave: '123' },
								url: 'https://interappctive.com/admciabm/verificar-email.php',

								success: function (resposta) {


									if (resposta == 0) {
										app.dialog.close();
										app.dialog.prompt('Você recebeu <b><u>no seu email</u></b> um código de verificação para autorizar a criação de uma nova senha. <b>Por favor, informe o código recebido no email</b>:', '<b>CÓDIGO DE VERIFICAÇÃO</b>', function (codigo) {
											localStorage.setItem('emailValido', email);
											validaCodigo(codigo);
										});

									}

									if (resposta == 1) {
										app.dialog.close();
										app.dialog.alert('Por favor, informe um email válido!', '<b>E-MAIL NÃO ENCONTRADO</b>');
									}

									if (resposta == 2) {
										app.dialog.close();
										app.dialog.alert('Houve um problema. Tente novamente', '<b>OPS!</b>');
									}

								},

								error: function (erro) {
									app.dialog.close();
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

							});


						});
					});

					function validaCodigo(codigo) {

						app.dialog.close();
						app.dialog.preloader('Verificando');

						var email = localStorage.getItem('emailValido');

						$.ajax({
							type: 'POST',
							data: { email: email, codigo: codigo, chave: '123' },
							url: 'https://interappctive.com/admciabm/verificar-codigo.php',

							success: function (resposta) {

								if (resposta == 0) {
									app.dialog.close();
									app.dialog.prompt('Informe a nova senha:', '<b>NOVA SENHA</b>', function (senha) {
										criarNovaSenha(senha);
									});

								}

								if (resposta == 1) {
									app.dialog.close();
									app.dialog.alert('Por favor, informe um código válido!', '<b>CÓDIGO INVÁLIDO</b>');
								}

								if (resposta == 2) {
									app.dialog.close();
									app.dialog.alert('Houve um problema. Tente novamente', '<b>OPS!</b>');
								}

							},

							error: function (erro) {
								app.dialog.close();
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},


						});


					}

					function criarNovaSenha(senha) {

						app.dialog.close();

						app.dialog.preloader('Salvando nova senha');
						var email = localStorage.getItem('emailValido');

						$.ajax({
							type: 'POST',
							data: { email: email, senha: senha, chave: '123' },
							url: 'https://interappctive.com/admciabm/salvar-nova-senha.php',

							success: function (resposta) {

								if (resposta == 0) {
									app.dialog.close();
									app.dialog.alert('Nova senha gerada. Você já pode fazer login com ela!', '<b>SUCESSO!</b>');
								}

								if (resposta == 1) {
									app.dialog.close();
									app.dialog.alert('Por favor, informe um código válido!', '<b>CÓDIGO INVÁLIDO</b>');
								}

								if (resposta == 2) {
									app.dialog.close();
									app.dialog.alert('Houve um problema. Tente novamente', '<b>OPS!</b>');
								}

							},

							error: function (erro) {
								app.dialog.close();
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},


						});

					}

					/*setTimeout(function () {
	
						app.dialog.alert('<img src="img/swipe-left.gif" style="max-width:100%">', '');
	
					}, 500);*/

					$('#prev_inc').on('click', function () {
						app.views.main.router.navigate('/sat_prevencao/');
					});



				}
			}
		},

		{
			path: '/admunidadesciabm/',
			url: 'admunidadesciabm.html',
			on: {
				pageInit: function (event, page) {

					//CÓDIGO PARA FECHAR O PAINEL
					app.panel.close();

					//Criar Validação para acesso aos recursos de gerência
					var perfil = localStorage.getItem('perfil');

					if (perfil == '') {
						$("#gerencia").addClass("display-none");

					}

					//Criar Validação para acesso aos recursos de gerência
					var proj_piloto = localStorage.getItem('subunidade');

					if (proj_piloto == "2ªCIA/5°BBM") {
						$("#area_cobonista").removeClass("display-none");
						$("#rotina-operacional").removeClass("display-none");

					}

					//Selecionar a SUBOBM salvo no localStorage
					var subobm = localStorage.getItem('subunidade');
					//Inserir nos campos identificados a SUBOBM
					$("#area_bbm").html(subobm);

					//Selecionar a SUBOBM salvo no localStorage
					var bmlogado = localStorage.getItem('nomeguerra');
					//Inserir nos campos identificados a SUBOBM
					$("#bmlogado").html(bmlogado);

					//Selecionar a SUBOBM salvo no localStorage
					var posto_log = localStorage.getItem('patente');
					//Inserir nos campos identificados a SUBOBM
					$(".posto_log").html(posto_log);

					$("#logoff").on("click", function () {
						app.dialog.confirm('Tem certeza que quer sair?', '<b>Sair</b>', function () {
							localStorage.removeItem('email');
							localStorage.removeItem('senha');
							app.views.main.router.navigate('/login/');
						});
					});

					//PRELOADER
					app.dialog.preloader('Carregando...');
					//REQUISIÇÃO AJAX - VERIFICAÇÃO DE VERSÃO
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/informa_atualizacao_dois.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#versao_vinte_cinco").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});



				}
			}
		},

		{
			path: '/controletrafego/',
			url: 'controletrafego.html',
			on: {
				pageInit: function (event, page) {

					//Prrenchimento automático do militar que realiza as edições dos cadastramentos 
					var unidade = localStorage.getItem('unidade');
					var subunidade = localStorage.getItem('subunidade');

					//Função para mostrar as viaturas no campo select do controle de tráfego de viaturas
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { unidade: unidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_vtrs.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".vtrs_bbm").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//FUNÇÃO PARA INSERIR KM FINAL DO ULTIMO TRAFEGO DA VIATURA NO INPUT DO KM INICIAL DO PRÓXIMO TRAFEGO

					// Prompt - PESQUISAR NOME
					$$('#vtr').on('change', function () {

						var viatura = $("#vtr").val();
						app.dialog.preloader('Buscando KM...');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { viatura: viatura, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/km_inicialvtr.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#kmsaida").val(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					// Pesquisar Trafego
					$$('#pesquisar_trafego').on('click', function () {

						var parametro_pesquisa = $("#parametro_pesquisa").val();
						var subunidade = localStorage.getItem('subunidade');
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, parametro_pesquisa: parametro_pesquisa, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_trafego.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#trafego").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					//Mostrar os tráfegos realizados
					$('#refresh').on('click', function () {

						app.dialog.preloader('carregando');
						var subunidade = localStorage.getItem('subunidade');

						//REQUISIÇÃO AJAX - MOSTRAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, chave: 'w&Fdal6s' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/puxar_trafego.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#trafego").html(resposta);
									$("#carregar_busca").addClass('display-none');
									$("#buscar_trafego").removeClass('display-none');
									$("#registrar_trafego").addClass('display-none');
									$("#fechar_busca").removeClass('display-none');

								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					//SE O LOCALSTORAGE NÃO FOR NULLO OU VAZIO INSERIR OS VALORES INFORMADOS NO INCÍCIO DA VIAGEM

					let viatura_select = localStorage.getItem('viat');

					if (viatura_select !== "" || viatura_select !== null) {
						$("#vtr").val(viatura_select);
					}

					var destino = localStorage.getItem('dest');

					if (destino !== "" || destino !== null) {
						$("#destino").val(destino);
					}

					var horasaida = localStorage.getItem('hsaida');

					if (horasaida !== "" || horasaida !== null) {
						$("#horasaida").val(horasaida);
					}

					let ksaida = localStorage.getItem('kmsaida');

					if (ksaida !== "" || ksaida !== null) {
						$("#kmsaida").val(ksaida);
					}

					var hretorno = localStorage.getItem('hretorno');

					if (hretorno !== "" || hretorno !== null) {
						$("#horachegada").val(hretorno);
					}

					var kmchegada = localStorage.getItem('kmchegada');

					if (kmchegada !== "" || kmchegada !== null) {
						$("#kmchegada").val(kmchegada);
					}

					var alteracoes = localStorage.getItem('alteracoes');

					if (alteracoes !== "" || alteracoes !== null) {
						$("#alteracoes").val(alteracoes);
					}

					//EVENTO ONBLUR PARA ARMAZENAR NO LOCAL STORAGE AUTOMATICAMENTE ASSIM QUE OS CAMPOS INPUTS INFORMADOS NA PARTIDA FOREM PREENCHIDOS E PERDEREM O FOCO
					$("#vtr").on("change", function () {
						let campoviatura = $("#vtr").val();
						localStorage.setItem('viat', campoviatura);
					});

					$("#destino").on("blur", function () {
						var campodestino = $("#destino").val();
						localStorage.setItem('dest', campodestino);
					});

					$("#horasaida").on("blur", function () {
						var campohorariosaida = $("#horasaida").val();
						localStorage.setItem('hsaida', campohorariosaida);
					});

					$("#kmsaida").on("blur", function () {
						let campokmsaida = $("#kmsaida").val();
						localStorage.setItem('kmsaida', campokmsaida);
					});

					$("#horachegada").on("blur", function () {
						var campohorariochegada = $("#horachegada").val();
						localStorage.setItem('hretorno', campohorariochegada);
					});

					$("#kmchegada").on("blur", function () {
						var campokmchegada = $("#kmchegada").val();
						localStorage.setItem('kmchegada', campokmchegada);
					});

					$("#alteracoes").on("click", function () {
						var campoalteracoes = $("#alteracoes").val();
						localStorage.setItem('alteracoes', campoalteracoes);
					});

					//FUNÇÃO PARA INSERIR OS VALORES NA TABELA DE TRÁFEGO DAS VIATURAS 
					$("#BotaoSalvar_trajeto").on("click", function () {
						app.dialog.confirm('Deseja finalizar o Trajeto?', '<b>Atenção!</b>', function () {

							//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
							let campoVtr = $("#vtr").val();
							var campoNomemilitar = localStorage.getItem('nomemilitar');
							var campoFuncional = localStorage.getItem('NFmilitar');
							var campoDestino = $("#destino").val();
							var campoHorasaida = $("#horasaida").val();
							var campoKmsaida = $("#kmsaida").val();
							var campoKmchegada = $("#kmchegada").val();
							var campoAlteracoes = $("#alteracoes").val();
							var obm_trafego = localStorage.getItem('unidade');
							var subobm_trafego = localStorage.getItem('subunidade');

							//Backup do primeiro registro realizado para auditoria
							let campoVtr_bkup = $(".vtr").val();
							var campoNomemilitar_bkup = localStorage.getItem('nomemilitar');
							var campoFuncional_bkup = localStorage.getItem('NFmilitar');
							var campoDestino_bkup = $(".destino").val();
							var campoHorasaida_bkup = $(".horasaida").val();
							var campoKmsaida_bkup = $(".kmsaida").val();
							var campoKmchegada_bkup = $(".kmchegada").val();
							var campoAlteracoes_bkup = $(".alteracoes").val();
							var obm_trafego_bkup = localStorage.getItem('unidade');
							var subobm_trafego_bkup = localStorage.getItem('subunidade');


							//SE OS CAMPOS INPUTS FOREM VAZIOS NÃO PERMITE INSERIR OS DADOS NO BANCO
							if (campoVtr == '' || campoNomemilitar == '' || campoFuncional == '' || campoDestino == '' || campoHorasaida == '' || campoKmsaida == '' || campoKmchegada == '' || obm_trafego == '' || subobm_trafego == '') {
								app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
							} else {

								//PRELOADER
								app.dialog.preloader('Salvando...');

								//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
								$.ajax({
									type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
									data: {
										Viatura: campoVtr, Militar: campoNomemilitar, Funcional: campoFuncional, Destino: campoDestino, Saida: campoHorasaida, Kmsaida: campoKmsaida, Kmchegada: campoKmchegada, Alteracoes: campoAlteracoes, obm_trafego: obm_trafego,
										subobm_trafego: subobm_trafego, Viatura_bkup: campoVtr_bkup, Militar_bkup: campoNomemilitar_bkup, Funcional_bkup: campoFuncional_bkup, Destino_bkup: campoDestino_bkup, Saida_bkup: campoHorasaida_bkup, Kmsaida_bkup: campoKmsaida_bkup, Kmchegada_bkup: campoKmchegada_bkup, Alteracoes_bkup: campoAlteracoes_bkup, obm_trafego_bkup: obm_trafego_bkup, subobm_trafego_bkup: subobm_trafego_bkup, Chave: 'exemplo'
									}, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
									url: 'https://interappctive.com/admciabm/inseretrafego_teste.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

									//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
									success: function (resposta) {

										if (resposta == 1) {
											//FECHA O DIALOG LOADING
											app.dialog.close();
											app.dialog.alert('Informações Registradas', '<b>SUCESSO!</b>');

											//LIMPA O LOCAL STORAGE APÓS A INSERÇAÕ DOS DADOS NO BANCO, LIBERANDO OS CAMPOS INPUT COM AS INFORMAÇÕES DE PARTIDA
											localStorage.removeItem('viat');
											localStorage.removeItem('dest');
											localStorage.removeItem('hsaida');
											localStorage.removeItem('ksaida');
											localStorage.removeItem('hretorno');
											localStorage.removeItem('kmsaida');
											localStorage.removeItem('kmchegada');
											localStorage.removeItem('alteracoes');

											//COMANDOS PARA, APÓS DAR CERTO A REQUISIÇÃO AJAX, ESVAZIA OS CAMPOS INPUTS
											app.views.main.router.refreshPage();
											app.dialog.close();


										}
										//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
										if (resposta == 0) {
											app.dialog.close;
											app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
										}
									},

									//SE RETORNAR UM ERRO
									error: function (erro) {
										app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
									},

									//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
									complete: function () {
									}

								});
							}
						});
					});

					//FUNÇÃO PARA INSERIR OS VALORES NA TABELA DE TRÁFEGO DAS VIATURAS 
					$("#BotaoEditar_trajeto").on("click", function () {
						app.dialog.confirm('Deseja Editar o Trajeto?', '<b>Atenção!</b>', function () {

							//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
							var campoVtr = $("#vtr_edicao").val();
							var campoDestino = $("#destino").val();
							var campoHorasaida = $("#horasaida").val();
							var campoKmsaida = $("#kmsaida").val();
							var campoHorachegada = $("#horachegada").val();
							var campoKmchegada = $("#kmchegada").val();
							var campoAlteracoes = $("#alteracoes").val();
							var obm_trafego = localStorage.getItem('unidade');
							var subobm_trafego = localStorage.getItem('subunidade');

							var milico = localStorage.getItem('nomemilitar')
							var campoData = $("#data_atualizacao").val();
							var campoAtualizaNomemilitar = $("#AtualizaNomemilitar").val();
							var id = $("#id").val();

							if (milico !== campoAtualizaNomemilitar) {
								app.dialog.confirm('Somente o condutor pode editar o tráfego registrado.', '<b>ATENÇÃO!</b>')
							} else {

								//SE OS CAMPOS INPUTS FOREM VAZIOS NÃO PERMITE INSERIR OS DADOS NO BANCO
								if (campoVtr == '' || campoDestino == '' || campoHorasaida == '' || campoKmsaida == '' || campoHorachegada == '' || campoKmchegada == '' || campoData == '' || campoAtualizaNomemilitar == '') {
									app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
								} else {

									//PRELOADER
									app.dialog.preloader('Atualizando...');

									//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
									$.ajax({
										type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
										data: { campoVtr: campoVtr, campoDestino: campoDestino, campoHorasaida: campoHorasaida, campoKmsaida: campoKmsaida, campoHorachegada: campoHorachegada, campoKmchegada: campoKmchegada, campoAlteracoes: campoAlteracoes, obm_trafego: obm_trafego, subobm_trafego: subobm_trafego, campoData: campoData, campoAtualizaNomemilitar: campoAtualizaNomemilitar, id: id, milico: milico, Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
										url: 'https://interappctive.com/admciabm/atualizar_trafego.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

										//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
										success: function (resposta) {

											if (resposta == 1) {
												//FECHA O DIALOG LOADING
												app.dialog.close();
												app.dialog.alert('Informações Atualizadas', '<b>SUCESSO!</b>');
												$(".data_trafego").addClass('display-none');
												$("#BotaoEditar_trajeto").addClass('display-none');
												$("#BotaoSalvar_trajeto").removeClass('display-none');
												$("#hora-chegada").addClass('display-none');
												$("#salva_vtr").addClass('display-none');
												$("#buscar_trafego").addClass('display-none');
												$("#fechar_busca").addClass('display-none');

												//LIMPA O LOCAL STORAGE APÓS A INSERÇAÕ DOS DADOS NO BANCO, LIBERANDO OS CAMPOS INPUT COM AS INFORMAÇÕES DE PARTIDA
												localStorage.removeItem('viat');
												localStorage.removeItem('dest');
												localStorage.removeItem('hsaida');
												localStorage.removeItem('ksaida');
												localStorage.removeItem('hretorno');
												localStorage.removeItem('kmsaida');
												localStorage.removeItem('kmchegada');
												localStorage.removeItem('alteracoes');

												//COMANDOS PARA, APÓS DAR CERTO A REQUISIÇÃO AJAX, ESVAZIA OS CAMPOS INPUTS
												app.views.main.router.refreshPage();
												app.dialog.close();


											}
											//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
											if (resposta == 0) {
												app.dialog.close;
												app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
											}
										},

										//SE RETORNAR UM ERRO
										error: function (erro) {
											app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
										},

										//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
										complete: function () {
										}

									});
								}
							}
						});
					});


					//Mostrar os tráfegos realizados
					$('#exit_delete').on('click', function () {
						$("#carregar_busca").removeClass('display-none');
						$("#buscar_trafego").addClass('display-none');
						$("#registrar_trafego").removeClass('display-none');
						$("#fechar_busca").addClass('display-none');

						//LIMPA O LOCAL STORAGE APÓS A INSERÇAÕ DOS DADOS NO BANCO, LIBERANDO OS CAMPOS INPUT COM AS INFORMAÇÕES DE PARTIDA
						localStorage.removeItem('viat');
						localStorage.removeItem('dest');
						localStorage.removeItem('hsaida');
						localStorage.removeItem('ksaida');
						localStorage.removeItem('hretorno');
						localStorage.removeItem('kmsaida');
						localStorage.removeItem('kmchegada');
						localStorage.removeItem('alteracoes');

						//Limpa os campos input
						app.views.main.router.refreshPage();
						app.dialog.close();

					});

				}
			}
		},

		{
			path: '/cobom/',
			url: 'cobom.html',
			on: {
				pageInit: function (event, page) {

					app.dialog.preloader('carregando');
					var subunidade = localStorage.getItem('subunidade');

					//REQUISIÇÃO AJAX - MOSTRAR CORRIDAS
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { subunidade: subunidade, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/puxar_vtrs_cauteladas.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#lista_cauteladas").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});


				}
			}
		},

		{
			path: '/controle_cautelavtr/',
			url: 'controle_cautelavtr.html',
			on: {
				pageInit: function (event, page) {

					//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
					var unidade = localStorage.getItem('unidade');
					var subunidade = localStorage.getItem('subunidade');


					//Função para mostrar as viaturas no campo select do controle de tráfego de viaturas
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { unidade: unidade, subunidade: subunidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_vtrs.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".vtrs_bbm").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//Função para mostrar as viaturas no campo select do controle de tráfego de viaturas
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { unidade: unidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_cobonista.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#select_cobonista").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//Função para mostrar as viaturas no campo select do controle de tráfego de viaturas
					app.dialog.preloader('Carregando');

					$.ajax({
						type: 'POST',
						data: { unidade: unidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_condutor.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#select_condutor").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//MOSTRAR CORRIDAS
					$('.refresh').on('click', function () {

						app.dialog.preloader('carregando');
						var subunidade = localStorage.getItem('subunidade');

						//REQUISIÇÃO AJAX - MOSTRAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/puxar_cautelavtr.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_cautela").html(resposta);
									$(".carregar_busca").addClass('display-none');
									$("#buscar_cautela").removeClass('display-none');
									$("#registrar_cautela").addClass('display-none');
									$(".fechar_busca").removeClass('display-none');
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					//Mostrar os tráfegos realizados
					$('.exit_delete').on('click', function () {
						$("#carregar_busca").removeClass('display-none');
						$("#buscar_cautela").addClass('display-none');
						$("#registrar_cautela").removeClass('display-none');
						$("#fechar_busca").addClass('display-none');

						//Limpa os campos input
						app.views.main.router.refreshPage();
						app.dialog.close();

					});

					// Prompt - PESQUISAR VIATURA
					$$('#pesquisacobom').on('click', function () {

						var subunidade = localStorage.getItem('subunidade')
						var parametro_pesquisa = $("#parametro_pesquisa").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, parametro_pesquisa: parametro_pesquisa, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_cautelavtr.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_cautela").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					//FUNÇÃO PARA INSERIR OS VALORES NA TABELA DE TRÁFEGO DAS VIATURAS 
					$("#BotaoSalvar_cautela").on("click", function () {
						app.dialog.confirm('Deseja registrar a Cautela/Descautela da viatura?', '<b>Atenção!</b>', function () {

							//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
							var campoViatura = $("#vtr_cautela").val();
							var campoCautela = $("#cautela_vtr").val();
							var campoCobonista = $("#cobonista").val();
							var campoCondutor = $("#condutor").val();
							var campoDestino = $("#destino").val();
							var campoAlteracoes = $("#alteracoes").val();
							var unidade = localStorage.getItem('unidade');
							var subunidade = localStorage.getItem('subunidade');

							//SE OS CAMPOS INPUTS FOREM VAZIOS NÃO PERMITE INSERIR OS DADOS NO BANCO
							if (campoViatura == '' || campoCautela == '' || campoCobonista == '' || campoCondutor == '' || campoDestino == '' || unidade == '' || subunidade == '') {
								app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
							} else {

								//PRELOADER
								app.dialog.preloader('Salvando...');

								//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
								$.ajax({
									type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
									data: { Viatura: campoViatura, Cautela: campoCautela, Cobonista: campoCobonista, Condutor: campoCondutor, Destino: campoDestino, Alteracoes: campoAlteracoes, unidade: unidade, subunidade, subunidade, Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
									url: 'https://interappctive.com/admciabm/insere_cautelavtr.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

									//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
									success: function (resposta) {

										if (resposta == 1) {
											//FECHA O DIALOG LOADING
											app.dialog.close();
											app.dialog.alert('Informações Registradas', '<b>SUCESSO!</b>');

											//Limpa os campos input
											$("#vtr_cautela").val('');
											$("#cautela_vtr").val('');
											$("#cobonista").val('');
											$("#condutor").val('');
											$("#destino").val('');
											$("#alteracoes").val('');

										}
										//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
										if (resposta == 0) {
											app.dialog.close;
											app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
										}
									},

									//SE RETORNAR UM ERRO
									error: function (erro) {
										app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
									},

									//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
									complete: function () {
									}

								});

								//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
								$.ajax({
									type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
									data: { Viatura: campoViatura, Cautela: campoCautela, Condutor: campoCondutor, subunidade, subunidade, Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
									url: 'https://interappctive.com/admciabm/informa_cautelavtr.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

									//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
									success: function (resposta) {

										if (resposta == 1) {
											//FECHA O DIALOG LOADING
											app.dialog.close();

										}
										//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
										if (resposta == 0) {
											app.dialog.close;
											app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
										}
									},

									//SE RETORNAR UM ERRO
									error: function (erro) {
										app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
									},

									//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
									complete: function () {
									}

								});
							}
						});
					});

					//FUNÇÃO PARA INSERIR OS VALORES NA TABELA DE TRÁFEGO DAS VIATURAS 
					$("#BotaoEditar_cautela").on("click", function () {
						app.dialog.confirm('Deseja editar a cautela?', '<b>Atenção!</b>', function () {

							//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
							var campoViatura = $(".vtr_cautela").val();
							var campoCautela = $(".cautela_vtr").val();
							var campoCobonista = $(".cobonista").val();
							var campoCondutor = $(".condutor").val();
							var campoDestino = $(".destino").val();
							var campoAlteracoes = $(".alteracoes").val();
							var campoData_atualizacao = $(".data_atualizacao").val();
							var campoHora_atualizacao = $(".hora_atualizacao").val();
							var campoAtualizacao = localStorage.getItem('nomemilitar')
							var unidade = localStorage.getItem('unidade')
							var subunidade = localStorage.getItem('subunidade')

							var id = $("#id").val();

							//SE OS CAMPOS INPUTS FOREM VAZIOS NÃO PERMITE INSERIR OS DADOS NO BANCO
							if (campoViatura == '' || campoCautela == '' || campoCobonista == '' || campoCondutor == '' || campoDestino == '' || unidade == '' || subunidade == '' || campoAtualizacao == '' || campoData_atualizacao == '' || campoHora_atualizacao == '') {
								app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
							} else {

								//PRELOADER
								app.dialog.preloader('Salvando...');

								//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
								$.ajax({
									type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
									data: { campoViatura: campoViatura, campoCautela: campoCautela, campoCobonista: campoCobonista, campoCondutor: campoCondutor, campoDestino: campoDestino, campoAlteracoes: campoAlteracoes, unidade: unidade, subunidade, subunidade, campoAtualizacao: campoAtualizacao, campoData_atualizacao: campoData_atualizacao, campoHora_atualizacao: campoHora_atualizacao, id: id, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
									url: 'https://interappctive.com/admciabm/atualizar_cautelavtr.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

									//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
									success: function (resposta) {

										if (resposta == 1) {
											//FECHA O DIALOG LOADING
											app.dialog.close();
											app.dialog.alert('Informações Atualizadas', '<b>SUCESSO!</b>');
											$(".data_trafego").addClass('display-none');
											$("#BotaoEditar_cautela").addClass('display-none');
											$("#BotaoSalvar_cautela").removeClass('display-none');

											$("#buscar_cautela").addClass('display-none');
											$("#fechar_busca").addClass('display-none');

											//Limpa os campos input
											$(".vtr_cautela").val('');
											$(".cautela_vtr").val('');
											$(".cobonista").val('');
											$(".condutor").val('');
											$(".destino").val('');
											$(".alteracoes").val('');
											$(".data_atualizacao").val('');
											$(".hora_atualizacao").val('');

											$("#id").val('');


										}
										//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
										if (resposta == 0) {
											app.dialog.close;
											app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
										}
									},

									//SE RETORNAR UM ERRO
									error: function (erro) {
										app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
									},

									//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
									complete: function () {
									}

								});

								//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
								$.ajax({
									type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
									data: { Viatura: campoViatura, Cautela: campoCautela, Condutor: campoCondutor, subunidade, subunidade, Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
									url: 'https://interappctive.com/admciabm/informa_cautelavtr.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

									//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
									success: function (resposta) {

										if (resposta == 1) {
											//FECHA O DIALOG LOADING
											app.dialog.close();

										}
										//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
										if (resposta == 0) {
											app.dialog.close;
											app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
										}
									},

									//SE RETORNAR UM ERRO
									error: function (erro) {
										app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
									},

									//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
									complete: function () {
									}

								});
							}
						});
					});

					var garage = $('#lista_cauteladas').val();
					if (garage == 'Todas as viaturas estão disponíveis!') {
						$('#garage_full').removeClass('display-none')
					}

				}
			}
		},

		{
			path: '/rotina_operacional/',
			url: 'rotina_operacional.html',
			on: {
				pageInit: function (event, page) {

					$('#confere_carga').on('click', function () {
						$('#area_conferencia').removeClass('display-none');
						$('#inserir_carga').addClass('display-none');
						app.views.main.router.refreshPage();
						app.dialog.close();
					});

					$('#adiciona_carga').on('click', function () {
						$('#area_conferencia').addClass('display-none');
						$('#inserir_carga').removeClass('display-none');
						app.dialog.close();
					});

					//Por padrão carrega o mapa carga do ABTS
					app.dialog.preloader('carregando');
					var subunidade = localStorage.getItem('subunidade');
					//REQUISIÇÃO AJAX - MAPACARGA ABTS
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { subunidade: subunidade, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/mapacarga_abts.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#lista_abts").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					var unidade = localStorage.getItem('unidade');
					var subunidade = localStorage.getItem('subunidade');
					var nomemilitar = localStorage.getItem('nomemilitar');

					$.ajax({
						type: 'POST',
						data: { subunidade: subunidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_atividades.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".mapa-carga").html(resposta);
								$("#mapacarga_selecionado").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//Função para mostrar a opções de materiais para serem cadastrados em um mapa carga
					$.ajax({
						type: 'POST',
						data: { subunidade: subunidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_materiais.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".lista_materiais").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//Função para mostrar a opções de compartimentos/setores para serem cadastrados em um mapa carga

					$.ajax({
						type: 'POST',
						data: { subunidade: subunidade, chave: 'chave' },
						url: 'https://interappctive.com/admciabm/opcoes_compartimentos.php',

						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$(".area_compartimento").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					$$("#mapacarga_selecionado").on("change", function () {


						var selecao_atividade = $("#mapacarga_selecionado").val();

						if (selecao_atividade == "Mini-Almox") {
							//Função para mostrar as atividades da rotina operacional
							$("#mapa_minialmox").removeClass("display-none");
							$("#mapa_abts").addClass("display-none");
							$("#mapa_resgate").addClass("display-none");
							$("#mapa_condutor").addClass("display-none");
							$("#mapa_absl").addClass("display-none");
							app.dialog.preloader('carregando');
							var subunidade = localStorage.getItem('subunidade');

							//REQUISIÇÃO AJAX - MAPACARGA ABTS
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { subunidade: subunidade, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/mapacarga_minialmox.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#lista_minialmox").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "Mapa-Carga ABTS") {

							//Função para mostrar as atividades da rotina operacional
							$("#mapa_abts").removeClass("display-none");
							$("#mapa_minialmox").addClass("display-none");
							$("#mapa_resgate").addClass("display-none");
							$("#mapa_condutor").addClass("display-none");
							$("#mapa_absl").addClass("display-none");
							app.dialog.preloader('carregando');
							var subunidade = localStorage.getItem('subunidade');

							//REQUISIÇÃO AJAX - MAPACARGA ABTS
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { subunidade: subunidade, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/mapacarga_abts.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#lista_abts").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});
						}

						if (selecao_atividade == "Mapa-Carga ABSL") {
							//Função para mostrar as atividades da rotina operacional
							$("#mapa_condutor").addClass("display-none");
							$("#mapa_abts").addClass("display-none");
							$("#mapa_minialmox").addClass("display-none");
							$("#mapa_resgate").addClass("display-none");
							$("#mapa_absl").removeClass("display-none");
							app.dialog.preloader('carregando');
							var subunidade = localStorage.getItem('subunidade');

							//REQUISIÇÃO AJAX - LISTA DO CONDUTOR
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { subunidade: subunidade, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/mapacarga_absl.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#lista_absl").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}


						if (selecao_atividade == "Mapa-Carga Resgate") {
							//Função para mostrar as atividades da rotina operacional
							$("#mapa_condutor").addClass("display-none");
							$("#mapa_abts").addClass("display-none");
							$("#mapa_minialmox").addClass("display-none");
							$("#mapa_absl").addClass("display-none");
							$("#mapa_resgate").removeClass("display-none");
							app.dialog.preloader('carregando');
							var subunidade = localStorage.getItem('subunidade');

							//REQUISIÇÃO AJAX - LISTA DO CONDUTOR
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { subunidade: subunidade, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/mapacarga_resgate.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#lista_resgate").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "Lista Condutor") {
							//Função para mostrar as atividades da rotina operacional
							$("#mapa_condutor").removeClass("display-none");
							$("#mapa_abts").addClass("display-none");
							$("#mapa_minialmox").addClass("display-none");
							$("#mapa_absl").addClass("display-none");
							$("#mapa_resgate").addClass("display-none");
							app.dialog.preloader('carregando');
							var subunidade = localStorage.getItem('subunidade');

							//REQUISIÇÃO AJAX - LISTA DO CONDUTOR
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { subunidade: subunidade, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/cond_2cia5bbm.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#lista_condutor").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}
					});



					$$("#mapa_carga").on("change", function () {


						var atividade_selecionada = $("#mapa_carga").val();

						if (atividade_selecionada == "Lista Condutor") {
							//Função para mostrar as atividades da rotina operacional
							$("#vtr_inserircarga").removeClass("display-none");
							$("#inspecao_condutor").removeClass("display-none");
							$(".BotaoSalvar_conferenciacondutor").removeClass("display-none");
							$(".BotaoSalvar_mapacarga").addClass("display-none");
							app.dialog.preloader('carregando');
							var subunidade = localStorage.getItem('subunidade');

							//REQUISIÇÃO AJAX - MAPACARGA ABTS
							$.ajax({
								type: 'POST',
								data: { subunidade: subunidade, chave: 'chave' },
								url: 'https://interappctive.com/admciabm/opcoes_vtrs.php',

								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$(".vtrs_bbm").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						/*$$('#add_carga').on('click', function () {
							$("#inserir_carga").removeClass("display-none");
							$(".add_carga").addClass("display-none");
							$("#refresh").removeClass("display-none");
						});
						
						$$('#refresh').on('click', function () {
							$("#inserir_carga").addClass("display-none");
							$(".add_carga").removeClass("display-none");
							$(".refresh").addClass("display-none");
						});*/

						//Função para puxar o último Item e adicionar mais 1;
						/*$$('#material_carga').on('change', function () {
			
							var material_selecionado = $("#material_carga").val();
							app.dialog.preloader('Aguarde...');
			
							//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { material_selecionado: material_selecionado, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/adicionar_item.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 
			
								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {
			
									if (resposta !== 0) {
										app.dialog.close();
										$("#item_carga").val(resposta);
									}
			
									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}
			
								},
			
								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},
			
								complete: function () {
			
								}
			
							});
			
						});*/



						//FUNÇÃO PARA INSERIR OS VALORES NA TABELA DE CARGA DAS ÁREAS VTRS ALMOX
						$("#BotaoSalvar_conferenciacondutor").on("click", function () {
							app.dialog.confirm('Deseja inserir uma nova carga?', '<b>Atenção!</b>', function () {

								//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
								var campoOBM = localStorage.getItem('unidade');
								var campoSubOBM = localStorage.getItem('subunidade');
								var campoNomemilitar = localStorage.getItem('nomemilitar');

								var campoAtividade = $("#mapa_carga").val();
								var campoViatura = $("#carga_vtr").val();
								var campoCompartimento = $("#setor_compartimento").val();
								var campoMaterial = $("#material_carga").val();
								var campoConservacao = $("#condicoes_uso").val();
								var campoInspecao = $("#acao_manutencao").val();
								var campoNumeroItem = $("#item_carga").val();
								var campoQuantidade = $("#quantidade_carga").val();
								var campoAlteracoes = $("#alteracoes_carga").val();

								//SE OS CAMPOS INPUTS FOREM VAZIOS NÃO PERMITE INSERIR OS DADOS NO BANCO
								if (campoOBM == '' || campoSubOBM == '' || campoNomemilitar == '' || campoViatura == '' || campoInspecao == '' || campoAtividade == '' || campoCompartimento == '' || campoMaterial == '' || campoConservacao == '' || campoNumeroItem == '' || campoQuantidade == '') {
									app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
								} else {

									//PRELOADER
									app.dialog.preloader('Registrando Atividade...');

									//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
									$.ajax({
										type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
										data: { campoOBM: campoOBM, campoSubOBM: campoSubOBM, campoNomemilitar: campoNomemilitar, campoAtividade: campoAtividade, campoViatura: campoViatura, campoCompartimento: campoCompartimento, campoMaterial: campoMaterial, campoConservacao: campoConservacao, campoInspecao: campoInspecao, campoNumeroItem: campoNumeroItem, campoQuantidade: campoQuantidade, campoAlteracoes: campoAlteracoes, Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
										url: 'https://interappctive.com/admciabm/rotina_condutor.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

										//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
										success: function (resposta) {

											if (resposta == 1) {
												//FECHA O DIALOG LOADING
												app.dialog.close();
												app.dialog.alert('Informações Registradas', '<b>SUCESSO!</b>');
												//COMANDOS PARA, APÓS DAR CERTO A REQUISIÇÃO AJAX, ESVAZIA OS CAMPOS INPUTS
												$("#vtr_inserircarga").addClass("display-none");
												$("#inspecao_condutor").addClass("display-none");
												$(".BotaoSalvar_conferenciacondutor").addClass("display-none");
												$(".BotaoSalvar_mapacarga").removeClass("display-none");

												app.views.main.router.refreshPage();
												app.dialog.close();

												/*Limpar Campos Input
												$("#mapa_carga").val('');
												$("#carga_vtr").val('');
												$("#acao_manutencao").val('');
												$("#setor_compartimento").val('');
												$("#material_carga").val('');
												$("#condicoes_uso").val('');
												$("#item_carga").val('');
												$("#quantidade_carga").val('');
												$("#alteracoes_carga").val('');
												$("#acao_manutencao").val(''); 
												
												$(".mapa_carga").val('');
												$(".carga_vtr").val('');
												$(".acao_manutencao").val('');
												$(".setor_compartimento").val('');
												$(".material_carga").val('');
												$(".condicoes_uso").val('');
												$(".item_carga").val('');
												$(".quantidade_carga").val('');
												$(".alteracoes_carga").val('');
												$(".acao_manutencao").val('');*/




											}
											//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
											if (resposta == 0) {
												app.dialog.close;
												app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
											}
										},

										//SE RETORNAR UM ERRO
										error: function (erro) {
											app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
										},

										//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
										complete: function () {
										}

									});
								}
							});
						});


					});

					//FUNÇÃO PARA EDITAR MAPARCARGA
					$("#BotaoEditar_conferenciacondutor").on("click", function () {
						app.dialog.confirm('Deseja editar este item?', '<b>Atenção!</b>', function () {

							//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
							var campoNomemilitar = localStorage.getItem('nomemilitar');


							var campoConservacao = $(".condicoes_uso").val();
							var campoInspecao = $(".acao_manutencao").val();
							var campoQuantidade = $(".quantidade_carga").val();
							var campoAlteracoes = $(".alteracoes_carga").val();

							var id = $("#id").val();

							//SE OS CAMPOS INPUTS FOREM VAZIOS NÃO PERMITE INSERIR OS DADOS NO BANCO
							if (campoNomemilitar == '' || campoInspecao == '' || campoConservacao == '' || campoQuantidade == '') {
								app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
							} else {

								//PRELOADER
								app.dialog.preloader('Editando Item...');

								//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
								$.ajax({
									type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
									data: { campoNomemilitar: campoNomemilitar, campoConservacao: campoConservacao, campoInspecao: campoInspecao, campoQuantidade: campoQuantidade, campoAlteracoes: campoAlteracoes, id: id, Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
									url: 'https://interappctive.com/admciabm/atualizar_rotinacondutor.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

									//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
									success: function (resposta) {

										if (resposta == 1) {
											//FECHA O DIALOG LOADING
											app.dialog.close();
											app.dialog.alert('Informações Registradas', '<b>SUCESSO!</b>');
											//COMANDOS PARA, APÓS DAR CERTO A REQUISIÇÃO AJAX, ESVAZIA OS CAMPOS INPUTS
											$('.material_edicao').addClass('display-none');
											$('.select_material').removeClass('display-none');
											$("#vtr_inserircarga").addClass("display-none");
											$("#inspecao_condutor").addClass("display-none");
											$('#inserir_carga').addClass('display-none');
											$(".BotaoEditar_conferenciacondutor").addClass("display-none");
											$(".BotaoSalvar_mapacarga").removeClass("display-none");
											$(".selecao_atividade").removeClass('display-none');
											//$(".add_carga").addClass("display-none");

											app.views.main.router.refreshPage();
											app.dialog.close();
											//Limpar Campos Input
											/*$(".setor_compartimento").val('');
											$(".material_carga").val('');
											$(".condicoes_uso").val(''); 
											$(".acao_manutencao").val(''); 
											$(".item_carga").val(''); 
											$(".quantidade_carga").val('');
											$(".alteracoes_carga").val('');
											
											$("#setor_compartimento").val('');
											$("#material_carga").val('');
											$("#condicoes_uso").val(''); 
											$("#acao_manutencao").val(''); 
											$("#item_carga").val(''); 
											$("#quantidade_carga").val('');
											$("#alteracoes_carga").val('');*/



										}
										//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
										if (resposta == 0) {
											app.dialog.close;
											app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
										}
									},

									//SE RETORNAR UM ERRO
									error: function (erro) {
										app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
									},

									//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
									complete: function () {
									}

								});
							}
						});
					});

					//FUNÇÃO PARA INSERIR OS VALORES NA TABELA DE CARGA DAS ÁREAS VTRS ALMOX
					$("#BotaoSalvar_mapacarga").on("click", function () {
						app.dialog.confirm('Deseja inserir uma nova carga?', '<b>Atenção!</b>', function () {

							//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
							var campoOBM = localStorage.getItem('unidade');
							var campoSubOBM = localStorage.getItem('subunidade');
							var campoNomemilitar = localStorage.getItem('nomemilitar');

							var campoAtividade = $("#mapa_carga").val();
							//var campoViatura=$("#carga_vtr").val();
							var campoCompartimento = $("#setor_compartimento").val();
							var campoMaterial = $("#material_carga").val();
							var campoConservacao = $("#condicoes_uso").val();
							//var campoInspecao=$("#acao_manutencao").val(); 
							var campoNumeroItem = $("#item_carga").val();
							var campoQuantidade = $("#quantidade_carga").val();
							var campoAlteracoes = $("#alteracoes_carga").val();

							//SE OS CAMPOS INPUTS FOREM VAZIOS NÃO PERMITE INSERIR OS DADOS NO BANCO
							if (campoOBM == '' || campoSubOBM == '' || campoNomemilitar == '' || campoAtividade == '' || campoCompartimento == '' || campoMaterial == '' || campoConservacao == '' || campoNumeroItem == '' || campoQuantidade == '') {
								app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
							} else {

								//PRELOADER
								app.dialog.preloader('Registrando Atividade...');

								//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
								$.ajax({
									type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
									data: { campoOBM: campoOBM, campoSubOBM: campoSubOBM, campoNomemilitar: campoNomemilitar, campoAtividade: campoAtividade, campoCompartimento: campoCompartimento, campoMaterial: campoMaterial, campoConservacao: campoConservacao, campoNumeroItem: campoNumeroItem, campoQuantidade: campoQuantidade, campoAlteracoes: campoAlteracoes, Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
									url: 'https://interappctive.com/admciabm/rotinaop_2cia5bbm.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

									//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
									success: function (resposta) {

										if (resposta == 1) {
											//FECHA O DIALOG LOADING
											app.dialog.close();
											app.dialog.alert('Informações Registradas', '<b>SUCESSO!</b>');

											app.views.main.router.refreshPage();
											app.dialog.close();
											/*COMANDOS PARA, APÓS DAR CERTO A REQUISIÇÃO AJAX, ESVAZIA OS CAMPOS INPUTS
											$("#mapa_carga").val('');
											$("#setor_compartimento").val('');
											$("#material_carga").val('');
											$("#condicoes_uso").val('');
											$("#item_carga").val('');
											$("#quantidade_carga").val('');
											$("#alteracoes_carga").val('');
											
											$(".mapa_carga").val('');
											$(".setor_compartimento").val('');
											$(".material_carga").val('');
											$(".condicoes_uso").val('');
											$(".item_carga").val('');
											$(".quantidade_carga").val('');
											$(".alteracoes_carga").val('');
											$(".acao_manutencao").val('');*/

										}
										//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
										if (resposta == 0) {
											app.dialog.close;
											app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
										}
									},

									//SE RETORNAR UM ERRO
									error: function (erro) {
										app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
									},

									//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
									complete: function () {
									}

								});
							}
						});
					});

					//FUNÇÃO PARA EDITAR MAPARCARGA
					$("#BotaoEditar_mapacarga").on("click", function () {
						app.dialog.confirm('Deseja editar este item?', '<b>Atenção!</b>', function () {

							//VARIÁVEIS QUE ASSUMEM O VALOR INSERIDO NOS CAMPOS INPUTS
							var campoNomemilitar = localStorage.getItem('nomemilitar');

							var campoConservacao = $(".condicoes_uso").val();
							var campoQuantidade = $(".quantidade_carga").val();
							var campoAlteracoes = $(".alteracoes_carga").val();

							var id = $("#id").val();

							//SE OS CAMPOS INPUTS FOREM VAZIOS NÃO PERMITE INSERIR OS DADOS NO BANCO
							if (campoNomemilitar == '' || campoConservacao == '' || campoQuantidade == '') {
								app.dialog.alert('Por favor, preencha todos os campos!', '<b>ATENÇÃO!</b>');
							} else {

								//PRELOADER
								app.dialog.preloader('Registrando Atividade...');

								//REQUISIÇÃO AJAX - COMUNICA O APP COM O ARQUIVO PHP
								$.ajax({
									type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
									data: { campoNomemilitar: campoNomemilitar, campoConservacao: campoConservacao, campoQuantidade: campoQuantidade, campoAlteracoes: campoAlteracoes, id: id, Chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO ENVIADAS PARA O SERVIDOR
									url: 'https://interappctive.com/admciabm/atualizar_mapacarga.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

									//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
									success: function (resposta) {

										if (resposta == 1) {
											//FECHA O DIALOG LOADING
											app.dialog.close();
											app.dialog.alert('Informações Atualizadas', '<b>SUCESSO!</b>');
											$('.material_edicao').addClass('display-none');
											$('.select_material').removeClass('display-none');
											$("#BotaoEditar_mapacarga").addClass('display-none');
											$("#BotaoSalvar_mapacarga").removeClass('display-none');
											$(".selecao_atividade").removeClass('display-none');
											$('#inserir_carga').addClass('display-none');

											app.views.main.router.refreshPage();
											app.dialog.close();

											/*Limpar Campos Input
											$(".setor_compartimento").val('');
											$(".material_carga").val('');
											$(".condicoes_uso").val(''); 
											$(".acao_manutencao").val(''); 
											$(".item_carga").val(''); 
											$(".quantidade_carga").val('');
											$(".alteracoes_carga").val('');
											
											$("#setor_compartimento").val('');
											$("#material_carga").val('');
											$("#condicoes_uso").val(''); 
											$("#acao_manutencao").val(''); 
											$("#item_carga").val(''); 
											$("#quantidade_carga").val('');
											$("#alteracoes_carga").val('');*/
										}
										//RESPOSTA CASO A REQUISIÇÃO AJAX NÃO FUNCIONE
										if (resposta == 0) {
											app.dialog.close;
											app.dialog.alert('Informação não registrada, tente novamente!', '<b>ERRO!</b>');
										}
									},

									//SE RETORNAR UM ERRO
									error: function (erro) {
										app.dialog.alert('Não foi possível se conectar ao servidor', '<b>Sem Conexão!</b>');
									},

									//QUANDO A REQUISIÇÃO ESTIVER COMPLETA - APÓS O SUCCESS
									complete: function () {
									}

								});
							}
						});
					});

					// Prompt - PESQUISAR CARGA ABTS
					$$('#procurar_cargaabts').on('click', function () {

						var subunidade = localStorage.getItem('subunidade');
						var pesquisa_cargaabts = $("#pesquisa_cargaabts").val();
						var atividade = $("#mapacarga_selecionado").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { atividade: atividade, subunidade: subunidade, pesquisa_cargaabts: pesquisa_cargaabts, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_mapacargaabts.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_abts").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					// Prompt - PESQUISAR CARGA ABSL
					$$('#procurar_cargaabsl').on('click', function () {

						$("#mapa_condutor").addClass("display-none");
						$("#mapa_abts").addClass("display-none");
						$("#mapa_minialmox").addClass("display-none");
						$("#mapa_resgate").addClass("display-none");
						$("#mapa_absl").removeClass("display-none");

						var subunidade = localStorage.getItem('subunidade');
						var pesquisa_cargaabsl = $("#pesquisa_cargaabsl").val();
						var atividade = $("#mapacarga_selecionado").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { atividade: atividade, subunidade: subunidade, pesquisa_cargaabsl: pesquisa_cargaabsl, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_mapacargaabsl.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_absl").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					// Prompt - PESQUISAR CARGA RESGATE
					$$('#procurar_cargaresgate').on('click', function () {

						var subunidade = localStorage.getItem('subunidade');
						var pesquisa_cargaresgate = $("#pesquisa_cargaresgate").val();
						var atividade = $("#mapacarga_selecionado").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { atividade: atividade, subunidade: subunidade, pesquisa_cargaresgate: pesquisa_cargaresgate, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_mapacargaresgate.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_resgate").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});

					// Prompt - PESQUISAR CARGA RESGATE
					$$('#procurar_cargaminialmox').on('click', function () {

						var subunidade = localStorage.getItem('subunidade');
						var pesquisa_cargaminialmox = $("#pesquisa_cargaminialmox").val();
						var atividade = $("#mapacarga_selecionado").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { atividade: atividade, subunidade: subunidade, pesquisa_cargaminialmox: pesquisa_cargaminialmox, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_mapacargaminialmox.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_minialmox").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});


					// Prompt - PESQUISAR CARGA DO ABTS
					$$('#procurar_listacondutor').on('click', function () {

						var subunidade = localStorage.getItem('subunidade');
						var parametro_busca = $("#parametro_busca").val();
						app.dialog.preloader('pesquisando');

						//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
						$.ajax({
							type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
							data: { subunidade: subunidade, parametro_busca: parametro_busca, chave: 'w&fdal67' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
							url: 'https://interappctive.com/admciabm/pesquisar_listacondutor.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

							//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
							success: function (resposta) {

								if (resposta !== 0) {
									app.dialog.close();
									$("#lista_condutor").html(resposta);
								}

								if (resposta == 0) {
									app.dialog.alert('Houve um problema. Tente novamente');
								}

							},

							error: function (erro) {
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},

							complete: function () {

							}

						});

					});


				}
			}
		},

		{
			path: '/ideo/',
			url: 'ideo.html',
			on: {
				pageInit: function (event, page) {

					//Caminho até o Arquivo Imagem
					var foto = app.photoBrowser.create({
						photos: [

							'img/calendario_ideo.png',
						],
						navbarOfText: 'de'

					});

					//Open photo browser on click
					$$('#calendario_ideo').on('click', function () {
						foto.open();
					});

					//Aparecer botão para registrar alteração
					//$('#registro_alter').on('click', function (){

					//$("#alteracao_reg").removeClass('display-none');
					//});


					// Prompt - LISTA IDEO
					$$('#listaideo').on('click', function () {
						app.dialog.prompt('Informe o n° da Lista!', '<b>Deseja realizar a IDEO?</b>', function (nome) {

							var nome = nome;
							app.dialog.preloader('pesquisando');

							//REQUISIÇÃO AJAX - BUSCAR CORRIDAS
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { nome: nome, chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/ideo_2cia5bbm.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#lista_ideo2cia_5bbm").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});
						});
					});

					//MODELO DE ROTA PRONTA PARA COPIAR

				}
			}
		},

		{
			path: '/login/',
			url: 'login.html',
			on: {
				pageInit: function (event, page) {

					$('#Fazerlogin').on('click', function () {

						var email = $("#ContaLogin").val();
						var senha = $("#ContaSenha").val();

						if ((email == '') || (senha == '')) {
							app.dialog.alert('Por favor, preencha seu email e senha.', '<i class="mdi mdi-alert"></i> Campos Vazios');

						} else {

							app.dialog.preloader('Fazendo Login');

							$.ajax({
								type: 'POST',
								data: { email: email, senha: senha, chave: '123' },
								url: 'https://interappctive.com/admciabm/login.php',
								crossDomain: true,

								success: function (respost) {

									if (respost == 0) {
										app.dialog.close();

										app.dialog.alert('Nenhum usuário encontrado com este login / senha. Tente novamente!', '<i class="mdi mdi-alert-circle"></i> <b>Login Inválido</b>');
										return false;

									}

									if (respost !== 0) {
										app.dialog.close();

										//DESENCAPSULA OS DADOS DA RESPOSTA
										var dados = JSON.parse(respost);

										//ARMAZENA CADA ITEM DO USUARIO EM UM LOCALSTORAGE
										localStorage.setItem("nomemilitar", dados.nome);
										localStorage.setItem("patente", dados.patente);
										localStorage.setItem("nomeguerra", dados.nomeguerra);
										localStorage.setItem("NFmilitar", dados.NF);
										localStorage.setItem("email", dados.email);
										localStorage.setItem("senha", dados.senha);
										localStorage.setItem("unidade", dados.obm);
										localStorage.setItem("subunidade", dados.subunidade);
										localStorage.setItem("perfil", dados.perfil);

										//REDIRECIONA PARA PAGINA PRINCIPAL
										app.views.main.router.navigate('/admunidadesciabm/');

									}



								},

								error: function (erro) {
									app.dialog.close();

									app.dialog.alert('Falha em se comunicar com servidor. Por favor, tente novamente!');



								}

							});
						}


					});

					//RECUPERAÇÃO DE SENHA
					$('#esqueceuSenha').on('click', function () {
						app.dialog.prompt('Informe o e-mail de login', '<b>SEU EMAIL DE LOGIN</b>', function (email) {

							var email = email;


							app.dialog.preloader('Verificando');

							$.ajax({
								type: 'POST',
								data: { email: email, chave: '123' },
								url: 'https://interappctive.com/admciabm/verificar-email.php',

								success: function (resposta) {


									if (resposta == 0) {
										app.dialog.close();
										app.dialog.prompt('Você recebeu <b><u>no seu email</u></b> um código de verificação para autorizar a criação de uma nova senha. <b>Por favor, informe o código recebido no email</b>:', '<b>CÓDIGO DE VERIFICAÇÃO</b>', function (codigo) {
											localStorage.setItem('emailValido', email);
											validaCodigo(codigo);
										});

									}

									if (resposta == 1) {
										app.dialog.close();
										app.dialog.alert('Por favor, informe um email válido!', '<b>E-MAIL NÃO ENCONTRADO</b>');
									}

									if (resposta == 2) {
										app.dialog.close();
										app.dialog.alert('Houve um problema. Tente novamente', '<b>OPS!</b>');
									}

								},

								error: function (erro) {
									app.dialog.close();
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

							});


						});
					});

					function validaCodigo(codigo) {

						app.dialog.close();
						app.dialog.preloader('Verificando');

						var email = localStorage.getItem('emailValido');

						$.ajax({
							type: 'POST',
							data: { email: email, codigo: codigo, chave: '123' },
							url: 'https://interappctive.com/admciabm/verificar-codigo.php',

							success: function (resposta) {

								if (resposta == 0) {
									app.dialog.close();
									app.dialog.prompt('Informe a nova senha:', '<b>NOVA SENHA</b>', function (senha) {
										criarNovaSenha(senha);
									});

								}

								if (resposta == 1) {
									app.dialog.close();
									app.dialog.alert('Por favor, informe um código válido!', '<b>CÓDIGO INVÁLIDO</b>');
								}

								if (resposta == 2) {
									app.dialog.close();
									app.dialog.alert('Houve um problema. Tente novamente', '<b>OPS!</b>');
								}

							},

							error: function (erro) {
								app.dialog.close();
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},


						});


					}

					function criarNovaSenha(senha) {

						app.dialog.close();

						app.dialog.preloader('Salvando nova senha');
						var email = localStorage.getItem('emailValido');

						$.ajax({
							type: 'POST',
							data: { email: email, senha: senha, chave: '123' },
							url: 'https://interappctive.com/admciabm/salvar-nova-senha.php',

							success: function (resposta) {

								if (resposta == 0) {
									app.dialog.close();
									app.dialog.alert('Nova senha gerada. Você já pode fazer login com ela!', '<b>SUCESSO!</b>');
								}

								if (resposta == 1) {
									app.dialog.close();
									app.dialog.alert('Por favor, informe um código válido!', '<b>CÓDIGO INVÁLIDO</b>');
								}

								if (resposta == 2) {
									app.dialog.close();
									app.dialog.alert('Houve um problema. Tente novamente', '<b>OPS!</b>');
								}

							},

							error: function (erro) {
								app.dialog.close();
								app.dialog.alert('Não foi possivel se conectar ao servidor');
							},


						});


					}

				}
			}
		},

		{
			path: '/satanchieta_prevencao/',
			url: 'satanchieta_prevencao.html',
			on: {
				pageInit: function (event, page) {


					/*app.dialog.preloader('carregando');
					//REQUISIÇÃO AJAX - MEDIDA COMPENSATÓRIA
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/puxar_fluxoalpcb.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#fluxophp_alpcb").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}


					});*/


					$('#volta_alpcb_3etapa').on('click', function () {
						$('.alpcb_3etapa').removeClass('display-none');
						$('.alpcb_4etapa').addClass('display-none');

					});

					$('#edificacao_3impropria').on('click', function () {
						app.dialog.alert('<center>É necessário sanar a(s) pendência(s) e solicitar novo parecer ou iniciar um processo ordinário de regularização o quanto antes.</center>', '<center><b>Alguma pendência foi encontrada!</b></center>');

					});

					// Confirm
					$$('#edificacao_3apropriada').on('click', function () {
						app.dialog.alert('<center>Após o deferimento do parecer superior, solicite uma nova vistoria.</center>', '<center><b>ATENÇÃO:</b></center>', function () {
							app.dialog.alert('<center>Agora o vistoriador já pode liberar o Alvará Provisório!</center>', '<center><b>Finalização do processo!</b></center>');
						});
					});

					$('#volta_alpcb_2etapa').on('click', function () {
						$('.alpcb_2etapa').removeClass('display-none');
						$('.alpcb_3etapa').addClass('display-none');

					});

					$('#edificacao_2apropriada').on('click', function () {
						app.dialog.alert('<center>O processo de alvará provisório agora pode ser iniciado. As próximas etapas serão fundamentais para liberação do Alvará Provisório.</center>', '<center><b>ATENÇÃO:</b></center>');
						$('.alpcb_3etapa').addClass('display-none');
						$('.alpcb_4etapa').removeClass('display-none');

					});

					$('#edificacao_2impropria').on('click', function () {
						app.dialog.alert('<center>A atividadde desenvolvida não é compatível com o processo de alvará provisório. Sua regularização deve ser via processo regular.</center>', '<center><b>Edificação Incompatível!</b></center>');

					});

					$('#edificacao_apropriada').on('click', function () {
						app.dialog.alert('<center>Para certificação de compatibilidade com o ALPCB, é necessário a confirmação de um vistoriador. Atenção para os próximos passos!</center>', '<center><b>ATENÇÃO:</b></center>');
						$('.alpcb_2etapa').addClass('display-none');
						$('.alpcb_3etapa').removeClass('display-none');

					});

					$('#alpcb_terceiro').on('click', function () {
						$('#numero_alpcb').removeClass('display-none');
						$('.terceiro_alpcb').addClass('display-none');

					});

					$('#alpcb_segundo').on('click', function () {
						$('#numero_alpcb').removeClass('display-none');
						$('.segundo_alpcb').addClass('display-none');

					});

					$('#volta_alpcb_1etapa').on('click', function () {
						$('#numero_alpcb').removeClass('display-none');
						$('.alpcb_2etapa').addClass('display-none');

					});

					$('#edificacao_impropria').on('click', function () {
						app.dialog.alert('<center>A atividadde desenvolvida não é compatível com o processo de alvará provisório. A regularização deve ocorrer via processo regular.</center>', '<center><b>Edificação Incompatível!</b></center>');

					});

					$('#volta_alpcb_inicio').on('click', function () {
						$('.alpcb_1etapa').removeClass('display-none');
						$('#numero_alpcb').addClass('display-none');

					});

					$('#primeiro_alpcb').on('click', function () {
						$('#numero_alpcb').addClass('display-none');
						$('.alpcb_2etapa').removeClass('display-none');

					});

					$('#segundo_alpcb').on('click', function () {
						$('#numero_alpcb').addClass('display-none');
						$('.segundo_alpcb').removeClass('display-none');

					});

					$('#terceiro_alpcb').on('click', function () {
						$('#numero_alpcb').addClass('display-none');
						$('.terceiro_alpcb').removeClass('display-none');

					});

					$('#some_1etapa').on('click', function () {
						$('.alpcb_1etapa').addClass('display-none');
						$('#numero_alpcb').removeClass('display-none');

					});

					//Calculadora de Brigadistas
					$('.populacao_turno').on('blur', function () {

						var populacao_turno = $('#populacao_turno').val();
						//var brigadista_turno = $('#brigadista_turno').val();
						var brigadista = (0.1 * populacao_turno);
						var brigadista_arredondado = Math.ceil(brigadista)

						if (populacao_turno <= 10) {
							document.getElementById("brigadista_turno").innerHTML = 02 + ' / Turno';
						} else

							if (populacao_turno > 10 && populacao_turno <= 40) {
								document.getElementById("brigadista_turno").innerHTML = 04 + ' / Turno';

							} else

								if (populacao_turno > 40) {
									document.getElementById("brigadista_turno").innerHTML = brigadista_arredondado + ' / Turno';

								} else
									if (populacao_turno == '') {
										document.getElementById("brigadista_turno").innerHTML = '';
									} else {
										document.getElementById("brigadista_turno").innerHTML = '';
									}
					});

					//POR PADRÃO PUXA O PROCESSO DE ALPCB
					app.dialog.preloader('carregando');
					$("#processo_alpcb").removeClass("display-none");

					//REQUISIÇÃO AJAX - MEDIDA OBRIGATÓRIA
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/puxar_alpcb_medobrigatoria.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#medidas_obrigatorias").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//REQUISIÇÃO AJAX - MEDIDA COMPENSATÓRIA
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/puxar_alpcb_medcompensatoria.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#medidas_compensatorias").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}


					});



					$$("#select_tipoprocesso").on("change", function () {


						var selecao_atividade = $(".select_tipoprocesso").val();

						if (selecao_atividade == "1") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").removeClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');
							//REQUISIÇÃO AJAX - ISENÇÃO COSCIP
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_isencao.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#isencao_coscip").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "2") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").removeClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - DISPENSA ALCB
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_dispensa.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#dispensa_alcb").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "3") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").removeClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - AAFCB
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_aafcb.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#aafcb_edificacoes").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "4") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").removeClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');
							//var subunidade = localStorage.getItem('subunidade');

							//REQUISIÇÃO AJAX - MEDIDA OBRIGATÓRIA
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_alpcb_medobrigatoria.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#medidas_obrigatorias").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

							//REQUISIÇÃO AJAX - MEDIDA COMPENSATÓRIA
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_alpcb_medcompensatoria.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#medidas_compensatorias").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}


							});



						}

						if (selecao_atividade == "5") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").removeClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');


							//REQUISIÇÃO AJAX - PS
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_processo_ps.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#processo_ps").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "6") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").removeClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - PS - Shows e Eventos
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_ps_shows.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#ps_shows").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "7") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").removeClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - Projeto Técnico
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_projeto_tecnico.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#projeto_tecnico").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "8") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").removeClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - PT - Shows e Eventos
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_pt_show.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#pt_show").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "9") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").removeClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - Fiscalização
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_fiscalizacao.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#fiscalizacao").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}





					});


				}
			}
		},

		{
			path: '/sat_prevencao/',
			url: 'sat_prevencao.html',
			on: {
				pageInit: function (event, page) {

					//PRELOADER
					app.dialog.preloader('Carregando...');
					//REQUISIÇÃO AJAX - VERIFICAÇÃO DE VERSÃO
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/informa_atualizacao_dois.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#versao_vinte_quatro").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});
					/*app.dialog.preloader('carregando');
					//REQUISIÇÃO AJAX - MEDIDA COMPENSATÓRIA
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/puxar_fluxoalpcb.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#fluxophp_alpcb").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}


					});*/


					$('#volta_alpcb_3etapa').on('click', function () {
						$('.alpcb_3etapa').removeClass('display-none');
						$('.alpcb_4etapa').addClass('display-none');

					});

					$('#edificacao_3impropria').on('click', function () {
						app.dialog.alert('<center>É necessário sanar a(s) pendência(s) e solicitar novo parecer ou iniciar um processo ordinário de regularização o quanto antes.</center>', '<center><b>Alguma pendência foi encontrada!</b></center>');

					});

					// Confirm
					$$('#edificacao_3apropriada').on('click', function () {
						app.dialog.alert('<center>Após o deferimento do parecer superior, solicite uma nova vistoria.</center>', '<center><b>ATENÇÃO:</b></center>', function () {
							app.dialog.alert('<center>Agora o vistoriador já pode liberar o Alvará Provisório!</center>', '<center><b>Finalização do processo!</b></center>');
						});
					});

					$('#volta_alpcb_2etapa').on('click', function () {
						$('.alpcb_2etapa').removeClass('display-none');
						$('.alpcb_3etapa').addClass('display-none');

					});

					$('#edificacao_2apropriada').on('click', function () {
						app.dialog.alert('<center>O processo de alvará provisório agora pode ser iniciado. As próximas etapas serão fundamentais para liberação do Alvará Provisório.</center>', '<center><b>ATENÇÃO:</b></center>');
						$('.alpcb_3etapa').addClass('display-none');
						$('.alpcb_4etapa').removeClass('display-none');

					});

					$('#edificacao_2impropria').on('click', function () {
						app.dialog.alert('<center>A atividadde desenvolvida não é compatível com o processo de alvará provisório. Sua regularização deve ser via processo regular.</center>', '<center><b>Edificação Incompatível!</b></center>');

					});

					$('#edificacao_apropriada').on('click', function () {
						app.dialog.alert('<center>Para certificação de compatibilidade com o ALPCB, é necessário a confirmação de um vistoriador. Atenção para os próximos passos!</center>', '<center><b>ATENÇÃO:</b></center>');
						$('.alpcb_2etapa').addClass('display-none');
						$('.alpcb_3etapa').removeClass('display-none');

					});

					$('#volta_alpcb_1etapa').on('click', function () {
						$('#numero_alpcb').removeClass('display-none');
						$('.alpcb_2etapa').addClass('display-none');

					});

					$('#edificacao_impropria').on('click', function () {
						app.dialog.alert('<center>A atividadde desenvolvida não é compatível com o processo de alvará provisório. A regularização deve ocorrer via processo regular.</center>', '<center><b>Edificação Incompatível!</b></center>');

					});

					$('#volta_alpcb_inicio').on('click', function () {
						$('.alpcb_1etapa').removeClass('display-none');
						$('#numero_alpcb').addClass('display-none');

					});

					$('#primeiro_alpcb').on('click', function () {
						$('#numero_alpcb').addClass('display-none');
						$('.alpcb_2etapa').removeClass('display-none');

					});

					$('#segundo_alpcb').on('click', function () {
						$('#numero_alpcb').addClass('display-none');
						$('.segundo_alpcb').removeClass('display-none');

					});

					$('#terceiro_alpcb').on('click', function () {
						$('#numero_alpcb').addClass('display-none');
						$('.terceiro_alpcb').removeClass('display-none');

					});

					$('#some_1etapa').on('click', function () {
						$('.alpcb_1etapa').addClass('display-none');
						$('#numero_alpcb').removeClass('display-none');

					});

					//Calculadora de Brigadistas
					$('.populacao_turno').on('blur', function () {

						var populacao_turno = $('#populacao_turno').val();
						//var brigadista_turno = $('#brigadista_turno').val();
						var brigadista = (0.1 * populacao_turno);
						var brigadista_arredondado = Math.ceil(brigadista)

						if (populacao_turno <= 10) {
							document.getElementById("brigadista_turno").innerHTML = 02 + ' / Turno';
						} else

							if (populacao_turno > 10 && populacao_turno <= 40) {
								document.getElementById("brigadista_turno").innerHTML = 04 + ' / Turno';

							} else

								if (populacao_turno > 40) {
									document.getElementById("brigadista_turno").innerHTML = brigadista_arredondado + ' / Turno';

								} else
									if (populacao_turno == '') {
										document.getElementById("brigadista_turno").innerHTML = '';
									} else {
										document.getElementById("brigadista_turno").innerHTML = '';
									}
					});

					//POR PADRÃO PUXA O PROCESSO DE ALPCB
					app.dialog.preloader('carregando');
					$("#processo_alpcb").removeClass("display-none");

					//REQUISIÇÃO AJAX - MEDIDA OBRIGATÓRIA
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/puxar_alpcb_medobrigatoria.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#medidas_obrigatorias").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}

					});

					//REQUISIÇÃO AJAX - MEDIDA COMPENSATÓRIA
					$.ajax({
						type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
						data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
						url: 'https://interappctive.com/admciabm/puxar_alpcb_medcompensatoria.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

						//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
						success: function (resposta) {

							if (resposta !== 0) {
								app.dialog.close();
								$("#medidas_compensatorias").html(resposta);
							}

							if (resposta == 0) {
								app.dialog.alert('Houve um problema. Tente novamente');
							}

						},

						error: function (erro) {
							app.dialog.alert('Não foi possivel se conectar ao servidor');
						},

						complete: function () {

						}


					});



					$$("#select_tipoprocesso").on("change", function () {


						var selecao_atividade = $(".select_tipoprocesso").val();

						if (selecao_atividade == "1") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").removeClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');
							//REQUISIÇÃO AJAX - ISENÇÃO COSCIP
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_isencao.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#isencao_coscip").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "2") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").removeClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - DISPENSA ALCB
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_dispensa.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#dispensa_alcb").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "3") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").removeClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - AAFCB
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_aafcb.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#aafcb_edificacoes").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "4") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").removeClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');
							//var subunidade = localStorage.getItem('subunidade');

							//REQUISIÇÃO AJAX - MEDIDA OBRIGATÓRIA
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_alpcb_medobrigatoria.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#medidas_obrigatorias").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

							//REQUISIÇÃO AJAX - MEDIDA COMPENSATÓRIA
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_alpcb_medcompensatoria.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#medidas_compensatorias").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}


							});



						}

						if (selecao_atividade == "5") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").removeClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');


							//REQUISIÇÃO AJAX - PS
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_processo_ps.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#processo_ps").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "6") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").removeClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - PS - Shows e Eventos
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_ps_shows.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#ps_shows").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "7") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").removeClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - Projeto Técnico
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_projeto_tecnico.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#projeto_tecnico").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "8") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").removeClass("display-none");
							$("#processo_fiscalizacao").addClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - PT - Shows e Eventos
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_pt_show.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#pt_show").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}

						if (selecao_atividade == "9") {
							//Função para mostrar as atividades da rotina operacional
							$("#processo_isencao").addClass("display-none");
							$("#processo_dispensa").addClass("display-none");
							$("#processo_aafcb").addClass("display-none");
							$("#processo_alpcb").addClass("display-none");
							$("#processo_simplificado").addClass("display-none");
							$("#processo_shows_ps").addClass("display-none");
							$("#processo_projetotecnico").addClass("display-none");
							$("#processo_shows_pt").addClass("display-none");
							$("#processo_fiscalizacao").removeClass("display-none");
							app.dialog.preloader('carregando');

							//REQUISIÇÃO AJAX - Fiscalização
							$.ajax({
								type: 'POST', //METODO DE ENVIO: PODE SER 'POST' - "POSTAR" OU PODE SER GET "RECEBER"
								data: { chave: 'exemplo' }, //AS INFORMAÇÕES QUE SERÃO SOLICITADAS PARA O SERVIDOR
								url: 'https://interappctive.com/admciabm/puxar_fiscalizacao.php', //ENDEREÇO DO ARQUIVO PHP QUE VAI RECEBER 

								//SE RETORNAR SUCESSO - VOLTA COM A RESPOSTA
								success: function (resposta) {

									if (resposta !== 0) {
										app.dialog.close();
										$("#fiscalizacao").html(resposta);
									}

									if (resposta == 0) {
										app.dialog.alert('Houve um problema. Tente novamente');
									}

								},

								error: function (erro) {
									app.dialog.alert('Não foi possivel se conectar ao servidor');
								},

								complete: function () {

								}

							});

						}





					});


				}
			}
		},


		{
			path: '/new/',
			url: 'new.html',
			on: {
				pageInit: function (event, page) {


				}
			}
		},

	],
	// ... other parameters
});

var $$ = Dom7;

//QUANDO O DISPOSITIVO ESTIVER PRONTO
function onDeviceReady() {

	//DISPOSITIVO PRONTO INICIALIZAR POR ESSA ROTA
	var mainView = app.views.create('.view-main', {
		url: '/index/'
	});

	var notificationOpenedCallback = function (jsonData) {
		console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
	};
	window.plugins.OneSignal
		.startInit("4bcb1e2d-6865-4fd9-a72c-90fb59f82239")
		.handleNotificationOpened(notificationOpenedCallback)
		.endInit();

	/*//COMANDO PARA "OUVIR" QUANDO FICAR OFFLINE
	document.addEventListener("offline", onOffline, false);

	function onOffline() {
		var rota = app.views.main.router.url;
		localStorage.setItem('rotaAtual', rota);
		app.views.main.router.navigate('/offline/');
	}

	//COMANDO PARA "OUVIR" QUANDO FICAR ONLINE
	document.addEventListener("online", onOnline, false);

	function onOnline() {
		var rota = localStorage.getItem('rotaAtual');
		app.views.main.router.navigate(rota);
	}*/

	//COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
	document.addEventListener("backbutton", onBackKeyDown, false);

	//FUNCÃO QUANDO CLICAR NO BOTAO VOLTAR NATIVO
	function onBackKeyDown() {

		//VARIAVEL PARA VER EM QUE ROTA ESTAMOS
		var nome = app.views.main.router.url;

		//EXEMPLO DE VOLTAR:	
		if (nome == '/admin/') {
			app.views.main.router.navigate('/admunidadesciabm/');
		}

		if (nome == '/controletrafego/') {
			app.views.main.router.navigate('/admunidadesciabm/');
		}

		if (nome == '/controle_cautelavtr/') {
			app.views.main.router.navigate('/admunidadesciabm/');
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/rotina_operacional/') {
			app.views.main.router.navigate('/admunidadesciabm/');
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/gerencia/') {
			app.views.main.router.navigate('/admunidadesciabm/');
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/cadastros/') {
			app.views.main.router.navigate('/gerencia/');
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/logistica/') {
			app.views.main.router.navigate('/gerencia/');
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/cadastro_usuarios/') {
			app.views.main.router.navigate('/logistica/');
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/cadastro_unidades/') {
			app.views.main.router.navigate('/logistica/');
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/cadastro_subunidades/') {
			app.views.main.router.navigate('/logistica/');
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/cadastro_viaturas/') {
			app.views.main.router.navigate('/logistica/');
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/cadastro_equipamentos/') {
			app.views.main.router.navigate('/logistica/');
		}


		//EXEMPLO DE VOLTAR:	
		if (nome == '/admunidadesciabm/') {
			app.dialog.confirm('Tem certeza que quer sair?', '<b>Sair</b>', function () {
				window.navigator.app.exitApp();
			});
		}

		//EXEMPLO DE VOLTAR:	
		if (nome == '/home/') {
			app.dialog.confirm('Tem certeza que quer sair?', '<b>Sair</b>', function () {
				window.navigator.app.exitApp();
			});
		}

	}

}