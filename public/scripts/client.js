/* Function creates jquery handlers for turning all inputted text into non-malicious text before concatenating all the elements
in an article and updating the database with the tweets. */
const createTweetElement = function(tweet) {

  const $article = $('<article class="tweet">');
  const $header = $('<header class="header-tweet">');
  const $portrait = $(`<img id=image src=${tweet.user.avatars}/>`)
  const $name = $('<h3 id="name">').text(tweet.user.name);
  const $handle = $('<h3 id="handle">').text(tweet.user.handle);
  const $text = $('<p>').text(tweet.content.text);
  const $footer = $('<footer class="footer-tweet">')
  const $section = $('<section>').text(timeago.format(tweet.created_at));
  const $icons = $('<div>').append('<i class="fa-solid fa-flag"></i>', '<i class="fa-solid fa-retweet"></i>', '<i class="fa-solid fa-heart"></i>');

  $header.append($portrait, $name, $handle);
  $footer.append($section, $icons);
  $article.append($header, $text, $footer);

  return $article;
}

/* Function for prepending the newest tweet to the top of 
the page, given a tweets object */
const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

/* Function for loading the tweets object from /tweets before passing 
it to the above function */
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (data) {
    renderTweets(data);
  });
};

/* Loading webpage on DOM initialization */
$(document).ready(function () {

  /* Load tweets on DOM initialization */
  loadTweets();

  /* Function for displaying the form to submit tweets. Will slide it up if it is visible and vice versa, 
  focusing on it at all times on click event */
  $(".writeTweet").on("click", () => {
    $(".formTweeterText").slideToggle("slow");
    $("#tweet-text").focus();
  });
  
  /* Submission form for the tweet text with error handlers.
  If there is no text, show an appropriate error message.
  If the text is too long, show an appropriate error message.
  Always hide the error on successful tweet and scroll it up at submit initiation. */
  $(".formTweeterText").submit(function (event) {
    event.preventDefault();
    $(".error").slideUp("slow", () => {
    });
    const $serializedTweet = $(this).serialize();

    if (!$serializedTweet.slice(5)) {
      $("#errorMessage").text("There is no content in the tweet body, please enter content before posting!");
      $(".error").slideDown("slow");
      $(".error").removeClass("error-hide");
      return;
    } else if ($serializedTweet.slice(5).length > 140) {
      $("#errorMessage").text("The tweet is too long! Please keep it under 140 characters!");
      $(".error").slideDown("slow");
      $(".error").removeClass("error-hide");
      return;
    }

    /* If tweet can be posted, hide the error, reset the counter, set value to "" and update tweets to page. */
    $.post('/tweets', $serializedTweet, () => {
      $(".error").addClass("error-hide");
      $(".counter").text("140");
      $("#tweet-text").val("");
      loadTweets();
    });
  });
});