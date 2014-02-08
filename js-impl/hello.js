$(document).ready(function() {
    $.ajax({
        /*url: "http://rest-service.guides.spring.io/greeting" */
        url: "http://api.ionic.at:8000/baskets/1/"
    }).error(function(data) {
        alert("error");
    });
});
