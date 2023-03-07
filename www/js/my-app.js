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
		}, //INDEX;
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
		}, //HOME;
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
		}, //ADMUNIDADES-CIA-BM
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
		}, //CONTROLE-TRAFEGO-VTRS

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
		}, //LOGIN

		{
			path: '/new/',
			url: 'new.html',
			on: {
				pageInit: function (event, page) {


				}
			}
		}, // ROTA-VIRGEM

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