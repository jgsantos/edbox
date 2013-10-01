(function( $ ) {

    $.fn.edbox = function( options ) {
 
        //EdBox's defaults properties
        var defaults = {
            modal  : true,
            type   : 'alert',
            title  : '',
            text   : '',
            cancel: function(){},
            confirm: function(){},
            beforeOpen : function(){},
            afterOpen:function(){},
            beforeClose:function(){},
            afterClose:function(){},
            buttons:[],
        };

 
        var settings = $.extend( {}, defaults, options );
 
        
        edBoxInstance = _createElement(this, settings);

        _bindActions(edBoxInstance,settings);
        _createButtons( edBoxInstance, settings.buttons);
        
        return  edBoxInstance;
    };
    
    //Private functions
    function _createElement( wrapElement, properties ){

        var edBoxModal   = document.getElementById('edbox-modal') || wrapElement.append( _createElementModal() ),
            edBoxElement = _createElementEdBox( properties );

            $(wrapElement).append( edBoxElement );
            properties.elementModal = edBoxModal;

            return $(edBoxElement);
    };

    function _createElementModal(){
        var elementModal =  document.createElement('div');
        elementModal.id = 'edbox-modal';
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
                    $(this).css('display','inline-block');
                });

            properties.afterOpen();
       };

       edBoxInstance.close = function(){
            
            properties.beforeClose();
            
            edBoxInstance.animate({
                opacity: 0,
                height: "fadeOut"
                },
                500,
                function() {
                    $(this).css('display','none');
                });

            properties.afterClose();
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

})( jQuery );
