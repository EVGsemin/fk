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

