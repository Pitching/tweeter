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

const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

$(document).ready(function () {

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
  };

  loadTweets();

  $(document).scroll(function() {
    let distance = $(this).scrollTop();
    if (distance < 600) {
      $(".fa-solid.fa-circle-chevron-up").addClass("error-hide");
      return;
    }
    $(".fa-solid.fa-circle-chevron-up").removeClass("error-hide");
  })

  $(".fa-solid.fa-circle-chevron-up").on("click", () => {
    window.scrollTo(0, 0);
  });

  $(".writeTweet").on("click", () => {
    $(".formTweeterText").slideToggle("slow");
    $("#tweet-text").focus();
  });
  
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
    console.log($serializedTweet);
    $.post('/tweets', $serializedTweet, () => {
      $(".error").addClass("error-hide");
      $(".counter").text("140");
      $("#tweet-text").val("");
      loadTweets();
    });
  });
});