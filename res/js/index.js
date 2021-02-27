$(document).ready(function() {

  setTimeout(function(){$("#description").addClass("hide")}, 3000);
  setTimeout(function(){$("#description2").addClass("description2")}, 3000);
  setTimeout(function(){$("#description2").addClass("hide")}, 5250);
  setTimeout(function(){$('html, body').css({'overflow': 'auto', 'height': '3870px', 'width': '100%'})}, 5250);
});

$(window).scroll(function(event) {

  var st = $(window).scrollTop();
  if (st > 100) {
    $("#header, #description, #description2").addClass("slide-right");
    $(".nav_logo").addClass("nav_move_left")
    setTimeout(function(){$(".nav_logo").addClass("nav_move_top")}, 400000);
    setTimeout(function(){$("#description, #description2").addClass("desc_move_top")}, 400);
  } else {
    $("#header, #description, #description2").removeClass("slide-right");
    $(".nav_logo").removeClass("nav_move_left")
    setTimeout(function(){$(".nav_logo").removeClass("nav_move_top")}, 400);
    setTimeout(function(){$("#description, #description2").removeClass("desc_move_top")}, 400);
  }

}); 

