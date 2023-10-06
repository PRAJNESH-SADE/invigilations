(function ($) {
    "use strict";

    // Function to toggle the "Login/Register" button visibility
    function toggleLoginButton() {
        if ($(window).width() <= 992) {
            $('#login-register-btn').show();
        } else {
            $('#login-register-btn').hide();
        }
    }

    // Toggle the "Login/Register" button on initial load
    toggleLoginButton();

    // Toggle the "Login/Register" button when the navbar-toggler icon is clicked
    $('.navbar-toggler').click(function () {
        if ($(window).width() <= 992) {
            $('#login-register-btn').slideToggle();
        }
    });
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(function () {
            toggleNavbarMethod();
            toggleLoginButton(); // Toggle the button on window resize
        });
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);
