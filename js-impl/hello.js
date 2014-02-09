$(document).ready(function() {
        var jqxhr = $.get(
            "http://api.ionic.at:8000/baskets/1/"
            /*"http://localhost:8000/json" */
            /*url: "http://api.ionic.at/api/" */
            /*"http://rest-service.guides.spring.io/greeting" */
                /*"http://www.thomas-bayer.com/sqlrest/CUSTOMER/18/" */
            )
        .done(function(data) { $('.debug').append("success" + JSON.stringify(data)); })
        .fail(function(a, b, c) { $('.debug').append(JSON.stringify(a) + ";<br />\n" + JSON.stringify(b) + ";<br />\n"  + JSON.stringify(c)); })
});
