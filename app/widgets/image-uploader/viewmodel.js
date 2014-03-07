define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'jquery'
],
function(
    ko
    , holder
    , jsonHelper
    , $
    )
{
  var ctor = function() {};
  var URL, fileSelect, fileElem, fileList, $view;

  ctor.prototype.activate = function() {
    $(document).ready(function() {
      URL = window.URL || window.webkitURL;
    });
  };

  ctor.prototype.attached = function(view) {
      $view = $(view);

      fileSelect = $view.find("#fileSelect");
      fileElem = $view.find("#fileElem");
      fileList = $view.find("#fileList");
  };

  ctor.prototype.handleFiles = function(data, event) {
    window.console && console.log("handleFiles: " + data + " event: " + event);
    window.console && console.log(data);
    window.console && console.log("event: ");
    window.console && console.log(event);
    var files = event.currentTarget.files;

    if (!files.length) {
        window.console && console.log("no files.length");
      fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        window.console && console.log("creating ul");
      var list = $('<ul></ul>');
      for (var i = 0; i < files.length; i++) {
        window.console && console.log("creating li");
        var li = $('<li></li>');
        list.append(li);

        window.console && console.log("creating img");
        var img = $('<img />').attr({ src: URL.createObjectURL(files[i]), height: 100, onload: function(e) {
          window.URL.revokeObjectURL(this.src);
        } });
        window.console && console.log("appending img");
        li.append(img);

        /*
        var info = document.createElement("span");
        info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
        li.appendChild(info);
        */
      }
      window.console && console.log("appending ul:");
      window.console && console.log(list);
      fileList.append(list);
      window.console && console.log(list);
      window.console && console.log(fileList);
    }
  }

  return ctor;
});
