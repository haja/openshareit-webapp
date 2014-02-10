$(document).ready(function() {
    var jqxhr = $.get(
        "http://api.ionic.at/"
        /*"http://localhost:8000/json" */
        /*url: "http://api.ionic.at/api/" */
        /*"http://rest-service.guides.spring.io/greeting" */
        /*"http://www.thomas-bayer.com/sqlrest/CUSTOMER/18/" */
        )
        .done(function(data) {
            window.console&&console.log(data);
        })
        .fail(function(a, b, c) {
            window.console&&console.log(a);
            window.console&&console.log(b);
            window.console&&console.log(c);
        });
});
