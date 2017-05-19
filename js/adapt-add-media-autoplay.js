define([
    'coreJS/adapt'
],function(Adapt) {

    var counter = 0;

    Adapt.on('componentView:preRender', function(view) {
        var model = view.model;
        if (!model.get("_autoPlay") && !model.get("_autoPlayOnce")) return;

    });

    Adapt.on('componentView:postRender', function(view) {
        var model = view.model;
        if (!model.get("_autoPlay") && !model.get("_autoPlayOnce")) return;
        view._autoplay =  _.bind(autoplay, view);
        view.$el.on("inview", view._autoplay);
        console.log(view, this);
    
    });

    function autoplay(event, visible, visiblePartX, visiblePartY) {
        if(visible){
            var count = inviewCounter();
            if(this.model.get('_autoPlay') || this.model.get('_autoPlayOnce') && count < 2){
                var player = this.mediaElement.player;
                player.play();
            }
        }

    };

     function inviewCounter(){
            (function () {
                return counter ++; 
            })();
            return counter;
    };

});