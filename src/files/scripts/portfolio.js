$(function() {
    var projects = $('.projects > article');
    function setFilter() {
        var filter = window.location.hash;
        projects.removeClass('filtered');
        if (filter == '#' || filter == '') return;
        projects.not(':has(p.meta a[href=' + filter + '])').addClass('filtered');
    }
    $(window).bind( 'hashchange', setFilter);
    setFilter();
});