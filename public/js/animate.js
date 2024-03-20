// event.js, jquery
// moving start button -- main page
$(document).ready(function () {
    $('#button-start').click(function () {
        $('html,body').animate({ scrollTop: $('#icon-session').offset().top }, 500);
    });
})
