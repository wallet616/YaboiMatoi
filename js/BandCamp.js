$(document).ready(() => {
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var music_url = "https://yaboimatoi.bandcamp.com/music";
    var profile_link = "https://yaboimatoi.bandcamp.com";
    var target_element = $("#music-list");



    var loadingAnimation = new LoadingAnimation();
    loadingAnimation.init({
        element: "#loadingAnimation",
        mode: "prepend",
        size: 100
    });
    loadingAnimation.start();


    function getMusicElementAsHtml(data) {
        var pattern = `
            <div class="col-xs-11 col-md-6 col-xl-4 text-center">
                <a href="${profile_link + data.page_url}" class="music-box slideanim slideanim-fast">
                    <div class="music-holder">
                        <div class="image-border">
                            <img src="${data.image_url}" class="image">
                        </div>
                        <div class="music-title">
                            ${data.title}
                        </div>
                        <div class="music-date">
                            ${data.short_date}
                        </div>
                    </div>
                </a>
            </div>`;

        return pattern;
    }

    function processMusicSite(response) {
        var json_data;
        var img_links;

        var list_pattern = /(<ol\s+class="editable-grid\s+music-grid\s+columns-3\s+public"\s+data-edit-callback="\/music_reorder"\s+data-initial-values=")(.*?)(">)/;
        json_data = response.match(list_pattern)[0];
        json_data = json_data.replace(list_pattern, "$2");

        json_data = json_data
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#039;/g, "'");

        json_data = JSON.parse(json_data);
        json_data.forEach((e) => {
            var date = new Date(e.publish_date);
            e.short_date = (date.getUTCMonth() + 1) + " / " + date.getUTCFullYear();
        });


        var images_list_pattern = /(<div class="art">\s+<img src=")(.*?)(" alt="" \/>\s+<\/div>)/g;
        img_links = response.match(images_list_pattern);
        for (var i in img_links) {
            json_data[i].image_url = img_links[i].replace(images_list_pattern, "$2");
        }


        // Display the list.
        loadingAnimation.remove();
        target_element.empty();
        for (var i in json_data) {

            setTimeout((e) => {
                var asHtml = getMusicElementAsHtml(e);
                target_element.append(asHtml);
                $(window).scroll();

            }, i * 200, json_data[i]);
        }
    }


    $.ajax({
        method: "GET",
        url: proxy + music_url,
        contentType: "text/plain",
        crossDomain: true,
        cache: false,
        processData: false,
        error: function (response) {
            console.error(response);
        },
        success: processMusicSite
    });

});