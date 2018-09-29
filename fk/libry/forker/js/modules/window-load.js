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