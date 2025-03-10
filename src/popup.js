import { createClient } from 'pexels';
import Quotes from "randomquote-api";

const client = createClient('YOUR PEXELS API KEY GOES HERE');
const query = 'Natural Background';
var i = 1;
var wrapper = document.getElementById("main-wrapper");
var quote = document.getElementById("quote-wrapper");
var backgroundUrls = [];
var q = Quotes.randomQuote().quote

function getRandomQuote() {
  q = Quotes.randomQuote().quote;
  while (q.length > 60 || q.length < 10) {
    q = Quotes.randomQuote().quote;
  }
  q = q.replace("â€™", "'");
  return q;
}

client.photos.search({ query, per_page: 200 }).then(response => {
  response.photos.forEach(photo => {
    backgroundUrls.push(photo.src.medium)
  })
  wrapper.style.backgroundImage = `url('${backgroundUrls[0]}')`;
  quote.innerHTML = getRandomQuote();
}).catch(error => {
  console.error("Error fetching photos:", error);
});


document.getElementById("arrow-right").addEventListener("click", function() {
  if(backgroundUrls[i] != undefined) {
    if (i < (backgroundUrls[i].length - 1)) {
      i++;
      if(backgroundUrls[i] != undefined) {
        wrapper.style.backgroundImage = `url('${backgroundUrls[i]}')`;
        quote.innerHTML = getRandomQuote();
      } else {
        i--;
      }
    }
  }
});

document.getElementById("arrow-left").addEventListener("click", function() {
  if (i > 1) {
    i--
    wrapper.style.backgroundImage = `url('${backgroundUrls[i]}')`;
    quote.innerHTML = getRandomQuote();
  }
});
