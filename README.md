edbox
=====

	var box = jQuery('body').edbox({
			beforeOpen:function(){ 
				console.log('antes de abrir');
			},
                	type:'alert',
			title:"EdBox Alert ",
			text:"Esse é um teste para o EdBox tipo Alerta",
			buttons:[{name:"Fechar"},{name:"Gerar Um alerta",actionClick:function(){alert('Alerta gerado pelo botão')}}]
		 }),
	box.open();
