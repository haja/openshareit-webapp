define([
    'knockout'
    , 'durandal/composition'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'jquery'
],
function(
    ko
    , composition
    , holder
    , jsonHelper
    , $
)
{
    var log = function(msg) {
        window.console && console.log(msg);
    };
    var ctor = function() {};
    var URL, parts;

    ctor.prototype.activate = function(settings) {
        this.settings = settings;
        $(document).ready(function() {
            URL = window.URL || window.webkitURL;
        });
    };

    ctor.prototype.attached = function(view) {
        log("composition:");
        log(composition.getParts(view));
        parts = composition.getParts(view);
    };

    ctor.prototype.addPhoto = function() {
        log("addPhoto");
        $(parts.fileElem).children("input:first-of-type").click();
    }

    ctor.prototype.handleFiles = function(data, event) {
        log("handleFiles: ");
        log(data);
        log("event: ");
        log(event);
        var files = event.currentTarget.files;
        log("composition:");
        log(composition);

        if (!files.length) {
            log("no files.length");
        } else {
            var list = $(parts.fileList).children("ul:first-of-type");
            log("list:");
            log(list);

            for (var i = 0; i < files.length; i++) {
                log("copy li");
                var li = $(parts.listElementTemplate).children("li:first-of-type").clone();
                list.prepend(li);

                log("set img");
                var img = $(li).children("img:first-of-type").attr({ src: URL.createObjectURL(files[i]), onload: function(e) {
                    window.URL.revokeObjectURL(this.src);
                } });
            }
            log(list);
        }
    }

    return ctor;
});
