$(function() {

    /* Filter by tags */

    var projects = $('.projects > article');
    function setFilter() {
        var filter = window.location.hash;
        projects.removeClass('filtered');
        if (filter == '#' || filter == '') return false;
        projects.not(':has(p.meta a[href=' + filter + '])').addClass('filtered');
        return false;
    }
    $(window).bind( 'hashchange', setFilter);
    setFilter();

    $('a.show-small-tags').click(function() {
        $('div.tag-cloud').removeClass('hide-small-tags');
    });

    /* defer loading of everything after the first 20 or so projects */

    var $more = $('#more-projects');
    var $loadMore = $more.find('a')

    // on small-screen devices, wait for the user to click before loading additional
    $loadMore.click(function(e) {
        // loosely based on https://github.com/defunkt/jquery-pjax
        $.get('2/', function(data) {
            var $body = $($.parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
            var $moreProjects = $body.find('div.projects');
            $more.replaceWith($moreProjects);
        });
        $more.find('p.link').hide();
        $more.find('p.loading').fadeIn();
        e.preventDefault();
    });

    // on large screen devices, automatically load in the rest after the first batch completes
    $win = $(window);
    if ($win.width() >= 768) {
        $win.load(function() {
            $loadMore.click();
        });
    }
});