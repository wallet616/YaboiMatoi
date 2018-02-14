$(document).ready(() => {
    function checkScrollPosition() {
        var offsetTop = $(window).height() / 8; // Start showing at 1/8 of page
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop() + window.innerHeight;
            //console.log((pos + offsetTop) + ", " + winTop);
            if (pos + offsetTop < winTop) {
                $(this).addClass("slide");
            }
        });
    }
    $(window).scroll(checkScrollPosition);
    $(window).resize(checkScrollPosition);
    checkScrollPosition();
});