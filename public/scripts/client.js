const createTweetElement = function(tweet) {
  const $tweet = `
  <article class="tweet">
    <header class="header-tweet">
      <img id=image src =${tweet.user.avatars}/><h3 id="name">${tweet.user.name}</h3>
      <h3 id="handle">${tweet.user.handle}</h3>
    </header>
  <p>${tweet.content.text}</p>
    <footer class="footer-tweet">
      <section>${timeago.format(tweet.created_at)}</section>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `;
  return $tweet;
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
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

  $('.formTweeterText').submit(function (event) {
    event.preventDefault();
    const $tweeterString = $(this).serialize();
    if ($tweeterString.slice(5) === "" || $tweeterString.slice(5) === null) {
      return alert('There is no content in the tweet text!');
    } else if ($tweeterString.slice(5).length > 140) {
      return alert('Your tweet is too long!');
    }
    console.log($tweeterString);
    $.post('/tweets', $tweeterString);
  });

});