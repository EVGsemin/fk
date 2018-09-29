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