// Удаляем прелоадер пренудительно через две секунды
setTimeout(function () {
  document.querySelector("#fk-preload").style.opacity = "0";
}, 2000);

fkListenTransition( "#fk-preload", "remove" );