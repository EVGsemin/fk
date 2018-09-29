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