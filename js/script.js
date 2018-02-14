function showOrHide(selector_to_spy_on, px_from_top, target_selector, to_add, to_remove) {
    var active = true;
    var time = 60;
    var last_action = null;

    selector_to_spy_on = $(selector_to_spy_on);
    px_from_top = px_from_top;
    target_selector = $(target_selector);

    function inside_loop() {
        setTimeout(() => {
            if (!active) return;

            var from_top = selector_to_spy_on.offset().top;
            if (from_top >= px_from_top) {
                if (last_action !== 1) {
                    last_action = 1;

                    target_selector.addClass(to_add);
                    target_selector.removeClass(to_remove);
                }
            } else {
                if (last_action !== 0) {
                    last_action = 0;

                    target_selector.addClass(to_remove);
                    target_selector.removeClass(to_add);
                }
            }

            inside_loop();
        }, time);
    }
    inside_loop();
}

function scrollTo(e) {
    e.preventDefault();

    // store hash
    var hash = this.hash;
    var val = $(hash).offset().top - 50;
    $("html, body").animate({
        scrollTop: val
    }, 300, function () {
        window.location.hash = hash;
        $("html, body").scrollTop(val);
    });
}

$(document).ready(() => {
    $("#navbarSupportedContent a[href^='#']").on("click", scrollTo);


    var navMain = $(".navbar-collapse");
    navMain.on("click", "a:not([data-toggle])", null, function () {
        navMain.collapse('hide');
    });

    showOrHide("nav.navbar", 50, "nav.navbar", "bg-light", "bg-invisible");
});