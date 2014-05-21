define([
    'durandal/composition'
    , 'jquery'
],
function(
    composition
    , $
)
{
    var ctor = function() {};
    var URL, parts;

    ctor.prototype.activate = function(settings) {
        this.settings = settings;
        $(document).ready(function() {
            URL = window.URL || window.webkitURL;
        });
    };

    ctor.prototype.attached = function(view) {
        window.console&&console.log("composition:", composition.getParts(view));
        parts = composition.getParts(view);
    };

    ctor.prototype.addPhoto = function() {
        window.console&&console.log("addPhoto");
        $(parts.fileElem).children("input:first-of-type").click();
    }

    ctor.prototype.handleFiles = function(data, event) {
        window.console&&console.log("handleFiles: ", data, event, composition);
        var files = event.currentTarget.files;

        if (!files.length) {
            window.console&&console.log("no files.length");
        } else {
            var list = $(parts.fileList).children("ul:first-of-type");
            window.console&&console.log("list:", list);

            for (var i = 0; i < files.length; i++) {
                window.console&&console.log("copy li");
                var li = $(parts.listElementTemplate).children("li:first-of-type").clone();
                list.prepend(li);

                window.console&&console.log("set img");
                var img = $(li).children("img:first-of-type").attr({ src: URL.createObjectURL(files[i]), onload: function(e) {
                    window.URL.revokeObjectURL(this.src);
                } });
            }
            window.console&&console.log("new list:", list);
        }
    }

    return ctor;
});
