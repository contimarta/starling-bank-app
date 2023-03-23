# My Starling Bank App

In this project, I have built a React App that provides some features to Starling Bank customers: it allows them to view their statement, to create a new savings goal, and to add round up money from the last 7 days spending to one of their Savings Goals. 

The main page shows the customer's latest 15 transactions and the amount of money they have available to transfer to one of the Savings Goals. If they want to transfer it, the customer needs to click the "Savings Goals" button to be redirected to their savings page. 

Once in the savings page, the customer can choose to transfer the round up money to one of their Savings Goals, or create a new goal. 

If the customer has no Savings Goals, they are prompted to create a new goal. 

Once the round up money has been transferred, the amount available becomes 0, and the transferred amount is displayed in the goal selected.

Assumptions and considerations:
- I have decided to add a middleman server because I had a CORS error when trying to send requests to Starling Bank API from the browser. I have created the express middleman server so that it accepts cross-origin requests.

- The app only considers the first account that is sent back by the Starling Bank API given an access token. I'm aware that a customer might have more than one account, but I decided not to include more than one for simplicity. Moreover, the code is reusable so could be implemented easily for each account.

- I am calculating the round up money from the spending transactions done in the last 7 days, irrespective of the day of the week. If the customer transfers the round up for the week, and after that a new transaction is made, it will show the new round up in the app. I assume that that's fine, because the customer might want to transfer round up money every day.

- When a customer transfers the round up money, the round up available becomes 0. However, if they then refresh the app, the round up amount goes back to its previous value. I would need the backend to keep track of whether the customer has transferred the round up money, so that after a refresh it still displayed 0 if no new transactions have been made.

- The app is not tested. Unfortunately, I have not had time to test the app or the server. If I had more time, I would have tested the React app with jest and react testing library, and I would have tested the server with mocha chai. Therefore, this app is not ready for production.


## How to run the app

Before you run the app, you need to install the dependencies. You can run:

### `npm install`

Then you need to **insert the valid token** of the customer you want the app to run for in the bankDataServices.js file, in ./server/serverUtils. 

line 6: `accessToken=YOUR_ACCESS_TOKEN`

Then, you need to start the Middleman Server. This server is used to avoid a CORS error when sending requests to Starling Bank API. In the server folder, you need to run:

### `node server.js`

Finally, in the project directory, you can start the app by running the following command:

### `npm start`

This will open the React App in port 3000 by default. 

## React Component Hierarchy

This is the React Component Hierarchy for the project:

Main page:
- Header
- Main (includes statement display, round up money available, and button to go to savings)
    - Statement Row (each statement transaction is in a separate component)
- Footer

Savings page:
- Header 
- Savings (includes form that allows the customer to transfer round up money to a savings goal)
    - NewGoal (form that allows the customer to create a new goal)
- Footer
