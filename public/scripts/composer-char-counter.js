$(document).ready(function () {
  console.log('DOM Ready');

  $("#tweet-text").on("input", function () {
    const textLength = $(this).val().length;
    const counter = $(this).parent(".formTweeterText").find(".counter");
    const value = 140 - textLength;

    counter.text(value);

    console.log(textLength, counter);

    if (value < 0) {
      counter.addClass("redCounter");
    } else if (value >= 0) {
      counter.removeClass("redCounter");
    }
  });
});