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