$(function() {

    var $moreContainer = $('#more-projects');
    var $projects = $('div.projects > article');

    /* defer loading of everything after the first 20 or so projects */

    var loadMore = _.once(function() {
        // loosely based on https://github.com/defunkt/jquery-pjax
        $.get('2/', function(data) {
            var $body = $($.parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
            var $moreProjects = $body.find('div.projects article');
            $moreContainer.replaceWith($moreProjects);
            $projects = $projects.add($moreProjects);
            setFilter(); // show/hide projects as necessary
        });
        $moreContainer.find('p.link').hide();
        $moreContainer.find('p.loading').fadeIn();
    });

    // on small-screen devices, wait for the user to click before loading additional
    $moreContainer.find('a').click(function(e) {
        loadMore();
        e.preventDefault();
    });

    // on large screen devices, automatically load in the rest after the first batch completes
    $win = $(window);
    if ($win.width() >= 768) {
        $win.load(loadMore);
    }


    /* Filter by tags */

    function setFilter() {
        var filter = window.location.hash;
        $projects.removeClass('filtered');
        if (filter == '#' || filter === '') return false;
        $projects.not(':has(p.meta a[href=' + filter + '])').addClass('filtered');
        loadMore(); // if a tag is set, automatically load all remaining projects regardless of browser size and loading status
        return false;
    }
    $(window).bind( 'hashchange', setFilter);
    setFilter();

    $('a.show-small-tags').click(function() {
        $('div.tag-cloud').removeClass('hide-small-tags');
    });
});
