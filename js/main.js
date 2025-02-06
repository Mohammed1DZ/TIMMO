/* Javascript */

/* window.load */
$(window).load(function() {

    $('#wrapper').fadeIn(100);
    hideLoader(350);

    for (var i = 0; i < $('.swiper-container').length; i++) {
        $('.swiper-container')[i].swiper.update()
    }

    $('.charts .tab-cont').click(function() {
        $('.charts .tab-cont').removeClass('active');
        $(this).addClass('active');
    });

    $('.header .user-area').click(function() {
        $('.header .user-data').fadeToggle(200);
    });

    $('.header .user-data .cancel-btn').click(function() {
        $('.header .user-data').hide();
    });



});

// show loader
function showLoader(sec) {
    sec = sec || 0;
    $('#loader').fadeIn(sec);
}
// hide loader
function hideLoader(sec) {
    sec = sec || 0;
    $('#loader').fadeOut(sec);
}

function getEmSize() {
    var em = $(window).width() / parseFloat($("html").css("font-size"));
    return em;
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {}
}

function highlight() {
    $("div, span, i, a").each(function() {
        var hue = 'rgb(' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ')';
        $(this).css("background-color", hue);
    });
}
