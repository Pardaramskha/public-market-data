# Public Market Data (exercice)

This project was made as a technical test for a junior frontend job.

## Setup
``docker build -t public-market-data .``
``docker run -p 3000:3000 -d public-market-data``

## 👁 Task overview

### Goal
* Retrieve and display market data for a selected pair from Kukoin public API.

### Specifications
* Users should be able to use a form to select the currency pair to query.
* Upon submitting the form, fetch public market data (tick, get 24h tick, trades) for the
  selected pair from Kucoin public REST api.
* Users should be able to sort trades data by time & filter based on side.

### Requirements
* Use React with Typescript
* Use any styling solution (preferably styled-components)

## ⚠ Usage warning (API calls errors)
Doing this was especially painful due to Kucoin "public" API. Every wannabe public endpoint was blocked by CORS policy, making it impossible to retrieve any data without, for example, a proxy.

I had to use **a CORS bypassing plugin** in order to make it work. Do NOT do this, for this is the tech equivalent of playing with an armed grenade while dancing swing and stuff...

## ☑ How it went...
* Met most project requirements
* I didn't know anything about cryptos or finance when starting this, so I had to deal with frightening words.
* I used **Material UI** instead of **styled-components** for its powerful Autocomplete and Tabs components.
* I learned how to use **react-query** in the meantime - this stuff is good when you have to deal with loading states!

## ❓ What could have been done
* Could've use a **.env** file to store API base endpoint
* Could've use **eCharts** to display data properly
* Could've use **redux** for state management (too complex to do within given deadline)
