(function( $ ) {

    $.fn.edbox = function( options ) {
 
        //EdBox's defaults properties
        var defaults = {
            modal  : true,
            type   : 'alert',
            title  : '',
            text   : '',
			backgroundColorModal : '#000',
            position: "center",
            cancel: function(){},
            confirm: function(){},
            beforeOpen : function(){},
            afterOpen:function(){},
            beforeClose:function(){},
            afterClose:function(){},
            buttons:[],
        },
        settings = $.extend( {}, defaults, options ),
        edBoxInstance = _createElement(this, settings);

        _bindActions( edBoxInstance,settings );
        _createButtons( edBoxInstance, settings.buttons );
		_toPositionBox( edBoxInstance, settings.position );
        
        return  edBoxInstance;
    };
    
    //Private functions
    function _createElement( wrapElement, properties ){

        var edBoxModal   = document.getElementById('edbox-modal') || wrapElement.append( _createElementModal(properties) ),
            edBoxElement = _createElementEdBox( properties );

            $(wrapElement).append( edBoxElement );
            properties.elementModal = edBoxModal;

            return $(edBoxElement);
    };

    function _createElementModal(properties){
        var elementModal =  document.createElement('div');
        elementModal.id = 'edbox-modal';
		elementModal.style.backgroundColor = properties.backgroundColorModal;
        return elementModal; 
    }

    function _createElementEdBox( properties ){

        var edBox        = document.createElement('div'),
            edBoxTitle   = document.createElement('div'),
            edBoxText    = document.createElement('div'),
            edBoxButtons = document.createElement('div');
        
            edBox.className        = "edbox " + properties.type;
            edBoxTitle.className   = "title";
            edBoxText.className    = "text";
            edBoxButtons.className = "buttons";

            edBoxTitle.innerHTML = properties.title;
            edBoxText.innerHTML = properties.text;

            edBox.appendChild(edBoxTitle);
            edBox.appendChild(edBoxText);
            edBox.appendChild(edBoxButtons);

        return edBox;
    }


    function _bindActions(edBoxInstance, properties){

       edBoxInstance.open = function(){
            
            properties.beforeOpen();
            
            edBoxInstance.animate({
                opacity: 100,
                height: "fadeOut"
                },
                500,
                function() {
                    $(this).removeClass('hide').addClass('show');
                    properties.afterOpen();
                });
				
			if(properties.modal	==true){
				$('#edbox-modal').animate({
                opacity: 0.8,
                height: "fadeIn"
                },
                500,
                function() {
                    $(this).show();
                });
			}

            
       };

       edBoxInstance.close = function(){
            
            properties.beforeClose();
            
            edBoxInstance.animate({
                opacity: 0,
                height: "fadeOut"
                },
                500,
                function() {
                    $(this).removeClass('show').addClass('hide');
                    properties.afterClose();
                });

			if(properties.modal	== true){
				$('#edbox-modal').animate({
                opacity: 0,
                height: "fadeOut"
                },
                500,
                function() {
                    $(this).hide();
                });
			}
			
            
       };

       edBoxInstance.setPosition = function( position ){
            _toPositionBox( this, position );
       };

       edBoxInstance.setType    = function( type ){

            var classShowHide = this.hasClass('show') ? 'show' : 'hide'; 
            this.removeClass().addClass("edbox").addClass( type ).addClass( classShowHide );
       };
    }

    function _createButtons( edBoxInstance, arrayButtons ){

            wrapButtons = edBoxInstance.children('.buttons');
            
            for (var i = 0; i < arrayButtons.length ; i++) {
                
                var propertiesButton = arrayButtons[i],
                    button = document.createElement('button');

                button.className = "button";
                button.innerHTML = propertiesButton.name;

                $(button).bind('click', propertiesButton.actionClick || edBoxInstance.close);

                wrapButtons.append( button );

                
            };
    
    }
	
    function _toPositionBox( edBoxInstance, position){
             
            var positionBox = {};

            switch( position ){
                 
                case "left-top" :
                    positionBox = { 
                        'top'   : 0,
                        'left'  : 0,
                        'margin': 0,
                    };
                break;
                
                case "left-center" :
                    positionBox = { 
                        'top'   : "45%",
                        'left'  : 0,
                        'margin-top': -edBoxInstance.height() / 2,
                    }; 
                break;

                case "left-bottom":
                    positionBox = { 
                        'bottom': 0,
                        'left'  : 0,
                        'margin': 0,
                    };

                break;

                case "center-top":
                    positionBox = { 
                        'top'   : 0,
                        'left'  : "45%",
                        'margin-left': -edBoxInstance.width() / 2,
                    };
                break;

                case "center-bottom":
                    positionBox = { 
                        'bottom': 0,
                        'left'  : "45%",
                        'margin-left': -edBoxInstance.width() / 2,
                    };
                break;

                case "right-top" :
                    positionBox = { 
                        'top'   : 0,
                        'right' : 0,
                        'margin': 0,
                    };
                break;

                case "right-center" :

                    positionBox = { 
                        'top'   : "45%",
                        'right' : 0,
                        'margin-top': -edBoxInstance.height() / 2
                    };

                break;

                case "right-bottom" :
                    positionBox = { 
                        'bottom': 0,
                        'right' : 0,
                        'margin': 0
                    };

                break;

                default :
                    positionBox = { 
                        'top'   : "45%",
                        'left'  : "45%",
                        'margin-left': -edBoxInstance.width() / 2,
                        'margin-top': -edBoxInstance.height() / 2
                    };
                break;
            }
            edBoxInstance.removeAttr('style');
            edBoxInstance.css( positionBox );
     }

})( jQuery );
