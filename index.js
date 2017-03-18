var scrollToTop = (function() {
    var id = null;
    var delta;
    var height;
    var first = false;
    var scrollToTop = function() {
        var y = window.scrollY;
        if (y > height / 2) {
            delta = delta + 10;
        } else {
            delta = delta - 10;
            delta = delta < 0 ? 10 : delta;
        }
        y = y - delta;
        y = y > 0 ? y : 0;
        window.scrollTo(0, y);
        if (y === 0) {
            clearInterval(id);
        }
    }

    var init = function(config) {

        if (!first) {
            document.addEventListener('mousewheel', function() {
                if (event.deltaY > 0) {
                    clearInterval(id);
                }
            });
            first = true;
        }

        var toTop = document.getElementById(config.id);
        toTop.addEventListener('click', function(event) {
            if (id) {
                clearInterval(id);
            }
            delta = 5;
            height = window.scrollY;
            event.preventDefault();
            id = setInterval(scrollToTop, config.speed);
        });
    }

    return {
        init: init
    };
})();
