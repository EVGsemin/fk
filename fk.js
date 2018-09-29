// Удаляем прелоадер пренудительно через две секунды
setTimeout(function () {
  document.querySelector("#fk-preload").style.opacity = "0";
}, 2000);

fkListenTransition( "#fk-preload", "remove" );
$(window).load(function(){

  fkIcon();
  fkVideo();

  fkFormat();
  $(window).resize(function(){ fkFormat(); });

  //
  //  Скролл-функции
  //

  let
    loadProgressive = 0,
    loadMap = 0;

  $(window).scroll(function () {

    // Ленивая загрузка
    if (varUploadImg === 0 && $(window).scrollTop() > 500) {
      fkLoadProgressive();
      loadProgressive = 1;
    }

    // Загрузка карты
    if (varInsertMap === 0 && $(window).scrollTop() > 800) {
      fkLoadMap();
      loadMap = 1;
    }

  });

});
$(document).ready(function() {

  $("#fk-preload").css("opacity", "0");
  if ( fkGetParam("mail") ) alert( fkGetParam("mail") );

});
//
//  Выполняет операции копирования/вставки/и т.д. при клике на элемент
//
//  div.fk-click-action(data-class-add="active")

function fkClickAction() {
  $(".fk-click-action").click(function () {
    let
      target        = $(this).data("target"),
      vThis         = $(this),
      vClassAdd     = $(this).data("class-add"),
      vClassRemove  = $(this).data("class-remove"),
      vHtml         = $(this).data("html"),
      vHtmlCopy     = $($(this).data("html-copy")).html(),
      pastHtml;


    // Задаём контент для вставки
    if (vHtml) pastHtml = vHtml;
    else pastHtml = vHtmlCopy;

    // Обозначаем цель
    if (target === "this" || !target) {
      action(vThis);
    } else {
      action(target);
    }

    function action(target) {
      $(target)
        .addClass(vClassAdd)
        .removeClass(vClassRemove)
        .html(pastHtml);
    }
  })
}
//
//  Врезает по параметрам родительского окна изображение класса .fk-format
//
//  div.fk-format(data-bg-position="contain")
//    img(src="/img.jpg")

function fkFormat() {
  $(".fk-format").each(function () {
    let
      thisBox = $(this),
      boxH = thisBox.height(),
      boxW = thisBox.width();


    thisBox.find("img").each(function () {
      let thisImg = $(this);

      // Если полное изображение
      if (thisBox.data("bg-position") !== "contain") {
        thisImg.attr("width", boxW);

        if (thisImg.height() < boxH) {
          thisImg.attr("width");

          thisImg.attr("height", boxH);
          thisImg.attr("width", "auto");
        }

        // Позиционируем изображение
        let
          imgH = thisImg.height(),
          imgW = thisImg.width(),
          memW,
          memH;


        if (boxW < imgW) {
          memW = (imgW - boxW) / 2;
          thisImg.css("left", -memW);
        }

        if (boxH < imgH) {
          memH = (imgH - boxH) / 2;
          thisImg.css("top", -memH);
        }
      }

      // Если умещаем по центру
      else {
        thisImg.attr("height", boxH);
        thisImg.attr("width", "auto");

        if (thisImg.width() > boxW) {
          thisImg.attr("width", boxW);
          thisImg.attr("height", "auto");
        }

        // Позиционируем изображение
        let
          imgH = thisImg.height(),
          imgW = thisImg.width(),
          memW,
          memH;


        if (imgH < boxH) {
          memH = (boxH - imgH) / 2;
          thisImg.css("top", memH);
        }
        else if (imgH === boxH) {
          thisImg.css("top", "0");
        }

        if (imgW < boxW) {
          memW = (boxW - imgW) / 2;
          thisImg.css("left", memW);
        }
        else if (imgW === boxW) {
          thisImg.css("left", "0");
        }
      }


      // Перепроверяем позиции
      if (
        Math.round( thisImg.width() ) ===
        Math.round(boxW) ) {

        thisImg.css("left", "0");
      }

      if (
        Math.round( thisImg.height() ) ===
        Math.round(boxH) ) {

        thisImg.css("top", "0");
      }

    });
  });
}
//
//  Возвращает нужные GET-параметры
//

function fkGetParam( param ) {
  let params = window.location.search.replace('?','').split('&').reduce(function(p,e){
    let a = e.split('=');
    p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
    return p;
  }, {});

  return params[param];
}
//
//  Спрайты
//  # Для использования спрайтов через UiKit
//

function fkIcon() {
  $( ".fk-icon" ).each( function () {
    $(this).find( "[fill*='#']" ).each(function () {
      let fill = $(this).attr( "fill" );

      $(this).attr( "fill", toRgb(fill) );
    });

    $(this).find( "[stroke*='#']" ).each(function () {
      let stroke = $(this).attr( "stroke" );
      $(this).attr( "stroke", toRgb(stroke) );
    });
  });
}
//
//  Устанавливает колбэк на завершение анимации элемента
//

function fkListenTransition(elem, callback = () => document.querySelector(elem).style.display = 'none') {
  if ( document.querySelector(elem) ) {
    document.querySelector(elem).addEventListener("transitionend", function(){
      callback === "remove" ? document.querySelector(elem).remove() : callback();
    }, true);
  }
}
//
//  Ленивая подгрузка карты
//
//  # div.fk-load-map(data-map="<iframe>...</iframe>")

function fkLoadMap() {
  let dataMap;

  $(".fk-load-map").each(function() {
    dataMap = $(this).data("map");
    $(this).replaceWith(dataMap);
  });
}
//
//  Ленивая загрузка картинок и фонов
//
//  # div.fk-load-progressive(data-bg="/img.jpg")
//  # img.fk-load-progressive(data-src="/img.jpg")

function fkLoadProgressive() {
  $(".fk-load-progressive").each(function () {
    let
      elem    = $(this),
      dataSrc = elem.data("src"),
      dataBg  = elem.data("bg");


    if ( dataSrc != undefined && dataSrc != false && dataSrc != "") {
      elem.attr("src", dataSrc);
    } else {
      elem.css("background-image", `url('${dataBg}')`);
    }
  });
}
//
//  Подгружает видео в блок при необходимости (по клику)
//
//  # div.fk-video.fk-video_inverse.fk-video_off.fk-progressive-load(data-bg="/img.jpg" data-video="<iframe src='https://www.youtube.com/embed/brEPfujiPh0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>")

function fkVideo() {
  $(".fk-video").click(function () {
    let
      elem = $(this),
      elemH = elem.height(),
      elemVideo = elem.data("video");


    elem.css("height", elemH);
    elem.html(elemVideo);
    elem.removeClass("fk-video_off");

    elem.find("iframe").height("100%").width("100%");
  });
}


//
// HEX в RGB
//

function toRgb(hex) {
  let m = hex.slice(1).match(/.{2}/g);

  m[0] = parseInt(m[0], 16);
  m[1] = parseInt(m[1], 16);
  m[2] = parseInt(m[2], 16);

  return `rgb(${m[0]},${m[1]},${m[2]})`;
}