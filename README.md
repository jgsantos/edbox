edbox
=====

edbox.color = "#fff";
edbox.applyBlock('.div-fieldset-box-complete');
edbox.applyBlock('.checkbox-div-mon-refs');
edbox.alertBox({
	element: "body",
	type: 'error',
	titulo: 'Itinerário Atual',
	texto: 'Deseja deletar o itinerário atual?',
	cancel: function(){
		edbox.closeBlock('body');
	},
	confirm: function(){
		
	}
});
