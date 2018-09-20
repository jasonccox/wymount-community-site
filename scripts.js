$(document).ready(function(){

  //set up important variables
  var scrollSpeed = 500; //in ms
  var headerHeight = $("header").height(); //in px
  var numAnnouncements = 5; //# of announcements to show in feed

  //smooth scroll to page sections without modifying url
  $(".jq-scroll").on("click", function(){

    //get link href
    var ref = $(this).attr("href");

    //scroll to location
    $("html,body").animate({scrollTop: $(ref).offset().top - headerHeight}, scrollSpeed);

    //prevent default click action
    return false;
  });

  //small screen menu
  $("#menu-icon").on("click", function() {

    //toggle nav display between grid and none
    if($("nav").is(":visible")) {
      $("nav").css("display", "none");
    } else {
      $("nav").css("display", "grid");
    }
  });

  $("nav a").on("click", function() {
    if($("#menu-icon").is(":visible")){
      $("nav").css("display", "none");
    }
  });

  $(window).resize(function() {
    if($(window).width() > 1135) {
      if($("nav").css("display") != "block") {
        $("nav").css("display", "block");
      }
    } else {
      if($("nav").css("display") != "none") {
        $("nav").css("display", "none");
      }
    }
  });

  //FAQ expand/minimize ansers
  $(".faq__btn i").on("click", function() {

    //toggle answer
    var answerDiv = $(this).parent().parent().find(".faq__a");
    answerDiv.toggle();

    //toggle text of button between + and -
    if(answerDiv.is(":visible")) {
      $(this).addClass("fa-minus-circle");
      $(this).removeClass("fa-plus-circle");
    } else {
      $(this).addClass("fa-plus-circle");
      $(this).removeClass("fa-minus-circle");
    }

  });

  //announcement feed
  $.get("announcements.xml", function (data) {
    var counter = 0;
    $(data).find("item").each(function () { // or "item" or whatever suits your feed
      if(counter >= numAnnouncements){
        return;
      }
      counter++;

      var item = $(this);

      $("#announcement-feed").append("<div id='feed-item-" + counter + "' class='feed-item'></div>");

      var itemE = $("#feed-item-" + counter);

      itemE.append("<div class='feed-item__title'>" + item.find("title").text()+ "</div>");
       
      itemE.append("<div class='feed-item__date'>" + item.find("date").text() + "</div>");
          
      itemE.append("<div class='feed-item__content'>" + item.find("description").html() + "</div>");
    });
});
});