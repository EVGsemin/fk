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