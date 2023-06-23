import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const[quote, setQuote] = useState("Change your thoughts and you change your world.");
  const[author, setAuthor] = useState("Norman Vincent Peale")
  const[randNum, setRandNum] = useState(0);
  const[quotesArr, setQuotesArr] = useState(null);

  let quotesURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

  const fetchQuotes = async(url) => {
    const response = await fetch(url);
    const parsed = await response.json();
    setQuotesArr(parsed.quotes);
  }

  useEffect(() => {
    fetchQuotes(quotesURL)
  }, [quotesURL])

  const randQuoteGenerator = () => {
    let randInt = Math.floor(Math.random() * quotesArr.length);
    setRandNum(randInt);
    setQuote(quotesArr[randInt].quote);
    setAuthor(quotesArr[randInt].author);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box">
          <h1>Generate a quote:</h1>
          <button onClick={() => randQuoteGenerator()} id="new-quote">
            Get a new quote
          </button>
          <p id="text">
            "{quote}"
          </p>
          <p id="author">
            - {author}
          </p>
          <a id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} target="_blank">
            <button>
              Tweet Me
            </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
