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