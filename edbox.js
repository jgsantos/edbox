var edbox = {
    color: "#fff",
    element: null,
    createBlock: function(element){
        $(element).append("<div style='background-color: "+edbox.color+"' class='edbox-divlock'></div>");
        try{
            return true;
        }
        catch(err)
        {
            return false;
        }
    },
    applyBlock: function(element){
        if(element && !$(element).hasClass('edbox-apply-relative')){
            $(element).addClass("edbox-apply-relative");
            if(edbox.createBlock(element)){
                return true;
            }
        }else{
            return false;
        }
    },
    closeBlock: function(elementClose){
        $(elementClose).removeClass("edbox-apply-relative");
        $(elementClose).children( ".edbox-divlock" ).animate({
        opacity: 0,
        height: "fadeOut"
        }, 500, function() {
            $(this).hide().remove();
        });
    },
    alertBox: function(data){
        
        $(".edbox-cancel").live('click', function(){
           data.cancel(); 
        });
        
        $(".edbox-confirm").live('click', function(){
           data.confirm(); 
        });
        
        if(edbox.applyBlock(data.element)){
            $(".edbox-divlock").append("<div class='edbox-alert-box'><div class='edbox-alert-"+data.type+"-inner'><div class='edbox-alert-header'>"+data.titulo+"</div><div class='edbox-alert-message'>"+data.texto+"</div><div class='edbox-cancel edbox-alert-action edbox-alert-"+data.type+"-action'><a>Fechar</a></div></div></div>").animate({
            opacity: 1,
            height: "fadeIn"
            }, 1000);
        }
    }
}