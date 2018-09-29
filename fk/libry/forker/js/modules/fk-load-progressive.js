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