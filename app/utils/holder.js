define(['holderjs'], function(holder) {
    window.console&&console.log("holder init");
    var obj = {};
    obj.compositionComplete = function() {
        window.console&&console.log("holder CALLBACK");
        holder.run();
    };

    return obj;
});
