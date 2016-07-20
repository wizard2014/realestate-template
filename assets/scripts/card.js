(function() {
    $('.card-reveal-toggle').on('click', function () {
        toggleReveal($(this));
    });

    $('.custom-card-reveal .close').on('click', function () {
        toggleReveal($(this));
    });

    function toggleReveal(el) {
        el.parents('.custom-card').find('.custom-card-reveal').slideToggle('slow');
    }
})();