$(document).ready(function(){
    // script for scroll links
    $("a[href='#up']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    // add scroll arrow
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1800) {
            $('.scroll-up').fadeIn();
        }
        else {
            $('.scroll-up').fadeOut();
        }
    });
    // add animate for scroll arrow
    if (screen.width >= 992)  {
        $('.scroll-up').mouseenter(function(){
            $(this).addClass('animate__rubberBand animate__animated');
        });
        $('.scroll-up').mouseleave(function(){
            $(this).removeClass('animate__rubberBand animate__animated');
        });
    }
    
    // Slider
    const slider = tns({
        container: '.slider__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        nav: false,
        controls: false,
        responsive: {
            320: {
                mouseDrag: true
            },
            768: {
                mouseDrag: false
            }
        }
    });
    
    document.querySelector('.prev').addEventListener('click', function () {
        slider.goTo('prev');
    });
    document.querySelector('.next').addEventListener('click', function () {
        slider.goTo('next');
    });

    //  Tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__cards').removeClass('catalog__cards_active')
            .eq($(this).index()).addClass('catalog__cards_active');
        if (screen.width >= 992) {
            if ($(this).closest('div.container').find('div.catalog__cards_active').children().length < 3) {
                $(this).closest('div.container').find('div.catalog__cards_active')
                .addClass('catalog__cards_active_adaptive-list').children()
                .addClass('catalog__card_adaptive-card');
            }
            else {
                $(this).closest('div.container').find('div.catalog__cards_active')
                .removeClass('catalog__cards_active_adaptive-list').children()
                .removeClass('catalog__card_adaptive-card');
            }
        } 
    });

    function cardHideDescr(classActive){

        $(classActive).each(function(i) {
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog__card__wrapper-main').eq(i).toggleClass('catalog__card__wrapper-main_active');
                $('.catalog__card__wrapper-main').each(function(k){
                    if (!($(this).hasClass('catalog__card__wrapper-main_active'))){
                        if ( k != i ) {
                            setTimeout(() => {
                                $(this).addClass('catalog__card__wrapper-main_active');
                            }, 300);
                            
                        }
                    }
                });
                $('.catalog__card__wrapper-second').eq(i).toggleClass('catalog__card__wrapper-second_active');
                $('.catalog__card__wrapper-second').each(function(k){
                    if ($(this).hasClass('catalog__card__wrapper-second_active')){
                        if ( k != i ) {
                            setTimeout(() => {
                                $(this).removeClass('catalog__card__wrapper-second_active');
                            }, 300);
                            
                        }
                    }
                });
            });
        });
    }
    
    cardHideDescr('.catalog__card__link-open');
    cardHideDescr('.catalog__card__link-close');

    // add data attr for catalog buttons
    $('.catalog').find('button.button__card').attr("data-modal", "#order");

    //  Modal
    const scrollbarWidth = `${window.innerWidth - document.body.clientWidth}px`;
    const scrollArrowRight = $('.scroll-up').css('right');
    const scrollArrowRightNew = +(scrollArrowRight.replace(/px/g, '')) + (+(scrollbarWidth.replace(/px/g, '')));

    $('[data-modal="#consultation"]').on('click', function() {
        $('.overlay').fadeIn();
        $('#consultation').fadeIn();
        $('body').addClass('body-scroll-block');
        $('body').css('padding-right', `${scrollbarWidth}`);
        $('.scroll-up').css('right', `${scrollArrowRightNew}px`);
    });

    $('[data-modal="#order"]').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__subtitle').text($('.catalog').find('.catalog__card__title').eq(i).text());
            $('.overlay').fadeIn();
            $('#order').fadeIn();
            $('body').addClass('body-scroll-block');
            $('body').css('padding-right', `${scrollbarWidth}`);
            $('.scroll-up').css('right', `${scrollArrowRightNew}px`);
        });
    });

    $('.modal__close, .overlay__bg').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
        $('body').removeClass('body-scroll-block');
        $('body').css('padding-right', '0px');
        $('.scroll-up').css('right', scrollArrowRight);
    });

    // forms validation
    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 15
                },
                phone: {
                    required: true,
                    minlength: 10
    
                },
                email: {
                    required: true
                },
            },
            messages: {
                phone: {
                    minlength:jQuery.validator.format("Пожалуйста, введите {0} символов")
                }
            }
        });
    }

    validateForm('#consultation form');
    validateForm('#form-consultation');
    validateForm('#order form');
    $('input[name=phone]').removeAttr('type');
    $('input[name=phone]').mask("+7 (999) 999-9999");

    // animate reviews
    $('.reviews__item').attr('data-wow-duration', '0.7s');
    $('.reviews__item').attr('data-wow-delay', '0.5s');

    // add yandex map
    let YaMapsShown = false; 

    $(window).scroll(function() {
        if (!YaMapsShown){
         if($(window).scrollTop() + $(window).height() > $(document).height() - 650) {      
          showYaMaps();
          YaMapsShown = true;
         }
        }
    });

    function showYaMaps(){
    const script   = document.createElement("script");
        script.src   = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af944cf9dd99af2a20a37bb9848d7a8506d35efba562b7879dd711c52cc5ef964&amp;width=100%25&amp;height=630&amp;lang=ru_RU&amp;scroll=false";
        $('#YaMaps').append(script);
    }
});