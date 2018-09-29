//** ИНИЦИАЛИЗАЦИИ

// Инициализация слайдера
setSlider("body");
actionFkSliderControl();

// Инициализация коллапсов
actionCollapse();
actionSetHeight();

// Отслеживаем прелоадер
transitionListen("#fk-preload", "remove");

// Удаляем прелоадер пренудительно через три секунды
setTimeout(function () {
  document.querySelector("#fk-preload").style.opacity = "0";
}, 4000);

// Отслеживаем .fk-video
actionVideo();


//** СОБЫТИЯ ПРИ СКРОЛЛЕ

window.onload = function () {
  let
    varInsertMap = 0,
    varUploadImg = 0;

  $("#fk-preload").css("opacity", "0");

  $(window).scroll(function () {

    // Крепит отзывчивое меню
    if ($(window).scrollTop() > 630) {
      $("#nav-line").removeClass("fk-show_off");
    }
    else {{
      $("#nav-line").addClass("fk-show_off");
    }

    // Загружаем отложенные изображения
    if (varUploadImg === 0 && $(window).scrollTop() > 500) {
      fkUploadImg();
      varUploadImg = 1;
    }

    // Вставляет карты
    if (varInsertMap === 0 && $(window).scrollTop() > 800) {
      insertMap();
      varInsertMap = 1;
    }

  });
}


//** МОДАЛЬНОЕ ОКНО

$(".fk-modal-toggle").click(function () {
  fkModalToggle(
    $(this).data("modal-target"),
    $(this).data("modal-style")
  );
});

// Скрытие окна
let modalWindowClick = 0;

$(".fk-modal__container").click(function () {
  modalWindowClick = 1;
});

$("#fk-modal").click(function () {
  fkModalClose();
});

// Переключатель окна
function fkModalToggle( target, style ) {
  let
    fkModal = $("#fk-modal"),
    modalStyle = "fk-double-bg_" + style,
    memModalShow;


  // Если тоггл задал другой стиль в `data-modal-style`
  if (style) {
    fkModal.addClass( modalStyle );
    fkModal.data("remove-style", modalStyle); // Сообщаем, какой класс стереть при закрытии окна
  }

  if (target) {
    $("#fk-modal_" + target).removeClass("display-none");
    fkModal.removeClass("fk-show_off");
    $("body").css("overflow", "hidden");
  }

  else {
    fkModalClose();
  }
}

function fkModalClose() {
  let fkModal = $("#fk-modal");

  // Если клик был не по контенту
  if (modalWindowClick != 1) {
    fkModal.addClass("fk-show_off");
    $(".fk-modal__container").addClass("display-none");
    $("body").css("overflow", "auto");
  }

  setTimeout(function () {
    fkModal.removeClass( fkModal.data("remove-style") );
  }, 500);

  modalWindowClick = 0;
}


//** СЛАЙДЕР

function setSlider(area) {
  let iSliderId = 1;

  $(area + " .fk-slider").each(function () {
    let
      iSliderItem    = 1,
      fkShow         = $(this).data("slider-show"),
      notFkShow      = 0,
      sliderControl  = 1;

    // Проверка `data`
    if ( !fkShow ) fkShow = "top";
    if (fkShow === "not") notFkShow = 1; // Ставим метку, что анимация отключена

    // Размечаем слайдеры; входим в каждый их бокс и размечаем слайды
    $(this).attr("id", "fk-slider_" + iSliderId).find(".fk-slider__box").each(function () {
      let
        iSliderItem = 1,
        firstOn;

      $(this).find(".fk-slider__item").each(function () {

        // Если первый
        if (iSliderItem === 1) {

          if (notFkShow === 1) {
            firstOn = "";
          } else {
            firstOn = "active fk-show fk-show_" + fkShow;
          }
        }

        // Если не первый
        else {

          if (notFkShow === 1) {
            firstOn = "display-none";
          } else {
            firstOn = "fk-show fk-show_" + fkShow + " fk-show_off";
          }
        }

        // Применяем значения
        $(this).addClass(firstOn);

        iSliderItem++;
      });

      // Записываем количество слайдов
      $("#fk-slider_" + iSliderId)
        .data("slider-number", --iSliderItem)
        .data("slider-current", 1);
    });


    let slider = $("#fk-slider_" + iSliderId);

    // Записываем данные в контроллеры
    slider.find(".fk-slider__control")
      .data("slider-id", iSliderId);

    // К порядковым контроллерам (если есть) добавляется их порядковый номер
    slider.find(".fk-slider__control-box .fk-slider__control")
      .each(function () {
        $(this).data("slider-control", sliderControl++);
      });

    // Отмечаем первый элемент
    slider.find(".fk-slider__control:first-child").addClass("end");
    slider.find(".fk-slider__control-box .fk-slider__control:first-child").addClass("active");

    iSliderId++;
  });
}

function actionFkSliderControl() {
  $(".fk-slider__control").click(function () {
    let
      control        = $(this).data("slider-control"),   // Куда движемся (prev/next/номер слайда)
      sliderId       = $(this).data("slider-id"),        // ID слайдера
      slider         = $("#fk-slider_" + sliderId),
      sliderNumber   = slider.data("slider-number"),     // Количество слайдов
      currItem       = slider.data("slider-current"),    // Текущий слайд
      dataShow       = slider.data("slider-show");       // Узнаём, как переключать (display-none или fk-show_off)

    sliderControl(
      control,
      sliderId,
      slider,
      sliderNumber,
      currItem,
      dataShow
    );
  });
}

function sliderControl(
  control,
  sliderId,
  slider,
  sliderNumber,
  currItem,
  dataShow ) {

  let toggleClass;

  if (dataShow === "not") {
    toggleClass = "display-none";
  } else {
    toggleClass = "fk-show_off";
  }

  fkGetSliderItem(sliderId, currItem).toggleClass("active " + toggleClass);
  fkGetSliderControl(sliderId, currItem).removeClass("active");
  slider.find(".fk-slider__control").removeClass("end");


  //** ОБРАБАТЫВАЕМ

  // Вперёд по кнопке, или если `data` не задан
  if (control === "next" || !control) {
    if (currItem < sliderNumber) {
      currItem++;
      fkGetSliderItem(sliderId, currItem).toggleClass("active " + toggleClass);
      fkGetSliderControl(sliderId, currItem).toggleClass("active");
      slider.data("slider-current", currItem);
    }

    else if (currItem === sliderNumber) {
      fkGetSliderItem(sliderId, 1).toggleClass("active " + toggleClass);
      fkGetSliderControl(sliderId, 1).toggleClass("active");
      slider.data("slider-current", 1);
    }
  }

  // Назад
  else if (control === "prev") {
    if (currItem > 1) {
      --currItem;
      fkGetSliderItem(sliderId, currItem).toggleClass("active " + toggleClass);
      fkGetSliderControl(sliderId, currItem).toggleClass("active");
      slider.data("slider-current", currItem);
    }

    else if (currItem === 1) {
      fkGetSliderItem(sliderId, sliderNumber).toggleClass("active " + toggleClass);
      fkGetSliderControl(sliderId, sliderNumber).toggleClass("active");
      slider.data("slider-current", sliderNumber);
    }
  }

  // Порядковый
  else {
    fkGetSliderItem(sliderId, control).toggleClass("active " + toggleClass);
    fkGetSliderControl(sliderId, control).toggleClass("active");
    slider.data("slider-current", control);
  }


  //** МЕТИМ КОНЕЧНЫЕ КОНТРОЛЛЕРЫ

  if (slider.data("slider-current") === 1) {
    slider.find(".fk-slider__control:first-child").addClass("end");
  }

  else if (slider.data("slider-current") === sliderNumber) {
    slider.find(".fk-slider__control:last-child").addClass("end");
  }

}

function fkGetSliderItem(slider, item) {
  return $("#fk-slider_" + slider + " .fk-slider__item:nth-child(" + item + ")");
}

function fkGetSliderControl(slider, item) {
  return $("#fk-slider_" + slider + " .fk-slider__control-box .fk-slider__control:nth-child(" + item + ")");
}


//** АВТОМАТИЧЕСКАЯ ВЫСОТА РОДИТЕЛЕЙ FK-SHOW

function actionSetHeight() {
  $(".fk-show_set-height").click(function () {
    fkShowSetHeight( $(this) );
  });
}

$(function () {
  $(".fk-show_set-height").each(function () {
    fkShowSetHeight( $(this) );
  });
});

function fkShowSetHeight(elem) {

  elem.find(".fk-show").each(function () {
    let
      showElem    = $(this),
      elemHeight  = 0,
      parent      = showElem.parent("*");


    // Получаем высоту активного блока
    parent.find(".fk-show").each(function () {

      if ( !$(this).hasClass("fk-show_off") ) {
        elemHeight = $(this).height();
      }

      $(this).css("top", "0");
    });

    // Устанавливаем высоту
    parent.css("padding-top", elemHeight);

  });
}


//** КОЛЛАПСЫ

function actionCollapse(){
  $(".fk-collapse__item").click(function () {
    $(this)
      .toggleClass("active")
      .find(".fk-show").toggleClass("fk-show_off");
  });
}


//** ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ

$("body").on('click', '[href*="#"]', function (e) {
  var fixed_offset = 80;
  $('html,body').stop().animate({scrollTop: $(this.hash).offset().top - fixed_offset}, 900);
  e.preventDefault();
});


//** ОТПРАВКА ПОЧТЫ

// Отправка ajax
$(document).ready(function() {

  $(".fk-mail").submit(function() {
    let th = $(this);

    $.ajax({
      type: "POST",
      url: "mail/mail.php",
      data: th.serialize()})

      .done(function() {

        fkModalToggle("mail");

        setTimeout(function() {
          th.trigger("reset");
        }, 1000);

        setTimeout(function() {
          fkModalClose();
        }, 4000);
      });

    return false;
  });

});

// Уведомление о результате отправки, если ajax не используется
$(document).ready(function() {
  let params = window.location.search.replace('?','').split('&').reduce(function(p,e){
    let a = e.split('=');
    p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
    return p;
  }, {});

  if (params["mail"]) {
    alert(params["mail"]);
  }
});


//** ПОДМЕНА КЛАССА И HTML

$(".click-action").click(function () {
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
});


//** ФОРМАТ ИЗОБРАЖЕНИЙ

fkBoxFormat();

$(window).resize(function () {
  fkBoxFormat();
});

function fkBoxFormat() {
  $(".fk-box-format").each(function () {
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


//** ОТЛОЖЕННАЯ ВСТАВКА КАРТЫ

function insertMap() {
  let dataMap;

  $(".insert-map").each( function() {
    dataMap = $(this).data("map");

    $(this).replaceWith(dataMap);

    console.log("map-insert");
  } );
}


//** КОЛБЭК НА ОКОНЧАНИЕ `TRANSITION`

function transitionListen(elem, callback = () => document.querySelector(elem).style.display = 'none') {
  if ( document.querySelector(elem) ) {
    document.querySelector(elem).addEventListener("transitionend", function(){
      callback === "remove" ? document.querySelector(elem).remove() : callback();
    }, true);
  }
}


//** FK-VIDEO

function actionVideo() {
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


//** ЗАГРУЗКА ОТЛОЖЕННЫХ ИЗОБРАЖЕНИЙ

function fkUploadImg() {
  $(".fk-upload-img").each(function () {
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