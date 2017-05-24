// Import our needed node modules
require("es6-promise").polyfill;
require("isomorphic-fetch");
require("dotenv").config();
const express = require("express");

// Initialize our app
const app = express();
// Set a const for our api key in .env
const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const baseUrl = "https://quandl.com/api/v3/datatables/WIKI/PRICES.json";

// Set the port to 3001 instead of 3000
app.set("port", process.env.PORT || 3001);

// For later when we deploy to production, use the static
// assets built in the client/build folder instead of
// hosted at localhost:3000
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Extract checking the status of the response for reuse
function checkStatus(response) {
  // If response not okay, throw an error
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  // Otherwise just return the response
  return response;
}

// Extract fetch's json parsing function for reuse
function parseJSON(response) {
  return response.json();
}

app.get("/api/quandl/:date", (req, res, next) => {
  console.log("Requesting stock data from QUANDL...");
  let date = req.params.date;

  let year = Number(date.substring(0, 4));
  let month = Number(date.substring(4, 6));
  let day = Number(date.substring(6, 8));

  function dateGen(num) {
    let newDay;
    let newMonth;
    let newYear;

    num = Number(num);
    if (day - num <= 0) {
      if (month - 1 === 0) {
        newMonth = 12;
        newYear = year - 1;
      } else {
        newMonth = month - 1;
        newYear = year;
      }
      newDay = 30 + (day - num);
    } else {
      newDay = day - num;
      newMonth = month;
      newYear = year;
    }

    if (newDay < 10) {
      newDay = "0" + newDay.toString();
    }
    if (newMonth < 10) {
      newMonth = "0" + newMonth.toString();
    }
    return newYear.toString() + newMonth.toString() + newDay.toString();
  }

  let promises = [];

  promises.push(
    fetch(
      `${baseUrl}?qopts.per_page=3&qopts.columns=ticker,close&date=${date}&api_key=${QUANDL_API_KEY}`
    )
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        return json;
      })
      .catch(error => {
        next(error);
      })
  );

  promises.push(
    fetch(
      `${baseUrl}?qopts.per_page=3&qopts.columns=ticker,close&date=${dateGen(1)}&api_key=${QUANDL_API_KEY}`
    )
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        return json;
      })
      .catch(error => {
        next(error);
      })
  );
  promises.push(
    fetch(
      `${baseUrl}?qopts.per_page=3&qopts.columns=ticker,close&date=${dateGen(7)}&api_key=${QUANDL_API_KEY}`
    )
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        return json;
      })
      .catch(error => {
        next(error);
      })
  );

  promises.push(
    fetch(
      `${baseUrl}?qopts.per_page=3&qopts.columns=ticker,close&date=${dateGen(30)}&api_key=${QUANDL_API_KEY}`
    )
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        return json;
      })
      .catch(error => {
        next(error);
      })
  );

  Promise.all(promises).then(results => {
    let stockObjects = results[0].datatable.data.map(stock => {
      return {
        ticker: stock[0],
        currentPrice: stock[1]
      };
    });

    results[1].datatable.data.forEach(stock => {
      stockObjects.forEach(el => {
        if (stock[0] === el.ticker) {
          el.price1 = stock[1];
          return;
        }
      });
    });

    results[2].datatable.data.forEach(stock => {
      stockObjects.forEach(el => {
        if (stock[0] === el.ticker) {
          el.price7 = stock[1];
          return;
        }
      });
    });

    results[3].datatable.data.forEach(stock => {
      stockObjects.forEach(el => {
        if (stock[0] === el.ticker) {
          el.price30 = stock[1];
          return;
        }
      });
    });

    res.json(stockObjects);
  });
});

// Defines next action for errors
function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.stack}`);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
}

// Tell the app to use the errorHandler middleware
app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`Find the server at http://localhost:${app.get("port")}/`);
});
