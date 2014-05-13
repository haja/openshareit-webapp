define([
    'durandal/composition'
    , 'jquery'
],
function(
    composition
    , $
)
{
    var log = (window.console ? console.log : function() {});
    var ctor = function() {};
    var URL, parts;

    ctor.prototype.activate = function(settings) {
        this.settings = settings;
        $(document).ready(function() {
            URL = window.URL || window.webkitURL;
        });
    };

    ctor.prototype.attached = function(view) {
        log("composition:", composition.getParts(view));
        parts = composition.getParts(view);
    };

    ctor.prototype.addPhoto = function() {
        log("addPhoto");
        $(parts.fileElem).children("input:first-of-type").click();
    }

    ctor.prototype.handleFiles = function(data, event) {
        log("handleFiles: ", data, event, composition);
        var files = event.currentTarget.files;

        if (!files.length) {
            log("no files.length");
        } else {
            var list = $(parts.fileList).children("ul:first-of-type");
            log("list:", list);

            for (var i = 0; i < files.length; i++) {
                log("copy li");
                var li = $(parts.listElementTemplate).children("li:first-of-type").clone();
                list.prepend(li);

                log("set img");
                var img = $(li).children("img:first-of-type").attr({ src: URL.createObjectURL(files[i]), onload: function(e) {
                    window.URL.revokeObjectURL(this.src);
                } });
            }
            log("new list:", list);
        }
    }

    return ctor;
});
