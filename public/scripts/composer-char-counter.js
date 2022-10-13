/* Loading webpage on DOM initialization */
$(document).ready(function () {
  console.log('DOM Ready');

  /* Function to handle input in the text box, and update the character counter accordingly.
  If the user exceeds 140 characters, the counter will turn red and begin incrementing in the negatives */
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

  /* Function to handle the button at the bottom right of the page if the user scrolls 600 pixels down.
  If the user has scrolled past 600 pixels, display and fade in a button that (once clicked) will take them back to the top.
  Otherwise, fade the button out slowly (will only happen when they are at the top of the page) */
  $(document).scroll(function() {
    let distance = $(this).scrollTop();
    if (distance > 600) {
      $(".fa-solid.fa-circle-chevron-up").fadeIn("slow");
      $(".fa-solid.fa-circle-chevron-up").removeClass("error-hide");
    } else {
      $(".fa-solid.fa-circle-chevron-up").fadeOut("slow");
    }
  });

  $(".fa-solid.fa-circle-chevron-up").on("click", () => {
    window.scrollTo(0, 0);
  });
});