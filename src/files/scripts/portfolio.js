$(function() {
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
});