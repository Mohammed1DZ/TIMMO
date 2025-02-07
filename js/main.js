/* Javascript */

/* window.load */
$(window).load(function() {

    $('#wrapper').fadeIn(100);
    hideLoader(350);

    // Initial call to display date and time
    updateDateTime(); 

    // Update the time and date every 60 seconds
    setInterval(updateDateTime, 60000);

    for (var i = 0; i < $('.swiper-container').length; i++) {
        $('.swiper-container')[i].swiper.update();
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

    // Function to update day, month, and time
    function updateDateTime() {
        const date = new Date();

        // Get formatted day, month, and time
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // Update the corresponding HTML elements
        $('#day-month').text(`${day} ${month}`);
        $('#current-time').text(`${hours}:${minutes}`);
    }
});

// Show loader
function showLoader(sec) {
    sec = sec || 0;
    $('#loader').fadeIn(sec);
}

// Hide loader
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
        var hue = 'rgb(' + 
            (Math.floor((256 - 199) * Math.random()) + 200) + ',' +
            (Math.floor((256 - 199) * Math.random()) + 200) + ',' +
            (Math.floor((256 - 199) * Math.random()) + 200) + ')';
        $(this).css("background-color", hue);
    });
}
