$(function() {

    var $moreContainer = $('#more-projects');
    var $projectsContainer = $('div.projects');
    var $projects = $('div.projects > article');
    var $tagCloud = $('.tag-cloud a');

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
