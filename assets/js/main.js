(function ($) {
    'use strict';
    /*=============================================
	=              Preloader       =
    =============================================*/
    function preloader() {
        $('#preloader').delay(0).fadeOut();
    }
    /*=============================================
    =     Offcanvas Menu      =
    =============================================*/
    function offcanvasMenu() {
        $('.menu-tigger').on('click', function () {
            $('.offCanvas__info, .offCanvas__overly').addClass('active');
            return false;
        });
        $('.menu-close, .offCanvas__overly').on('click', function () {
            $('.offCanvas__info, .offCanvas__overly').removeClass('active');
        });
    }
    /*=============================================
	=          Data Background      =
    =============================================*/
    function dataBackground() {
        $('[data-background]').each(function () {
            $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
        });
    }
    /*=============================================
	=           Go to top       =
    =============================================*/
    function progressPageLoad() {
        var progressWrap = document.querySelector('.btn-scroll-top');
        if (progressWrap != null) {
            var progressPath = document.querySelector('.btn-scroll-top path');
            var pathLength = progressPath.getTotalLength();
            var offset = 50;
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
            window.addEventListener('scroll', function (event) {
                var scroll = document.body.scrollTop || document.documentElement.scrollTop;
                var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
                var scrollElementPos = document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollElementPos >= offset) {
                    progressWrap.classList.add('active-progress');
                } else {
                    progressWrap.classList.remove('active-progress');
                }
            });
            progressWrap.addEventListener('click', function (e) {
                e.preventDefault();
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            });
        }
    }
    /*=============================================
	=           counterState       =
    =============================================*/
    // NOTE: Uses .odometer elements via odometerCounter() below.
    // counterState() (plain .counter class) removed — not used in any page.
    /*=============================================
	=           Swiper       =
    =============================================*/
    function customSwiper() {
        // Only slider-two is used in index.html.
        // slider-one, slider-1, slider-2 removed — no matching elements on any page.
        if ($('.slider-two').length) {
            const slidertwo = new Swiper('.slider-two', {
                slidesPerView: 1,
                slidesPerGroup: 1,
                centeredSlides: false,
                loop: true,
                autoplay: {
                    delay: 4000,
                },
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    }
    /*=============================================
	=           Carousel Ticker       =
    =============================================*/
    function carauselScroll() {
        $('.carouselTicker-left').each(function () {
            $(this).carouselTicker({
                direction: 'prev',
                speed: 1,
                delay: 30,
            });
        });
        $('.carouselTicker-right').each(function () {
            $(this).carouselTicker({
                direction: 'next',
                speed: 1,
                delay: 30,
            });
        });
    }
    /*=============================================
	=           Odometer Counter       =
    =============================================*/
    function odometerCounter() {
        if ($('.odometer').length > 0) {
            $('.odometer').appear(function (e) {
                var odo = $('.odometer');
                odo.each(function () {
                    var countNumber = $(this).attr('data-count');
                    $(this).html(countNumber);
                });
            });
        }
    }
    /*=============================================
	=           Input Focus       =
    =============================================*/
    function inputFocus() {
        $('input')
            .focus(function () {
                $(this).closest('div.input-group').addClass('focus');
            })
            .blur(function () {
                $(this).closest('div.input-group').removeClass('focus');
            });
        $('textarea')
            .focus(function () {
                $(this).closest('div.input-group').addClass('focus');
            })
            .blur(function () {
                $(this).closest('div.input-group').removeClass('focus');
            });
        $('select')
            .focus(function () {
                $(this).closest('div.input-group').addClass('focus');
            })
            .blur(function () {
                $(this).closest('div.input-group').removeClass('focus');
            });
    }
    /*=============================================
	=           Mobile Header       =
    =============================================*/
    function mobileHeaderActive() {
        var navbarTrigger = $('.burger-icon'),
            endTrigger = $('.mobile-menu-close'),
            container = $('.mobile-header-active'),
            wrapper4 = $('body');
        wrapper4.prepend('<div class="body-overlay-1"></div>');
        navbarTrigger.on('click', function (e) {
            navbarTrigger.toggleClass('burger-close');
            e.preventDefault();
            container.toggleClass('sidebar-visible');
            wrapper4.toggleClass('mobile-menu-active');
        });
        endTrigger.on('click', function () {
            container.removeClass('sidebar-visible');
            wrapper4.removeClass('mobile-menu-active');
        });
        var $offCanvasNav = $('.mobile-menu'),
            $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');
        $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="arrow-small-down"></i></span>');
        $offCanvasNavSubMenu.slideUp();
        $offCanvasNav.on('click', 'li a, li .menu-expand', function (e) {
            var $this = $(this);
            if (
                $this
                    .parent()
                    .attr('class')
                    .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
                ($this.attr('href') === '#' || $this.hasClass('menu-expand'))
            ) {
                e.preventDefault();
                if ($this.siblings('ul:visible').length) {
                    $this.parent('li').removeClass('active');
                    $this.siblings('ul').slideUp();
                } else {
                    $this.parent('li').addClass('active');
                    $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                    $this.closest('li').siblings('li').find('ul:visible').slideUp();
                    $this.siblings('ul').slideDown();
                }
            }
        });
    }
    /*=============================================
	=           Page Load       =
    =============================================*/
    $(window).on('load', function () {
        preloader();
        progressPageLoad();
        offcanvasMenu();
        dataBackground();
        customSwiper();
        // REMOVED (zero matching elements on any page):
        // wowAnimation()       — no .wow elements
        // aosAnimation()       — no data-aos attributes
        // magnificPopup()      — no .popup-image/.popup-video elements
        // masonryFillter()     — no .masonry-active elements
        // counterState()       — no .counter elements (uses odometer instead)
        // cardScroll()         — no .cards/.card-custom elements
        carauselScroll();
        odometerCounter();
        inputFocus();
        mobileHeaderActive();
    });
})(jQuery);
