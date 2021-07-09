# Week 5
## The quiz app

## Description
In this lab, we will use what we learned and create a backend for a quiz app. We have a frontend for the quiz app, which will load all the quiz information and allow a user to select the answers and send them to receive a score. It doesn't work yet because there are some of the things you have to do.

## Setup

### Pre-requisites
You will need the following installed on your computer:
- [`node.js`](https://nodejs.org/en/download/)
- [`postman`](https://www.postman.com/product/api-client/) OR [`thunderclient for vscode`](https://www.thunderclient.io/) to test the APIs.

## Install dependencies
```
cd week6
npm install
npm run client-install
```

*note*: The script `client-install` is defined in the `package.json` of the week6 folder. It goes to the `client` folder and does an `npm install`

## Take a look at the sample data.
- Open [`/models/questions-data.json`](./models/questions-data.json)
- Look at the data and change some questions and answers if you want.


## Running the application
- run `npm run dev`
- This will run the server and the client (frontend in react) concurrently
- `[0]` logs will be for the server
- `[1]` logs will be for the client

## Tasks
- In the file [`routes/api/questions.js`](./routes/api/questions.js), read the comments and expand the file to include all the routes we need to create the quiz app. 
- Test the APIs with Postman.
- Go to `localhost:3000` to see if you can complete the quiz and get the score. 
- Try changing the seed to see if you can create more questions with multiple options.
- **Bonus**: check [`/utils/shuffle.js`](./utils/shuffle.js). Implement the function and use the function to shuffle the options when you give the questions array.

## Good Luck!

