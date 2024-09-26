$(function() {

    var $moreContainer = $('#more-projects');
    var $projectsContainer = $('div.projects');
    var $projects = $('div.projects > article');
    var $tagCloud = $('.tag-cloud a');

    /* defer loading of everything after the first 20 or so projects */

    var loadMore = _.once(function() {
        // loosely based on https://github.com/defunkt/jquery-pjax
        $.get('2/', function(data) {
            var $body = $($.parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
            var $moreProjects = $body.find('div.projects article');
            $moreContainer.replaceWith($moreProjects);
            $projects = $projects.add($moreProjects);
            applyFilter(); // show/hide projects as necessary
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

    function getFilter() {
        return location.hash;
    }

    function isFiltered() {
        return !!getFilter().replace('#', '');
    }

    function applyFilter() {
        $projects.removeClass('filtered');
        $tagCloud.removeClass('active');
        if (isFiltered())  {
            var filter = getFilter();
            $projects.not(':has(p.meta a[href=' + filter + '])').addClass('filtered');
            $tagCloud.filter('a[href=' + filter + ']').addClass('active');
            loadMore(); // if a tag is set, automatically load all remaining projects regardless of browser size and loading status
        }
    }

    function animateFilter() {
        $tagCloud.removeClass('active');
        $projectsContainer.slideUp('slow', function() {
            applyFilter();
            $projectsContainer.slideDown('slow');
        });
        return false;
    }
    $(window).bind( 'hashchange', animateFilter);

    if (isFiltered()) {
        animateFilter();
    }

    $('a.show-small-tags').click(function() {
        $('div.tag-cloud').removeClass('hide-small-tags');
    });
});