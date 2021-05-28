$(document).ready(function(){
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

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__cards').removeClass('catalog__cards_active').eq($(this).index()).addClass('catalog__cards_active');
    });

    function cardHideDescr(classActive){
        $(classActive).each(function(i) {
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog__card__wrapper-main').eq(i).toggleClass('catalog__card__wrapper-main_active');
                $('.catalog__card__wrapper-second').eq(i).toggleClass('catalog__card__wrapper-second_active');
            });
        });
    }
    
    cardHideDescr('.catalog__card__link-open');
    cardHideDescr('.catalog__card__link-close');
});