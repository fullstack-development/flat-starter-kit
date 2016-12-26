import './location.styl';
import $ from 'jquery';

$(function () {

    $('.js-location').each(function () {
        let coord;
        try {
            coord = JSON.parse($(this).data('coord'));
        }
        catch(e) {
            coord = [56.4531907, 84.9756513]
        }

        ymaps.ready(() => {
            let map = new ymaps.Map($('.js-location__widget', $(this))[0], {
                center: coord,
                zoom: 15,
                controls: []
            });

            let placemark = new ymaps.Placemark(coord, {}, {
                iconLayout: 'default#image',
                iconImageHref: require('./img/map-marker.png'),
                iconImageSize: [56, 56],
                iconImageOffset: [-19, -56]
            });

            map.geoObjects.add(placemark);
        });
    })
});