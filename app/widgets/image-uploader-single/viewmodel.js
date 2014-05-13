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

        if (!files.length || files.length < 1) {
            log("no files.length");
        } else {
            var addFileLink = $(parts.currentFile).children("a:first-of-type");

            log("set img");
            var img = $(addFileLink).children("img:first-of-type").attr({
                src: URL.createObjectURL(files[0]), onload: function(e) {
                    window.URL.revokeObjectURL(this.src);
                }
            });
        }
    }

    return ctor;
});
